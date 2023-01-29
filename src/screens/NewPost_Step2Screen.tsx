import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../utils/TypeScript'
import { useRoute } from '@react-navigation/native'
import HeaderShowTitle from '../components/HeaderShowTitle'
import { useNavigation } from '@react-navigation/native'
import { createPost } from '../redux/actions/postAction'
import Loading from './../components/Loading';
const NewPost_Step2Screen = () => {
   const { auth, post } = useSelector((state: RootStore) => state)
   const { medias } = useRoute<any>().params;
   const navigation = useNavigation<any>()
   const dispatch = useDispatch<any>()
   const [caption, setCaption] = React.useState<string>('')


   const handleCreatePost = () => {
      if (medias.length > 0 && caption.length > 0) {
         dispatch(createPost(caption, medias, auth.access_token))
         console.log({
            medias,
            caption
         });
         
      }
   }

   return (
      <View  style={[styles.container]}>
         <HeaderShowTitle
            title='New post'
            iconRight='check'
            onPressIconRight={handleCreatePost}
            colorIconRight='#0095f6'
         />
         <ScrollView style={{ flex: 1, padding: 16 }}>
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
               <TouchableOpacity
                  onPress={() => navigation.navigate('PreviewImage', { medias })}
               >
                  <Image
                     source={{ uri: medias[0] }}
                     style={{
                        width: 50,
                        height: 50,
                        borderRadius: 10
                     }}
                  />
               </TouchableOpacity>
               <TextInput
                  placeholder='Write a caption...'
                  placeholderTextColor={'#999'}
                  value={caption}
                  onChangeText={text => setCaption(text)}
                  style={{
                     flex: 1,
                     paddingHorizontal: 10,
                     fontSize: 16
                  }}
               />
            </View>
         </ScrollView>
         {
            post.load && 
            <View style={{
               position: 'absolute',
               top: 0,
               bottom: 0,
               left: 0,
               right: 0,
               margin: 'auto',
            }}>
               <Loading />
            </View>
         }
      </View>
   )
}

export default NewPost_Step2Screen

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white'
   }
})