import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 

import RecentExpenses from './screens/bottom-bar/RecentExpenses';
import AllExpenses from './screens/bottom-bar/AllExpenses';
import EditExpenses from './screens/stack/EditExpenses';


const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

 function RecentExpensesStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='Recent' 
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
        }}
      />
      <Stack.Screen 
        name='Edit' 
        component={EditExpenses}
      />
    </Stack.Navigator>
  )
 }


export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen 
          name="RecentTab" 
          component={RecentExpensesStackNavigator} 
          options={{
            tabBarIcon: ({size, color}) => <Ionicons name="hourglass-outline" size={size} color={color} />,
            headerShown: false
          }}
        />
        <BottomTab.Screen 
          name="AllExpenses" 
          component={AllExpenses} 
         
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}


