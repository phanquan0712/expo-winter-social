import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import HeaderShowTitle from '../components/HeaderShowTitle'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../utils/TypeScript'
import { getDetailPost } from '../redux/actions/postDetailAction'
import Loading from '../components/Loading';
import PostCardItem from '../components/PostCardItem';
const DetailPost = () => {
   const { id }  = useRoute<any>().params
   const navigation = useNavigation<any>()
   const { auth, postDetail } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   React.useEffect(() => {
      if(id && auth.access_token) {
         dispatch(getDetailPost(id, auth.access_token))
      }
   }, [id, auth.access_token])

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.header}>
            <TouchableOpacity 
               onPress={() => navigation.goBack()}
            >
               <Icon
                  name='times'
                  size={20}
                  color='#000'
               />
            </TouchableOpacity>
            <View style={{ flex: 1, paddingHorizontal: 20}}>
               <Text style={{ fontSize: 18, color: '#333', fontWeight: '500'}}>Post</Text>
            </View>
         </View>
         {
            postDetail.isLoad ? 
            <Loading />
            :
            <PostCardItem 
               post={postDetail.post}
               handleModal={() => {}}
            />
         }
      </SafeAreaView>
   )
}

export default DetailPost

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white'
   },
   header: {
      height: 40,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10
   }
})