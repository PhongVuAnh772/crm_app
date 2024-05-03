import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
  Button,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {fetchDetailsOnExpand, ListItemType} from './GetData';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';

const heightDimensions = Dimensions.get('screen').height;
const widthDimensions = Dimensions.get('screen').width;

export const CollapsableContainer = ({
  children,
  expanded,
}: {
  children: React.ReactNode;
  expanded: boolean;
}) => {
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(height) : withTiming(0);

    return {
      height: animatedHeight.value,
    };
  }, [expanded, height]);

  return (
    <Animated.View style={[collapsableStyle, {overflow: 'hidden'}]}>
      <View
        style={{position: 'absolute', width: '100%', paddingVertical: 10}}
        onLayout={onLayout}>
        {children}
      </View>
    </Animated.View>
  );
};

export const ListItemAgentTree = ({
  item,
  initialExpanded,
}: {
  item: ListItemType;
  initialExpanded: boolean;
}) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(initialExpanded);
  const {today, notDone, done} = useSelector((state: any) => state.mission);
  const animatedValue = useSharedValue(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [checked, setChecked] = React.useState(false);
  //   function convertTo12HourFormat(timeString:any) {
  //   const [date, time] = timeString.split('T');
  //   const [hours, minutes, seconds] = time.split(':');
  //   const timeOnly = `${hours}:${minutes}:${seconds}`;
  //   return convertTo12HourFormat(timeOnly);
  // }
  function convertTo12HourFormat(time24: any) {
    // Tách phần giờ, phút, giây từ chuỗi thời gian
    const [hours, minutes, seconds] = time24.split(':');

    // Chuyển đổi giờ sang định dạng 12 giờ
    let hours12 = parseInt(hours) % 12 || 12; // Giờ từ 1 đến 12
    const amPm = parseInt(hours) < 12 ? 'AM' : 'PM'; // Xác định AM hay PM

    // Thêm '0' vào trước giờ, phút, giây nếu có giá trị nhỏ hơn 10
    const formattedHours = hours12 < 10 ? `0${hours12}` : `${hours12}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    // Trả về thời gian ở định dạng 12 giờ
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  }
  const getData = () => {
    return notDone.map((item: any, index: any) => (
      <View key={index} style={styles.itemCollapsable}>
        <View style={styles.itemCollapsableContainer}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <View style={styles.itemCollapsableTextContainer}>
            <Text style={styles.itemCollapsableTextTitle}>{item.name}</Text>
            <Text style={styles.itemCollapsableTextTime}>
              {convertTo12HourFormat(item.date)}
            </Text>
          </View>
        </View>
        <View style={styles.itemCollapsableTextRightContainer}>
          <Text style={styles.itemCollapsableTextTitle}>{item.name}</Text>
          <Text style={styles.itemCollapsableTextTime}>
            {convertTo12HourFormat(item.date)}
          </Text>
        </View>
      </View>
    ));
  };
const renderChildrenAgents = (agents:any, expanded:any, iconRotateStyle:any) => {
  return agents.map((agent:any, index:any) => (
    <View key={index} style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.titleCollapsing}>{agent.name}</Text>
        <Animated.View style={iconRotateStyle}>
          <Entypo name="chevron-up" size={20} color="black" style={styles.iconCollapsing} />
        </Animated.View>
      </View>

      <FontAwesome6 name="ellipsis-vertical" size={20} color="black" />

       {agent.agentSystem && agent.agentSystem.length > 0 && (
        <CollapsableContainer expanded={expanded}>
          {agent.agentSystem.map((childAgents:any, childIndex:any) => (
            <View key={childIndex}>
              {/* {renderChildrenAgents(childAgents, expanded, iconRotateStyle)} */}
            </View>
          ))}
        </CollapsableContainer>
      )}
    </View>
  ));
};
  const details = getData();

  const containerRef = useRef<View>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.measure((x, y, width, height) => {
        setContainerHeight(height);
      });
    }
  }, [details]);

  const onItemPress = () => {
    setExpanded(!expanded);
    if (!expanded) {
      fetchDetailsOnExpand(item, dispatch);
    }
    animatedValue.value = expanded ? withTiming(0) : withTiming(1);
  };

  const iconRotateStyle = useAnimatedStyle(() => {
    const rotation = interpolate(animatedValue.value, [0, 1], [0, 180]);
    return {
      transform: [{rotate: `${rotation}deg`}],
    };
  }, []);

  return (
    <ScrollView style={styles.wrap}>
      <TouchableWithoutFeedback onPress={onItemPress}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.titleCollapsing}>{item.name}</Text>
            <Animated.View style={iconRotateStyle}>
              <Entypo
                name="chevron-up"
                size={20}
                color="black"
                style={styles.iconCollapsing}
              />
            </Animated.View>
          </View>

          <FontAwesome6 name="ellipsis-vertical" size={20} color="black" />
        </View>
      </TouchableWithoutFeedback>

      {/* <CollapsableContainer expanded={expanded}>
        <View ref={containerRef}>
          {item.agentSystem.map((childrenSystem: any, index: any) => (
            <View style={styles.container}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.titleCollapsing}>
                  {childrenSystem.name}
                </Text>
                <Animated.View style={iconRotateStyle}>
                  <Entypo
                    name="chevron-up"
                    size={20}
                    color="black"
                    style={styles.iconCollapsing}
                  />
                </Animated.View>
              </View>

              <FontAwesome6 name="ellipsis-vertical" size={20} color="black" />
            </View>
          ))}
        </View>
      </CollapsableContainer> */}
      <CollapsableContainer expanded={expanded}>
        <View ref={containerRef}>
          {item.agentSystem && renderChildrenAgents(item.agentSystem, expanded, iconRotateStyle)}
        </View>
      </CollapsableContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {width: 50, height: 50, margin: 10, borderRadius: 5},
  textContainer: {justifyContent: 'space-around'},
  details: {margin: 10},
  text: {opacity: 0.7},
  titleCollapsing: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  iconCollapsing: {
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
  },
  itemCollapsable: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
    justifyContent: 'space-between',
  },
  itemCollapsableCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemCollapsableTextContainer: {
    paddingLeft: 10,
  },
  itemCollapsableTextTitle: {
    color: 'black',
    paddingBottom: 5,
    fontSize: 16,
  },
  itemCollapsableTextTime: {
    color: 'green',
    paddingTop: 5,
    fontSize: 16,
  },
  itemCollapsableContainer: {
    flexDirection: 'row',
  },
  itemCollapsableTextRightContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
});
