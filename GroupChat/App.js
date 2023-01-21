// import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createContext, useReducer } from 'react';
import MyStack from './src/navigation/MyStack';

const initialState = {
  user: {},
  groupData: {}
}

function reducer(state, action) {
  return { ...state, ...action }
}

export const DataContext = createContext();

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </DataContext.Provider>
  )
}

export default App;