
import { StyleSheet, Text, View } from 'react-native';
import { useLayoutEffect } from 'react'

function ManageExpenses({navigation, route}) {

    // Incase an object might be undefined use '?' to avoid errors.
    const editExpenseID = route.params?.expenseID;
    const isEditing = !!editExpenseID;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expenses' : 'Add Expenses',
            headerTitleAlign: 'center',
        })
    }, [navigation, isEditing]);

    if(isEditing) {
        return (
            <View style={styles.container}>
                <Text>EDITING EXPENSES</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text>ADDING EXPENSES!</Text>
        </View>
    )
}

export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  });