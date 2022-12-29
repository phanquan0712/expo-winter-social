import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NotifycationScreen = () => {
   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.headerText}>Activity</Text>
         </View>
      </View>
   )
}

export default NotifycationScreen

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   header: {
      height: 50,
      width: '100%',
      paddingHorizontal: 20,
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'      
   },
   headerText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000'
   }
})