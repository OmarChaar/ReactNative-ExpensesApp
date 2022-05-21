
import { StyleSheet, Text, View } from 'react-native';
import { useLayoutEffect } from 'react'

function EditExpenses({navigation}) {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Edit Expenses',
            headerTitleAlign: 'center',
        })
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text>EDIT EXPENSES!</Text>
        </View>
    )
}

export default EditExpenses;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });