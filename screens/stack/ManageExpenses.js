
import { StyleSheet, View } from 'react-native';
import { useContext, useLayoutEffect } from 'react'
import IconButton from '../../components/ui/IconButton';
import { GlobalStyles } from '../../contants/styles';
import Button from '../../components/ui/Button';
import { ExpensesContext } from '../../store/expenses-context';
import ManageExpense from '../../components/ExpensesOutputs/ManageExpense';
import ExpenseForm from '../../components/ManageExpense/ExpenseForm';

/*
    'navigation' & 'route' are automatically imported by React since ManageExpenses.js is
    declared as a Navigation object in App.js.
*/
function ManageExpenses({navigation, route}) {

    const expensesCtx = useContext(ExpensesContext);

    // Incase an object might be undefined use '?' to avoid errors.
    const editExpenseID = route.params?.expenseID;
    const isEditing = !!editExpenseID;

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editExpenseID);

    /*
        'useLayoutEffect()' is used to set dynamic details on navigation screen.
        We must link the values used inside it at the end.
    */
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

    function confirmHandler(data) {

        if(isEditing) {
            expensesCtx.updateExpense(editExpenseID, data);
        }
        else {
            expensesCtx.addExpense(data);
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            {/* <ManageExpense /> */}
            <ExpenseForm 
                isEditing={isEditing} 
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                defaultValues={selectedExpense}
            />

         
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

    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
  });