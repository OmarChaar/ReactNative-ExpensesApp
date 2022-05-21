
import { StyleSheet, Text, View } from 'react-native';
import ExpensesOutput from '../../components/expenses/ExpensesOutput';

function AllExpenses({navigation}) {
    
    return (
      <ExpensesOutput expensesPeriod="Total"/>
    )
}

export default AllExpenses;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });