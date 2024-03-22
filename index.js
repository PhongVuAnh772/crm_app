/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {store} from './app/store';
import {Provider} from 'react-redux';
import {PaperProvider} from 'react-native-paper';

const ReduxApp = () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <Provider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </Provider>
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
