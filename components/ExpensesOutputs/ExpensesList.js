import { StyleSheet, FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';


function renderExpenseList(itemData) {

    const item = itemData.item;

    return (
        // Shorter approach if the arguments in 'ExpenseItem' are the same as the item being passed.
        <ExpenseItem {...item}/>
    )
}

function ExpensesList({expenses, period}) {

    return (
       <FlatList 
            data={expenses}
            keyExtractor={item => item.id}
            renderItem={renderExpenseList}
            style={(period !== 'Total') && styles.flastListContainer}
       />
    )
}

export default ExpensesList;

const styles = StyleSheet.create({
    flastListContainer: {
        marginTop: 24
    }
});