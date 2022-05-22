
import { StyleSheet, View, Text } from 'react-native';
import { useContext, useLayoutEffect } from 'react'
import IconButton from '../../components/ui/IconButton';
import { GlobalStyles } from '../../contants/styles';
import Button from '../../components/ui/Button';
import { ExpensesContext } from '../../store/expenses-context';

function ManageExpenses({navigation, route}) {

    const expensesCtx = useContext(ExpensesContext);

    // Incase an object might be undefined use '?' to avoid errors.
    const editExpenseID = route.params?.expenseID;
    const isEditing = !!editExpenseID;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expenses' : 'Add Expenses',
            headerTitleAlign: 'center',
        })
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        expensesCtx.deleteExpense(editExpenseID);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        if(isEditing) {
            expensesCtx.updateExpense(editExpenseID, {description: 'OC', amount: 59.99, date: new Date('2022-05-20')});
        }
        else {
            expensesCtx.addExpense({description: 'Omar Chaar', amount: 19.99, date: new Date('2022-05-19')});
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton 
                        name="trash" 
                        color={GlobalStyles.colors.error500} 
                        size={36} 
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    )
}

export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
  });