import * as React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native'
import HeaderShowTitle from './../components/HeaderShowTitle';
import { IComment, IPost } from '../utils/TypeScript';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore, IUser } from '../utils/TypeScript';
import { useRoute, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import CommentCardItem from '../components/CommentCardItem';
import InputComment from '../components/InputComment';
import { getDetailPost } from '../redux/actions/postDetailAction';
import Loading from '../components/Loading';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ICommentType, TAG_ANSWER_COMMENT } from '../redux/types/commentType';
const CommentPost = () => {
   const { auth, postDetail, commentTag } = useSelector((state: RootStore) => state)
   const { id } = useRoute<any>().params
   const dispatch = useDispatch<any>()
   const navigation = useNavigation<any>()
   const [writeComment, setWriteComment] = React.useState<string>('')
   React.useEffect(() => {
      if (id) {
         dispatch(getDetailPost(id, auth.access_token))
      }
   }, [id, dispatch, auth.access_token])


   const handleNavigation = () => {
      if (commentTag.user) {
         dispatch({ type: TAG_ANSWER_COMMENT, payload: {} as IComment })
      }
      return navigation.goBack()
   }

   return (
      <View style={styles.container}>
         <View style={{
            height: 40,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20
         }}>
            <TouchableOpacity
               onPress={handleNavigation}
            >
               <Icon
                  name='arrow-left'
                  size={20}
                  color='#000'
               />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: '500', paddingHorizontal: 20, flex: 1 }}>Comments</Text>
            <TouchableOpacity>
               <Icon
                  name='paper-plane'
                  size={20}
                  color='#000'
               />
            </TouchableOpacity>
         </View>
         <ScrollView style={{ flex: 1 }}>
            {
               postDetail.isLoad ?
                  <Loading />
                  :
                  <>
                     <View style={styles.contentPost}>
                        <TouchableOpacity>
                           <Image
                              source={{ uri: postDetail.post?.user?.avatar as string }}
                              style={{
                                 width: 35,
                                 height: 35,
                                 borderRadius: 35,
                                 borderColor: '#000',
                                 borderWidth: 1,
                                 marginRight: 10
                              }}
                           />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                           <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 10 }}>
                              <Text style={{ fontSize: 14, fontWeight: 'bold', marginRight: 10 }}>{postDetail.post.user?.username as string}</Text>
                              <Text style={{ fontSize: 14, fontWeight: '400', width: '100%' }}>{postDetail.post.content}</Text>
                           </View>
                           <Text style={{ fontSize: 12, fontWeight: '500', color: '#444' }}>{moment(new Date(postDetail.post.createdAt)).fromNow()}</Text>
                        </View>
                     </View>
                     <View style={{ paddingVertical: 15 }}>
                        {
                           (postDetail.post.comments as IComment[])?.length > 0 ?
                              (postDetail.post.comments as IComment[])?.map((comment, index) => (
                                 <CommentCardItem
                                    key={index + 1}
                                    comment={comment}
                                    post={postDetail.post} />
                              ))
                              :
                              <>
                                 <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '500', color: '#333' }}>No comments</Text>
                                 <Text
                                    style={{
                                       textAlign: 'center',
                                       fontSize: 14,
                                       fontWeight: '400',
                                       color: '#444'
                                    }}
                                 >
                                    Be the first to comment
                                 </Text>
                              </>
                        }
                     </View>
                  </>
            }
         </ScrollView>
         <InputComment
            writeComment={writeComment}
            setWriteComment={setWriteComment}
            post={postDetail.post}
         />
      </View>
   )
}

export default CommentPost

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
   inputComment: {
      backgroundColor: 'white',
      height: 100,
      width: '100%',
      position: 'absolute',
      left: 0,
      bottom: 0,
   },
   contentPost: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingVertical: 10,
      paddingHorizontal: 20,
   }
})