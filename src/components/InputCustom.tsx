import * as React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

interface IProps {
   value: string
   onChangeText: (text: string) => void
   placeholder: string
   secureTextEntry?: boolean
   label?: string
   icon?: string,
}

const InputCustom: React.FC<IProps> = ({ value, onChangeText, placeholder, secureTextEntry, label, icon}) => {
   return (
      <View style={styles.input}>
         { label && <Text style={styles.label}>{label}</Text> }
         <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1}}>
            { icon && <Icon name={icon} size={15} color="#666" style={{ marginRight: 10}}/> }
            <TextInput
               value={value}
               onChangeText={onChangeText}
               placeholder={placeholder}
               placeholderTextColor="#666"
               secureTextEntry={secureTextEntry}
               style={styles.inputText}
            />
         </View>
      </View>
   )
}

export default InputCustom

const styles = StyleSheet.create({
   input: {
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      height: 50,
      backgroundColor: 'white',
      marginBottom: 20,
      paddingHorizontal: 20,
      borderRadius: 20,
   },
   label: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
   },
   inputText: {
      flex: 1,
      fontSize: 14,
      fontWeight: '500',
      color: '#333',
   }
})