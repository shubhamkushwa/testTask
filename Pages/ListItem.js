import React, {useMemo} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {heavyComputation} from './utils';

const ListItem = ({itemData, onSelect}) => {
  const {item, index} = itemData;

  // calling heavy function with memoization
  const heavyResult = useMemo(() => heavyComputation(item), [index]);

  const onSelectItem = () => {
    onSelect(item.id);
  };

  return (
    <TouchableOpacity
      onPress={onSelectItem}
      key={index}
      style={styles.buttonView}>
      <Text style={styles.idText}>Id: {item.id}</Text>
      <Text style={styles.title}>Title: {item.title}</Text>
      <Text style={styles.title}>{heavyResult}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    width: '90%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#616A7D',
    marginHorizontal: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  idText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: 'black',
  },
  title: {
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
    paddingBottom: 10,
  },
});

export default React.memo(ListItem);
