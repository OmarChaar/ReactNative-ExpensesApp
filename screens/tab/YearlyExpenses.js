
import { StyleSheet } from 'react-native';
import { useContext, useLayoutEffect, useState } from 'react'
import ExpensesOutput from '../../components/ExpensesOutputs/ExpensesOutput';
import { ExpensesContext } from '../../store/expenses-context';
import { getDateMinusDays } from '../../util/date';
import { sortByLatest } from '../../util/sorting';

function YearlyExpenses({navigation}) {

    const expensesCtx = useContext(ExpensesContext); 
    
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const dateMonthAgo = getDateMinusDays(today, 365);

        return expense.date > dateMonthAgo;
    });

    const [displayed, setDisplayed] = useState(sortByLatest(recentExpenses));


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Year',
        })
    }, [navigation]);

    return (
        <ExpensesOutput expenses={displayed} expensesPeriod="Last Year" fallbackText="No expenses registered for the past year."/>
    )
}

export default YearlyExpenses;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});