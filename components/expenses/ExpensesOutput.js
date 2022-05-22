import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '../../contants/styles';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {

    let content = <Text style={styles.infoText}>{fallbackText}</Text>

    if(expenses.length > 0) {
        content =  <ExpensesList expenses={expenses}/>
    }
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} period={expensesPeriod}/>
            {content}
        </View>
    )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: GlobalStyles.colors.primary700,
        paddingTop: 24,
        paddingBottom: 0
    },
    infoText: {
        color: GlobalStyles.colors.white,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
});