
import { StyleSheet, View } from 'react-native';
import { useContext, useLayoutEffect, useState } from 'react'
import IconButton from '../../components/ui/IconButton';
import { GlobalStyles } from '../../contants/styles';
import { ExpensesContext } from '../../store/expenses-context';
import ExpenseForm from '../../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../../util/http';
import LoadingOverlay from '../../components/ui/LoadingOverlay';

/*
    'navigation' & 'route' are automatically imported by React since ManageExpenses.js is
    declared as a Navigation object in App.js.
*/
function ManageExpenses({navigation, route}) {

    const [isLoading, setIsLoading] = useState(false);

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

    async function deleteExpenseHandler() {
        setIsLoading(true);
        expensesCtx.deleteExpense(editExpenseID);
        await deleteExpense(editExpenseID);
        setIsLoading(false);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(data) {
        setIsLoading(true);
        if(isEditing) {
            expensesCtx.updateExpense(editExpenseID, data);
            await updateExpense(editExpenseID, data);
        }
        else {
            // Sending the automatically generated ID to the 'addExpense()' function.
            const id = await storeExpense(data);
            expensesCtx.addExpense({...data, id: id});
        }
        setIsLoading(false);
        navigation.goBack();
    }

    if(isLoading) {
        return <LoadingOverlay />
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