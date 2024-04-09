/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {responsiveScreenHeight, responsiveScreenWidth} from 'react-native-responsive-dimensions';
import ListItem from './ListItem';
import ChildView from './ChildView';

function ListView() {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  //fetching data from api and showing in flatlist
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts',
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setListData(result);
      } catch (error) {
        throw new Error(`Something went wrong ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // callback functions with memoization
  const onItemClick = useCallback(id => {
    setSelectedId(id);
  }, []);

  const onReceiveData = useCallback((value)=> {
   setLoading(value);
  },[])

  return (
    <View style={styles.mainView}>
      <View style={styles.widthNinety}>
        {/* child component */}
        <ChildView id={selectedId} onReceiveData={onReceiveData} onClose={onItemClick} />
        <FlatList
          removeClippedSubviews={true}
          keyExtractor={item => item.id.toString()}
          style={styles.productFlatlistView}
          contentContainerStyle={{paddingBottom: selectedId ? 170 :  70}}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={5}
          data={listData}
          ListEmptyComponent={()=> {
            return <Text style={styles.emptyTitle}>No Data</Text>
          }}
          initialNumToRender={5}
          renderItem={item => (
            <ListItem key={item.index} onSelect={onItemClick} itemData={item} />
          )}
        />
      </View>
      {loading && <View style={styles.indicatorView}>
        <ActivityIndicator />
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  indicatorView:{
   height:responsiveScreenHeight(100),
   width:responsiveScreenWidth(100),
   position:'absolute',
   top:0,
   backgroundColor:"#00000090",
   alignItems:'center',
   justifyContent:'center'
  }, 
  mainView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: 'white',
  },
  emptyTitle: {color: 'black', fontSize: 18},
  widthNinety: {width: responsiveScreenWidth(90)},
  productFlatlistView: {
    alignSelf: 'center',
  },
});

export default ListView;
