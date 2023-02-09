import * as React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { createAnswerComment, createComment } from '../redux/actions/commentAction'
import { IComment, IPost, RootStore } from '../utils/TypeScript'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TAG_ANSWER_COMMENT } from '../redux/types/commentType'

interface IProps {
   writeComment: string
   setWriteComment: (value: string) => void
   post: IPost
}
const InputComment: React.FC<IProps> = ({ writeComment, setWriteComment, post }) => {

   const listIcon = ["🙂", "😀", "😄", "😆", "😅", "😂", "🤣", "😊", "😌", "😉", "😏", "😍", "😘", "😗", "😙", "😚", "🤗", "😳", "🙃", "😇", "😈", "😛", "😝", "😜", '😋', '🤤', "🤓", "😎", '🤑', "😠", "😡", "💩", "🎃", "👿", "👍", "👎", "🤞", "👩", "💂", "👳", "👊", "✊", "🙌", "🖖", "👂", "👃", "👁️️", "🎖️️", "🏆️", "🎧️", "🥈️", "🥇️", "🏅"]

   const { auth, commentTag } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()





   const handleCreateComment = async () => {
      if(!commentTag.user) {
         const newComment = {
            content: writeComment,
            user: auth.user,
            likes: [],
            reply: [],
            createdAt: new Date().toISOString(),
         }
         dispatch(createComment(post, newComment as IComment, auth))
      } else {
         const newAnswerComment = {
            content: writeComment,
            tag: commentTag.user,
            likes: [],
            reply: [],
            user: auth.user,
            createdAt: new Date().toISOString(),
         }
         dispatch(createAnswerComment(post, commentTag, newAnswerComment, auth))
         dispatch({ type: TAG_ANSWER_COMMENT, payload: {} as IComment})
      }
      setWriteComment('')
   }


   return (
      <View style={styles.inputComment}>
         <View style={{ height: 50, width: '100%', borderBottomColor: '#ddd', borderBottomWidth: 1, borderTopColor: '#ddd', borderTopWidth: 1 }}>
            <FlatList
               data={listIcon}
               keyExtractor={(item, index) => index.toString()}
               horizontal
               showsHorizontalScrollIndicator={false}
               renderItem={({ item }) => (
                  <TouchableOpacity style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}
                     onPress={() => setWriteComment(writeComment + item)}
                  >
                     <Text style={{ fontSize: 20 }}>{item}</Text>
                  </TouchableOpacity>
               )}
            />
         </View>
         <View style={{ height: 50, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
               <Image
                  source={{ uri: auth.user?.avatar }}
                  style={{
                     width: 35,
                     height: 35,
                     borderRadius: 35,
                  }}
               />
            </TouchableOpacity>
            <View style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
               {
                  commentTag.user?.username &&
                  <View style={{
                     display: 'flex',
                     flexDirection: 'row', 
                     alignItems: 'center', 
                     backgroundColor: 'rgba(0, 149, 246, 0.1)',
                     marginRight: 5
                  }}>
                     <Text style={{ 
                        marginRight: 3
                     }}>@{commentTag.user?.username}</Text>
                     <TouchableOpacity>
                           <Icon
                              name="times"
                              size={12}
                              color="#666"
                           />
                     </TouchableOpacity>
                  </View>
               }
               <TextInput
                  style={{ flex: 1 }}
                  placeholder={commentTag.user?.username ? '' : 'Add a comment...'}
                  placeholderTextColor={'#666'}
                  value={writeComment}
                  onChangeText={text => setWriteComment(text)}
               />
            </View>
            <TouchableOpacity style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}
               onPress={handleCreateComment}
            >
               <Text style={{
                  color: '#0095f6',
                  fontSize: 14,
                  fontWeight: 'bold',
                  opacity: writeComment ? 1 : 0.3
               }}>Post</Text>
            </TouchableOpacity>
         </View>
      </View>
   )
}

export default InputComment

const styles = StyleSheet.create({
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