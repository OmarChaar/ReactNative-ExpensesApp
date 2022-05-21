
import { StyleSheet, Text, View } from 'react-native';
import { useLayoutEffect } from 'react'
import ExpensesOutput from '../../components/expenses/ExpensesOutput';


function RecentExpenses({navigation}) {

    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Recent Expenses',
        })
    }, [navigation]);

    return (
        <ExpensesOutput expensesPeriod="Last 7 Days"/>
    )
}

export default RecentExpenses;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});