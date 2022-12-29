import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'


interface IProps {
   title: string,
   iconRight?: string
}

const HeaderShowTitle: React.FC<IProps> = ({ title, iconRight }) => {
   const navigation = useNavigation<any>()
   return (
      <View style={styles.header}>
         <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
            <Icon
               name="arrow-left"
               size={20}
            />
         </TouchableOpacity>
         <Text style={styles.headerText}>{title}</Text>
         {
            iconRight && 
            <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
               <Icon
                  name={iconRight}
                  size={20}
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
   }
})