import { StyleSheet, Text, View, FlatList } from 'react-native';
import { borderLeftColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { GlobalStyles } from '../../contants/styles';

function ExpensesSummary({ expenses, period }) {

  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{period}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  )
}

export default ExpensesSummary;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 8,
      backgroundColor: GlobalStyles.colors.primary50,
      borderRadius: 6,
      alignItems: 'center'
    },
    period: {
      fontSize: 12,
      color: GlobalStyles.colors.primary400
    },
    sum: {
      fontSize: 16,
      fontWeight: 'bold',
      color: GlobalStyles.colors.primary500
    }
});