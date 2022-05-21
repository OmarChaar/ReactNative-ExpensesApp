import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons'; 


function addExpensesHandler() {
    // navigation.navigate("Manage");
    console.log("HERE")
  }
  
function IconButton({ name, color, size, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Ionicons name={name} size={size} color={color} />
            </View>
        </TouchableOpacity>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    container: {
      borderRadius: 24,
      padding: 6,
      marginHorizontal: 8,
      marginVertical: 2
    },
  });