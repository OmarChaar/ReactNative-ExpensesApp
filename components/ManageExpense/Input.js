import { StyleSheet, View, TextInput, Text } from 'react-native';
import { GlobalStyles } from '../../contants/styles';

function Input({label, textInputConfig, style, styleInput, invalid}) {

    let inputStyles = [styles.textInput, styleInput];

    if(textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.multiline);
    }

    if(invalid) {
        inputStyles.push(styles.invalid)
    }
    
    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.text, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput 
                style={inputStyles}
                {...textInputConfig}
            />
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 4,
        marginVertical: 12,
    },
    text: {
        color: GlobalStyles.colors.primary100,
        fontSize: 12,
        marginBottom: 6
    },
    textInput: {
        fontSize: 16,
        color: GlobalStyles.colors.primary400,
        backgroundColor: GlobalStyles.colors.primary200,  
        borderRadius: 6,
        padding: 5
    },
    multiline: {
        minHeight: 100,
        textAlignVertical: 'top',
        padding: 5
    },
    invalid: {
        backgroundColor: GlobalStyles.colors.error50,
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500,
    }
});