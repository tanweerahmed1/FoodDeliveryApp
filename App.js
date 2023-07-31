import React, { useEffect, useState } from 'react';
import Splash from './src/screens/Splash';
import Home from './src/screens/Home';
import AppNavigator from './src/components/Navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

function App() {
  const [currentScreen, setCurrentScreen] = useState('Splash');

  useEffect(() => {
    setTimeout(() => {
      // console.log('Done Some Time')
      setCurrentScreen('Login');
    }, 3000)
  })

  return (
    <Provider store={store}>
      {currentScreen === 'Splash' ? <Splash /> : <AppNavigator />}
    </Provider>
  )
}
export default App;