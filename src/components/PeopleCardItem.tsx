import * as React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import FollowButton from './FollowButton'


interface IProps {
   id: string
   avatar: string
   name: string
   handleDeleteDiscoverPeople: (id: string) => void
}
const PeopleCardItem: React.FC<IProps> = ({ id, avatar, name, handleDeleteDiscoverPeople }) => {
   return (
      <View style={styles.cardPeople}>
         <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
            <Image 
               source={{ uri: avatar }}
               style={{ width: 50, height: 50, borderRadius: 50, marginBottom: 5 }}
            />
            <Text style={{ fontSize: 16, fontWeight: '400', color: '#333'}}>
               {name}
            </Text>
         </TouchableOpacity>
         <FollowButton />
      </View>
   )
}

export default PeopleCardItem

const styles = StyleSheet.create({
   cardPeople: {
      width: 120,
      padding: 10,
      borderColor: '#ddd',
      borderWidth: 1,
      margin: 2,
      borderRadius: 5
   }
})