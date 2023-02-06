import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../utils/TypeScript'
import { useRoute } from '@react-navigation/native'
import HeaderShowTitle from '../components/HeaderShowTitle'
import { useNavigation } from '@react-navigation/native'
import { createPost } from '../redux/actions/postAction'
import Loading from './../components/Loading';
import InputText from '../components/InputText'
import { ShowError } from '../utils/ShowMessage'
import Icon from 'react-native-vector-icons/FontAwesome5';
const NewPost_Step2Screen = () => {
   const { auth, post } = useSelector((state: RootStore) => state)
   const { images } = useRoute<any>().params;
   const navigation = useNavigation<any>()
   const dispatch = useDispatch<any>()
   const [caption, setCaption] = React.useState<string>('')

   const handleCreatePost = () => {
      if(caption.trim() === '') {
         return ShowError('Caption is required')
      }  
      try {
         dispatch(createPost(caption, images, auth.access_token))
         setTimeout(( ) => {
            return navigation.navigate('Home')
         }, 1000)
      } catch(err: any) {
         // 
      }
   }

   return (
      <View style={[styles.container]}>
            {/* <HeaderShowTitle
               iconLeft={false}
               title='New Post'
               iconRight='check'
               onPressIconRight={handleCreatePost}
            /> */}
            <View style={styles.header}>
               <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name='arrow-left' size={20} color='#000' />
               </TouchableOpacity>
               <View style={{ flex: 1, paddingHorizontal: 20}}>
                  <Text style={{ fontSize: 18, color: '#333', fontWeight: '500'}}>New Post</Text>
               </View>
               {
                  post.load ? 
                  <ActivityIndicator size="small" color="#666" style={{width: 30, height: 30}} />
                  :
                  <TouchableOpacity onPress={handleCreatePost}>
                     <Icon name='check' size={20} color='#000' />
                  </TouchableOpacity>
               }
            </View>
         <View style={{
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
         }}>
            <TouchableOpacity onPress={() => navigation.navigate('PreviewImage', { images })}>
               <Image
                  source={{ uri: images[0] }}
                  style={{ width: 50, height: 50, borderRadius: 10, marginRight: 10 }}
               />
            </TouchableOpacity>
            <TextInput 
               placeholder='Write a caption...'
               placeholderTextColor={'#666'}
               style={{ flex: 1, fontSize: 16, color: '#000', fontWeight: '500' }}
               value={caption}
               onChangeText={setCaption}
            />
         </View>
      </View>
   )
}

export default NewPost_Step2Screen

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white'
   },
   header: {
      height: 50,
      flexDirection: 'row',
      paddingHorizontal: 10,
      alignItems: 'center',
   }
})