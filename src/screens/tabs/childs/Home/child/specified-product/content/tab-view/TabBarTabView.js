import * as React from 'react';
import {View, useWindowDimensions, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import { WebView } from 'react-native-webview';

const FirstRoute = ({ tabDescriptionRoute }) => (
  <View style={{ height: 300, backgroundColor: 'white' }}>
    {/* Sử dụng prop tabDescriptionRoute ở đây */}
    <Text>{tabDescriptionRoute}</Text>
  </View>
);

const SecondRoute = ({ tabInfoRoute }) => (
  <View style={{ height: 300, backgroundColor: 'white',fontSize: 20,paddingTop: 10 }}>
    {/* Sử dụng prop tabDescriptionRoute ở đây */}
    <WebView
    originWhitelist={['*']}
    source={{ html: `${tabInfoRoute}` }}
/>
  </View>
);
const ThirdRoute = () => (
  <View style={{height: 300, backgroundColor: 'white'}} />
);

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: 'transparent'}}
    renderLabel={({focused, route}) => {
      return (
        <View
          style={{
            backgroundColor: focused ? 'rgb(42, 112, 234)' : 'white',
            width: 120,
            paddingVertical: 10,
            paddingHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <Text style={{fontSize: 18, color: focused ? 'white' : 'gray'}}>
            {route.title}
          </Text>
          {/*  */}
        </View>
      );
    }}
    style={{
      backgroundColor: 'white',
      width: '100%',
      borderRadius: 5,
    }}
  />
);

export default function TabViewExample({tabDescriptionRoute, tabInfoRoute}) {
  const renderScene = SceneMap({
    first: () => <FirstRoute tabDescriptionRoute={tabDescriptionRoute} />,
    second: () => <SecondRoute tabInfoRoute={tabInfoRoute} />,
    third: () => <FirstRoute tabDescriptionRoute={tabDescriptionRoute} />,
  });
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Mô tả'},
    {key: 'second', title: 'Cách sử dụng'},
    {key: 'third', title: 'Đánh giá'},
  ]);

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      style={{minHeight: 300, paddingTop: 10}}
    />
  );
}
