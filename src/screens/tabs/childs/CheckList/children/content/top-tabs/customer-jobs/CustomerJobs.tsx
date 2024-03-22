import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getData, ListItemType} from '../../list-item/GetData';
import {ListItem} from '../../list-item/ListItem';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const heightDimensions = Dimensions.get('screen').height;
const widthDimensions = Dimensions.get('screen').width;

export default function AllJobs() {
  const data = getData();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );
  useEffect(() => {
    const initialExpandedItems = data.reduce((acc, item) => {
      if (item.title === 'Công việc hôm nay') {
        acc[item.title] = true;
        console.log(item.title);
      } else {
        acc[item.title] = false;
      }
      return acc;
    }, {} as Record<string, boolean>);
    setExpandedItems(initialExpandedItems);
  }, []);
  const renderItem = ({item}: ListRenderItemInfo<ListItemType>) => {
    const expanded = expandedItems[item.title];
    return <ListItem item={item} initialExpanded={expanded} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.title}${index}`}
        renderItem={renderItem}
      />
      {/* <View style={styles.buttonContainer}> */}
        <TouchableWithoutFeedback
          onPress={() => console.log('red')}>
            <View style={styles.buttonSpecified}><MaterialIcons name="add" size={25} color="white"/></View>
          </TouchableWithoutFeedback>
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: heightDimensions * 0.01,
    paddingBottom: heightDimensions * 0.06,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: heightDimensions * 0.02,
    paddingBottom: heightDimensions * 0.02
    
  },
  buttonSpecified: {
    width: 60,height: 60,
    backgroundColor:'rgb(50, 111, 226)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    position: 'absolute',
    bottom: 80,
    right: 15
  }
});
