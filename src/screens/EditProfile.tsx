import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert, ScrollView, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../utils/TypeScript'
import InputWithLabel from '../components/InputWithLabel'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'
import { updateUser } from '../redux/actions/authAction'
const EditProfile = () => {
   const { auth } = useSelector((state: RootStore) => state)
   const navigation = useNavigation<any>()
   const dispatch = useDispatch<any>()
   const [newUser, setNewUser] = React.useState(auth.user)

   const options: any = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [3, 2],
      quality: 1,
   };
   const handleChangeImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.canceled) {
         setNewUser({
            ...newUser,
            avatar: `data:image/jpg;base64,${result.assets[0].base64}`
         })
      }
   }

   const updateProfile = () => {
      try {
         dispatch(updateUser(newUser, auth.access_token))
      } catch (err: any) {
         Alert.alert('Error', err.response.data.msg)
      }
   }

   return (
      <ScrollView style={styles.container}>
         <View style={styles.header}>
            <TouchableOpacity style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
               onPress={() => navigation.goBack()}
            >
               <Icon
                  name='times'
                  size={25}
               />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: '500', flex: 1 }}>Edit profile</Text>
            <TouchableOpacity style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
               onPress={updateProfile}
            >
               {
                  auth.load ?
                  <ActivityIndicator size="small" color="#666" />
                     :
                     <Icon
                        name='check'
                        size={25}
                        color={'#0095f6'}
                     />
               }
            </TouchableOpacity>
         </View>
         <View>
            <Image
               source={{ uri: newUser?.avatar }}
               style={{
                  width: 80,
                  height: 80,
                  borderRadius: 100,
                  marginBottom: 10,
                  alignSelf: 'center'
               }}
            />
            <TouchableOpacity onPress={handleChangeImage}>
               <Text style={{ color: '#0095f6', textAlign: 'center' }}>Edit picture or avatar</Text>
            </TouchableOpacity>
         </View>
         <View>
            <InputWithLabel
               label='Name'
               text={newUser?.fullname}
               onChangeText={(text) => setNewUser({ ...newUser, fullname: text })}
            />
            <InputWithLabel
               label='Username'
               text={newUser?.username}
               onChangeText={(text) => setNewUser({ ...newUser, username: text })}
            />
            <InputWithLabel
               label='Mobile'
               text={newUser?.mobile}
               onChangeText={(text) => setNewUser({ ...newUser, mobile: text })}
            />
            <InputWithLabel
               label='Address'
               text={newUser?.address}
               onChangeText={(text) => setNewUser({ ...newUser, address: text })}
            />
            <InputWithLabel
               label='Website'
               text={newUser?.website}
               onChangeText={(text) => setNewUser({ ...newUser, website: text })}
            />
            <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, marginVertical: 10, width: '100%' }}>
               <Text style={{ fontSize: 14, fontWeight: '500', color: '#666' }}>Story</Text>
               <TextInput
                  value={newUser?.story}
                  numberOfLines={5}
                  multiline={true}
                  style={{ paddingVertical: 5, fontSize: 16, color: '#000', padding: 5, textAlignVertical: 'top', width: '100%' }}
                  onChangeText={(text) => setNewUser({ ...newUser, story: text })}
               />
            </View>
         </View>
      </ScrollView>
   )
}

export default EditProfile

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white'
   },
   header: {
      height: 50,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
   }
})