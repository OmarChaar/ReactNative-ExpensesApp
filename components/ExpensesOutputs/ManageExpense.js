import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '../../contants/styles';
import ExpenseForm from '../ManageExpense/ExpenseForm';

function ManageExpense() {
    return (
        <View style={styles.container}>
            <ExpenseForm/>
        </View>
    
    )
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow'
    },
});