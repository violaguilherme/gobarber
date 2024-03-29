import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';
import Routes from "./routes"

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312E38" translucent />

      <AppProvider>
        <View style={{ backgroundColor:"#312E38", flex: 1 }}>
          <Routes />
        </View>
      </AppProvider>
      
    </NavigationContainer>
  )
}

export default App;
