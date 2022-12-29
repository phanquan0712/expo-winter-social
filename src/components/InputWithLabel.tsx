import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

interface IProps {
   label: string
   text: string
   onChangeText?: (text: string) => void
}

const InputWithLabel: React.FC<IProps> = ({ label, text, onChangeText }) => {
   return (
      <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, marginVertical: 10}}>
      <Text style={{ fontSize: 14, fontWeight: '500', color: '#666' }}>{label}</Text>
      <TextInput 
         value={text}
         style={{ paddingVertical: 5, fontSize: 16, color: '#000', padding: 5}}
         onChangeText={onChangeText}
      />
   </View>
   )
}

export default InputWithLabel

const styles = StyleSheet.create({})