import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Text
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getData, ListItemType} from '../../list-item/GetData';
import {ListItem} from '../../list-item/ListItem';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Agenda } from 'react-native-calendars';

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
  const [items, setItems] = useState<any>({});

  const loadItems = (day:any) => {
    const dayItems = items[day.dateString] || [];

    // Load your events or appointments for the given day here
    // For example:
    const events = [
      { name: 'Làm việc', time: '10:00 AM' },
      { name: 'Học ', time: '12:30 PM' },
      { name: 'Code', time: '2:00 PM' },
    ];

    // Update the state with the events for the given day
    setItems((prevItems:any) => ({
      ...prevItems,
      [day.dateString]: [...dayItems, ...events],
    }));
  };

  const renderItemCalendar = (item:any) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.time} - {item.name}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.title}${index}`}
        renderItem={renderItem}
      />
        <TouchableWithoutFeedback
          onPress={() => console.log('red')}>
            <View style={styles.buttonSpecified}><MaterialIcons name="add" size={25} color="white"/></View>
          </TouchableWithoutFeedback> */}
          <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        renderItem={renderItemCalendar}
        theme={{
          agendaDayTextColor: 'black',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
        }}
      />
    </View>
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
  },
  containerCalendar: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
});
