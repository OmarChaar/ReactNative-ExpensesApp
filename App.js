import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 

import RecentExpenses from './screens/bottom-bar/RecentExpenses';
import AllExpenses from './screens/bottom-bar/AllExpenses';
import EditExpenses from './screens/stack/EditExpenses';
import Colors from './contants/styles';


const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

 function RecentExpensesStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerBackTitle: '',
        headerTintColor: Colors.white,
      }}
    >
      <Stack.Screen 
        name='Recent' 
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          headerTitleAlign: 'left',
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
    <>
      <StatusBar style='dark'></StatusBar>

      <NavigationContainer>
        <BottomTab.Navigator 
          screenOptions={{
            tabBarActiveBackgroundColor: Colors.primary500,
            tabBarActiveTintColor: Colors.white,
            tabBarInactiveBackgroundColor: Colors.secondary500,
            headerStyle: {backgroundColor: Colors.primary500},
            headerTintColor: Colors.white,
            tabBarLabelStyle: {fontSize: 12, paddingVertical: 5}
          }}
        >
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
            options={{
              title: "All Expenses",
              headerTitleAlign: 'center',
              tabBarIcon: ({size, color}) => <Ionicons name="calendar-outline" size={size} color={color} />
            }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </>
  );
}


