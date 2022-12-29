import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

interface IProps {
   text: string
   onPress: () => void
   bgBtn: string,
   colorText: string,
   height?: number,
   width?: number,
   fontSize?: number,
   borderRadius?: number
}

const ButtonWithText: React.FC<IProps> = ({ text, onPress, bgBtn, colorText, width, height, fontSize, borderRadius }) => {
   return (
      <TouchableOpacity style={[styles.button, 
         { 
            backgroundColor: bgBtn, 
            width: width ? width : '100%', 
            height: height ? height : 50,
            borderRadius: borderRadius ? borderRadius : 30
         }
      ]}
         onPress={onPress}
      >
         <Text style={[styles.textBtn, { color: colorText, fontSize: fontSize ? fontSize : 16 }]}>{text}</Text>
      </TouchableOpacity>
   )
}

export default ButtonWithText

const styles = StyleSheet.create({
   button: {
      display: 'flex',
      justifyContent: 'center',      
      alignItems: 'center',
      borderRadius: 30,
      marginBottom: 20
   },
   textBtn: {
      fontWeight: '500',
      textTransform: 'capitalize'
   }
})