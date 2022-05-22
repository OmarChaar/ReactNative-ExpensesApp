import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '../../contants/styles';
import Input from './Input';

function ExpenseForm() {

    function amountChangedHandler() {

    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Your Expense</Text>

            <View style={styles.amountDateContainer}>

                <Input 
                    label="Amount"
                    style={{flex: 1}}
                    styleInput={{fontWeight: 'bold'}}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: amountChangedHandler,
                    }}
                />

                <Input 
                    label="Date"
                    style={{flex: 1}}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: () => {},
                    }}
                />

            </View>

            <Input 
                label="Description"
                textInputConfig={{
                    multiline: true,
                    onChangeText: () => {},
                }}
            />
        </View>
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.colors.white,
        marginVertical: 12,
    },
    amountDateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
