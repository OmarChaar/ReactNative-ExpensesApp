import { StyleSheet, View, TextInput } from 'react-native';
import { GlobalStyles } from '../../contants/styles';

function SearchBar() {
    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.textInput}
                placeholder="Search all your expenses"
            />
        </View>
    )
}

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
    },
    textInput: {
        borderWidth: 1,
        borderColor: GlobalStyles.colors.primary200,
        borderRadius: 6,
        width: '100%',
        backgroundColor: GlobalStyles.colors.white,
        padding: 8,
        fontSize: 12,
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold'
    }

})