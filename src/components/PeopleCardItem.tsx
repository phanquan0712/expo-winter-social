import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ButtonWithText from './ButtonWithText'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../utils/TypeScript'
import { follow } from '../redux/actions/userAction'
interface IProps {
   id: string
   avatar: string
   name: string
   handleDeleteDiscoverPeople: (id: string) => void
}

const PeopleCardItem: React.FC<IProps> = ({ id, avatar, name, handleDeleteDiscoverPeople}) => {
   const { auth } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const handleFollow = () => {
      if(auth && id) {
         dispatch(follow(auth.user, auth.access_token, id))
         return handleDeleteDiscoverPeople(id)
      }
   }

   return (
      <View style={styles.peopleCardItem}>
         <TouchableOpacity style={{ 
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1
         }}
            onPress={() => handleDeleteDiscoverPeople(id)}
         >
            <Icon 
               name='times'
               size={15}
               color='#999'
            />
         </TouchableOpacity>
         <TouchableOpacity>
            <Image
               source={{ uri: avatar }}
               style={{
                  width: 80,
                  height: 80,
                  borderRadius: 80,
                  marginBottom: 10,
                  alignSelf: 'center'
               }}
            />
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>{name.slice(0, 12) + '...'}</Text>
         </TouchableOpacity>
         <ButtonWithText 
            text='Follow'
            onPress={handleFollow}
            bgBtn='#0095f6'
            colorText='white'
            height={35}
            fontSize={14}
            borderRadius={10}
         />
      </View>
   )
}

export default PeopleCardItem

const styles = StyleSheet.create({
   peopleCardItem: {
      width: 150,
      height: 200,
      borderColor: '#eee',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      backgroundColor: 'white',
      marginRight: 3
   }
})