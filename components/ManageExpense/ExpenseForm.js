import { StyleSheet, View, Text, Alert } from 'react-native';
import { GlobalStyles } from '../../contants/styles';
import { useState } from 'react';

import Input from './Input';
import Button from '../ui/Button';
import { getFormattedDate } from '../../util/date';

function ExpenseForm({onCancel, onSubmit, isEditing, defaultValues}) {

    /*
        In order not to use multiple 'useState()' hooks for every input,
        we will use a state that stores an object.
    */
    const [inputs, setInput] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        }
    });

    /*
        If the function is connected to a TextInput 'onChangeText', React 
        automatically gives us the entered value.
    */
    function inputChangedHandler(inputIdentifier, entered) {
        setInput((curInput) => {
            // Returns everything untouched except for the identified item.
            return {
                ...curInput,
                [inputIdentifier]: {value: entered, isValid: true}
            }
        });
    }

    function submitHandler() {
        console.log("submitHandler", inputs.amount.value, inputs.date.value, inputs.description.value);
        const expenseData = {
            // '+' transforms a string into a number
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid input', 'Please check your input values');
            setInput((curInput) => {
                return {
                    amount: {
                        value: curInput.amount.value, 
                        isValid: amountIsValid
                    },
                    date: {
                        value: curInput.date.value, 
                        isValid: dateIsValid
                    },
                    description: {
                        value: curInput.description.value, 
                        isValid: descriptionIsValid
                    }
                }
            })
            return;
        }

        onSubmit(expenseData);

    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>Your Expense</Text>

                <View style={styles.amountDateContainer}>

                    <Input 
                        label="Amount"
                        style={{flex: 1}}
                        invalid={!inputs.amount.isValid}
                        styleInput={{fontWeight: 'bold'} }
                        textInputConfig={{
                            keyboardType: 'decimal-pad',
                            onChangeText: inputChangedHandler.bind(this, 'amount'),
                            value: inputs.amount.value
                        }}
                    />

                    <Input 
                        label="Date"
                        style={{flex: 1}}
                        invalid={!inputs.date.isValid}
                        textInputConfig={{
                            placeholder: 'YYYY-MM-DD',
                            maxLength: 10,
                            onChangeText: inputChangedHandler.bind(this, 'date'),
                            value: inputs.date.value
                        }}
                    />

                </View>

                <Input 
                    label="Description"
                    invalid={!inputs.description.isValid}
                    textInputConfig={{
                        multiline: true,
                        onChangeText: inputChangedHandler.bind(this, 'description'),
                            value: inputs.description.value
                    }}
                />

            {formIsInvalid && (
                <Text style={styles.invalidText}>Invalid input values, please check your entered data.</Text>
            )}

            </View>


            <View style={styles.buttonContainer}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>
            
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
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    invalidText: {
        color: GlobalStyles.colors.error500,
        margin: 8,
        textAlign: 'center'
    }
});
