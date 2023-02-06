import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const FollowButton = () => {

   const handleFollow = () => {

   }

   return (
      <TouchableOpacity style={{ height: 40, width: '100%', borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', 
      backgroundColor: '#3ab1da'}}
         onPress={handleFollow}
      >
         <Text style={{ color: 'white', fontSize: 16, fontWeight: '500'}}>Follow</Text>
      </TouchableOpacity>
   )
}

export default FollowButton

const styles = StyleSheet.create({

})