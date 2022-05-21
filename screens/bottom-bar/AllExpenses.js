
import { StyleSheet, Text, View } from 'react-native';

function AllExpenses({navigation}) {
    
    return (
        <View style={styles.container}>
            <Text>ALL EXPENSES!</Text>
        </View>
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