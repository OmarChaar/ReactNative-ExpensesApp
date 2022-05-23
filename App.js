import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons'; 

import RecentExpenses from './screens/tab/RecentExpenses';
import AllExpenses from './screens/tab/AllExpenses';
import ManageExpenses from './screens/stack/ManageExpenses';
import { GlobalStyles } from './contants/styles';
import IconButton from './components/ui/IconButton';
import ExpensesContextProvider from './store/expenses-context';
import MonthlyExpenses from './screens/tab/MonthlyExpenses';
import YearlyExpenses from './screens/tab/YearlyExpenses';


const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

function TopTabNavigation() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen 
        name="WeeklyTab"
        component={RecentExpenses}
      />
      <TopTab.Screen 
        name="MonthlyTab"
        component={MonthlyExpenses}
      />
      <TopTab.Screen 
        name="YealyTab"
        component={YearlyExpenses}
      />
    </TopTab.Navigator>
  )
}

function BottomTabNavigation() {

  return (
    <BottomTab.Navigator 
      // 'navigation' is found as a param in any Navigator.
      screenOptions={({navigation}) => ({
        lazy: false,
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: GlobalStyles.colors.white,
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarLabelStyle: { fontSize: 12, paddingVertical: 5 },
        headerRight: ({tintColor}) => (
          <IconButton name="add" size={24} color={tintColor} onPress={() =>  navigation.navigate("ManageExpense", {type: 'new'})}/>
        )  
      })}
    >
      <BottomTab.Screen 
        name="RecentTab" 
        component={TopTabNavigation} 
        options={{
          headerTitleAlign: 'center',
          title: 'Recent Expenses',
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
      <StatusBar style='light'></StatusBar>

      <ExpensesContextProvider>
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
              name='ManageExpense' 
              component={ManageExpenses}
              options={{
                title: 'Manage Expenses',
                headerTitleAlign: 'left'
              }}
            />
          
          </Stack.Navigator>

        
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}


