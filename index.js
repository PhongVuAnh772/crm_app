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
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'react-native-elements';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';

const ReduxApp = () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <PaperProvider>
            <BottomSheetModalProvider>
              <ApplicationProvider {...eva} theme={eva.dark}>
                <App />
              </ApplicationProvider>
            </BottomSheetModalProvider>
          </PaperProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
