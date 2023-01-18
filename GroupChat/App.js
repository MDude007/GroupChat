// import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createContext, useState } from 'react';
import MyStack from './src/navigation/MyStack';

export const DataContext = createContext({
  allData: [],
  setAllData: () => { },
});

const App = () => {

  const [allData, setAllData] = useState([]);

  return (
    <DataContext.Provider value={{ allData: allData, setAllData: setAllData }}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </DataContext.Provider>
  )
}

export default App;