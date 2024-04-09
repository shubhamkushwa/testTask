import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ChildView = ({id, onClose, onReceiveData}) => {
  const [data, setData] = useState(null);

  // calling details api
  useEffect(() => {
    console.log('re rendered');
    if (!id) {
      setData(null);
      return;
    }
    const fetchData = async () => {
      try {
        onReceiveData(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        throw new Error(`Something went wrong ${error}`);
      } finally {
        onReceiveData(false);
      }
    };

    fetchData();
  }, [id]);

  if (!data) {
    return <></>;
  }

  return (
    <View style={styles.mainView}>
      <Text style={styles.idText}>Id: {data.id}</Text>
      <Text style={styles.title}>Title: {data.title}</Text>
      <TouchableOpacity
        onPress={() => onClose(null)}
        style={styles.closeButton}>
        <Text style={styles.idText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: '90%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#616A7D',
    backgroundColor: '#153075',
    marginHorizontal: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  idText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: 'white',
  },
  title: {
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
    paddingBottom: 10,
  },
});

export default React.memo(ChildView);
