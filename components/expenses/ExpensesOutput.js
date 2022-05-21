import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../../contants/styles';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of pants',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e4',
        description: 'Book',
        amount: 14.99,
        date: new Date('2022-02-15')
    },
    {
        id: 'e5',
        description: 'Another Book',
        amount: 18.59,
        date: new Date('2022-02-18')
    },
    {
        id: 'e6',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e7',
        description: 'A pair of pants',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id: 'e8',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e9',
        description: 'Book',
        amount: 14.99,
        date: new Date('2022-02-15')
    },
    {
        id: 'e10',
        description: 'Another Book',
        amount: 18.59,
        date: new Date('2022-02-18')
    },
    {
        id: 'e11',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e12',
        description: 'A pair of pants',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id: 'e13',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e14',
        description: 'Book',
        amount: 14.99,
        date: new Date('2022-02-15')
    },
    {
        id: 'e15',
        description: 'Another Book',
        amount: 18.59,
        date: new Date('2022-02-18')
    },
    {
        id: 'e16',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e17',
        description: 'A pair of pants',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id: 'e18',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e19',
        description: 'Book',
        amount: 14.99,
        date: new Date('2022-02-15')
    },
    {
        id: 'e20',
        description: 'Another Book',
        amount: 18.59,
        date: new Date('2022-02-18')
    }
];


function ExpensesOutput({ expenses, expensesPeriod }) {
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={DUMMY_EXPENSES} period={expensesPeriod}/>
            <ExpensesList expenses={DUMMY_EXPENSES}/>
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
});