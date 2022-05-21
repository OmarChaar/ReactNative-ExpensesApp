import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 

import RecentExpenses from './screens/bottom-bar/RecentExpenses';
import AllExpenses from './screens/bottom-bar/AllExpenses';
import ManageExpenses from './screens/stack/ManageExpenses';
import { GlobalStyles } from './contants/styles';


const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

 function BottomTabNavigation() {
  return (
    <BottomTab.Navigator 
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: GlobalStyles.colors.white,
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarLabelStyle: { fontSize: 12, paddingVertical: 5 }
      }}
    >
      <BottomTab.Screen 
        name="RecentTab" 
        component={RecentExpenses} 
        options={{
          headerTitleAlign: 'center',
          tabBarIcon: ({size, color}) => <Ionicons name="hourglass-outline" size={size} color={color} />,
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
  )
 }


export default function App() {
  return (
    <>
      <StatusBar style='dark'></StatusBar>

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerBackTitle: '',
            headerTintColor: GlobalStyles.colors.white,
          }}
        >
          <Stack.Screen 
            name='Overview' 
            component={BottomTabNavigation}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name='Manage' 
            component={ManageExpenses}
            options={{
              title: 'Recent Expenses',
              headerTitleAlign: 'left',
            }}
          />
         
        </Stack.Navigator>

       
      </NavigationContainer>
    </>
  );
}


