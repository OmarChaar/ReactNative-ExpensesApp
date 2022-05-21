
import { StyleSheet, Text, View } from 'react-native';
import { useLayoutEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'; 


function RecentExpenses({navigation}) {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Recent Expenses',
            headerRight: ({color, size}) => <Ionicons name="add" size={size} color={color} />

        })
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text>RECENT EXPENSES!</Text>
        </View>
    )
}

export default RecentExpenses;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });