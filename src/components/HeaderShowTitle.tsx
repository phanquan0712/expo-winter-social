import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'


interface IProps {
   iconLeft?: boolean
   title: string,
   iconRight?: string
   onPressIconRight?: () => void
   colorIconRight?: string
}

const HeaderShowTitle: React.FC<IProps> = ({ iconLeft, title, iconRight, onPressIconRight, colorIconRight }) => {
   const navigation = useNavigation<any>()
   return (
      <View style={styles.header}>
         {
            !iconLeft &&
            <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
               <Icon
                  name="arrow-left"
                  size={20}
               />
            </TouchableOpacity>
         }
         <Text style={styles.headerText}>{title}</Text>
         {
            iconRight && 
            <TouchableOpacity style={styles.headerIcon} onPress={onPressIconRight}>
               <Icon
                  name={iconRight}
                  size={20}
                  color={colorIconRight ? colorIconRight : '#000'}
               />
            </TouchableOpacity>
         }
      </View>
   )
}

export default HeaderShowTitle

const styles = StyleSheet.create({
   header: {
      height: 50,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white'
   },
   headerIcon: {
      height: 50,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
   },
   headerText: {
      flex: 1,
      fontSize: 18,
      fontWeight: '400',
      paddingLeft: 10
   }
})