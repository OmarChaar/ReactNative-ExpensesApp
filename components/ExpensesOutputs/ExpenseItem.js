
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from '../../contants/styles';
import { getFormattedDate } from '../../util/date';

function ExpenseItem({ id, description, amount, date }) {

    // We use a hook because 'ExpenseItem' is not part of the navigation.
    const navigation = useNavigation();

    function expensePressHandler() {
        navigation.navigate("ManageExpense", {
            expenseID: id
        });
    }
      
    return (    
        <TouchableOpacity onPress={expensePressHandler} activeOpacity={0.75}>
            <View style={styles.container}>
                <View >
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <Text style={[styles.textBase, styles.date]}>{getFormattedDate(date)}</Text>
                </View>          
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>         

            </View>
        </TouchableOpacity>
    )
}

export default ExpenseItem;


const styles = StyleSheet.create({
    container: {
        backgroundColor: GlobalStyles.colors.primary500,
        marginVertical: 8,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4
    },
    textBase: {
        color: GlobalStyles.colors.primary50
    }, 
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold'
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: GlobalStyles.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold'
    }
});