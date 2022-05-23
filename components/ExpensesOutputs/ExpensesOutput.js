import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '../../contants/styles';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import SortingIconButton from '../ui/SortingIconButton';
import SearchBar from '../ui/SearchBar';

function ExpensesOutput({ expenses, expensesPeriod, fallbackText, onPress, sorting, searching }) {

    let content = <Text style={styles.infoText}>{fallbackText}</Text>

    let sorter = (
        <View style={styles.sorterContainer}>
            <SortingIconButton name={sorting ? 'sort-descending' : 'sort-ascending'} size={24} color={GlobalStyles.colors.primary100} onPress={onPress}/>
        </View>
    );

    let searcher = (
        <SearchBar />
    );

    if(expenses.length > 0) {
        content =  <ExpensesList expenses={expenses} period={expensesPeriod}/>
    }

    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} period={expensesPeriod}/>
            {expensesPeriod === 'Total' && !searching && sorter}
            {expensesPeriod === 'Total' && searching && searcher}
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
    },
    sorterContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 12
    }
});