
import { StyleSheet, Text, View } from 'react-native';
import { useLayoutEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'; 

function AllExpenses({navigation}) {
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'All Expenses',
            tabBarIcon: ({size, color}) => <Ionicons name="calendar-outline" size={size} color={color} />
        })
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text>ALL EXPENSES!</Text>
        </View>
    )
}

export default AllExpenses;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });