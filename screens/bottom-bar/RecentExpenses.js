
import { StyleSheet, Text, View } from 'react-native';
import { useLayoutEffect } from 'react'
import IconButton from '../../components/ui/IconButton';


function RecentExpenses({navigation}) {

    function addExpensesNavigation() {
        navigation.navigate("Edit");
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Recent Expenses',
            headerRight: (color) => {
                return (
                    <IconButton size={24} color={color} onPress={addExpensesNavigation}/>
                )
            }

        })
    }, [navigation, addExpensesNavigation]);

    return (
        <View style={styles.container}>
            <Text>RECENT EXPENSES!</Text>
        </View>
    )
}

export default RecentExpenses;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });