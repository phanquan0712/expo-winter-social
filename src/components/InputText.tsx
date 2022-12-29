import * as React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

interface IProps {
   icon?: string
   placeholder: string
   value: string
   onChangeText: (text: string) => void
}

const InputText: React.FC<IProps> = ({ icon, placeholder, value, onChangeText }) => {
   return (
      <View style={styles.input}>
         {
            icon && 
            <Icon
               name={icon}
               size={16}
               color="gray"
               style={{ marginRight: 10 }}
            />
         }
         <TextInput 
            placeholder="Search"
            placeholderTextColor="gray"
            style={styles.textInput}
         />
      </View>
   )
}

export default InputText

const styles = StyleSheet.create({
   input: {
      height: 40,
      width: '100%',
      borderRadius: 20,
      paddingHorizontal: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f2f2f2'
   },
   textInput: {
      fontWeight: '400',
      color: '#333',
      flex: 1,
      backgroundColor: 'transparent'
   }
})