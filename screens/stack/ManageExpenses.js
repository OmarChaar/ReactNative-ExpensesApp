
import { StyleSheet, Text, View } from 'react-native';
import { useLayoutEffect } from 'react'

function ManageExpenses({navigation}) {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Manage Expenses',
            headerTitleAlign: 'center',
        })
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text>MANAGE EXPENSES!</Text>
        </View>
    )
}

export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });