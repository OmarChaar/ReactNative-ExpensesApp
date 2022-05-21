import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons'; 


function IconButton({color, size, onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Ionicons name="add" size={size} color={color} />
        </TouchableOpacity>
    )
}

export default IconButton;