import * as React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native'
import HeaderShowTitle from './../components/HeaderShowTitle';
import { IComment, IPost } from '../utils/TypeScript';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../utils/TypeScript';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import CommentCardItem from '../components/CommentCardItem';
const CommentPost = () => {
   const { auth } = useSelector((state: RootStore) => state)
   const { post } = useRoute<any>().params   
   const [writeComment, setWriteComment] = React.useState<string>('')

   const listIcon = ["🙂","😀","😄","😆","😅","😂","🤣","😊","😌","😉","😏","😍","😘","😗","😙","😚","🤗","😳","🙃","😇","😈","😛","😝","😜",'😋','🤤',"🤓", "😎", '🤑', "😠", "😡", "💩", "🎃", "👿", "👍", "👎","🤞", "👩", "💂", "👳", "👊", "✊","🙌","🖖","👂", "👃", "👁️️","🎖️️", "🏆️", "🎧️", "🥈️", "🥇️", "🏅"]
   return (
      <View style={styles.container}>
         <HeaderShowTitle title="Comments" iconRight='paper-plane' />
         <ScrollView style={{ flex: 1}}>
            <View style={styles.contentPost}>
               <TouchableOpacity>
                  <Image
                     source={{ uri: post.user?.avatar as string }}
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
               <View style={{ flex: 1}}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 10}}>
                     <Text style={{ fontSize: 14, fontWeight: 'bold', marginRight: 10 }}>{post.user?.username as string}</Text>
                     <Text style={{ fontSize: 14, fontWeight: '400', width: '100%' }}>{post.content}</Text>
                  </View>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: '#444'}}>{moment(new Date(post.createdAt)).fromNow()}</Text>
               </View>
            </View>
            <View style={{ paddingVertical: 15}}>
               {
                  (post.comments as IComment[])?.map((comment, index) => (
                     <CommentCardItem key={index + 1} comment={comment} post={post} />
                  ))
               }
            </View>
         </ScrollView>
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
               <TextInput
                  style={{ flex: 1 }}
                  placeholder='Add a comment...'
                  placeholderTextColor={'#666'}
                  value={writeComment}
                  onChangeText={text => setWriteComment(text)}
               />
               <TouchableOpacity style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{
                     color: '#0095f6',
                     fontSize: 14,
                     fontWeight: 'bold',
                     opacity: writeComment ? 1 : 0.3
                  }}>Post</Text>
               </TouchableOpacity>
            </View>
         </View>
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