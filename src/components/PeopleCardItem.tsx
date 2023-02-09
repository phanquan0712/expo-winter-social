import * as React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import FollowButton from './FollowButton'
import { useNavigation } from '@react-navigation/native'
import { IUser } from '../utils/TypeScript'
interface IProps {
   user: IUser
}
const PeopleCardItem: React.FC<IProps> = ({ user }) => {
   const navigation = useNavigation<any>()
   const handleNavigation = () => {
      return navigation.navigate('OtherProfile', { id: user._id })
   }
   return (
      <View style={styles.cardPeople}>
         <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10}}
            onPress={handleNavigation}
         >
            <Image 
               source={{ uri: user.avatar as string }}
               style={{ width: 50, height: 50, borderRadius: 50, marginBottom: 5 }}
            />
            <Text style={{ fontSize: 16, fontWeight: '400', color: '#333'}}>
               {user.username}
            </Text>
         </TouchableOpacity>
         <FollowButton 
            user={user}
         />
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