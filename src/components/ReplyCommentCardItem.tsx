import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { IComment, IUser, IPost } from '../utils/TypeScript'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootStore } from '../utils/TypeScript';
import { likeComment, unLikeComment } from '../redux/actions/commentAction';
import { TAG_ANSWER_COMMENT } from '../redux/types/commentType';
interface IProps {
   comment: IComment
   post: IPost
}

const CommentCardItem: React.FC<IProps> = ({ comment, post }) => {
   const dispatch = useDispatch<any>()
   const navigation = useNavigation<any>()
   const { auth } = useSelector((state: RootStore) => state)
   const [isLike, setIsLike] = React.useState<boolean>(false)

   React.useEffect(() => {
      if (comment) {
         if (comment.likes?.find(item => item._id === auth.user?._id)) {
            setIsLike(true)
         }
      }
   }, [comment.likes, auth.user])

   const handleLikeComment = () => {
      if (!isLike) {
         dispatch(likeComment(post, comment, auth))
         setIsLike(true)
      } else {
         dispatch(unLikeComment(post, comment, auth))
         setIsLike(false)
      }
   }

   const handleNavigation = () => {
      if (auth.user?._id === comment.user?._id) {
         return navigation.navigate('Profile')
      } else {
         return navigation.navigate('OtherProfile', { id: comment.user?._id })
      }
   }


   return (
      <View style={styles.contentPost}>
         <TouchableOpacity
            onPress={handleNavigation}
         >
            <Image
               source={{ uri: comment.user?.avatar as string }}
               style={{
                  width: 35,
                  height: 35,
                  borderRadius: 35,
                  marginRight: 10
               }}
            />
         </TouchableOpacity>
         <View style={{ flex :1}}>
            <View style={{ flex: 1, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
               <View style={{ flex: 1 }}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 10 }}>
                     <Text style={{ fontSize: 14, fontWeight: 'bold', marginRight: 10 }}>{comment.user?.username as string}</Text>
                     <Text style={{ fontSize: 14, fontWeight: '400', width: '100%' }}>{comment.content}</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                     <Text style={{ fontSize: 12, fontWeight: '500', color: '#444', marginRight: 10 }}>{moment(new Date(comment.createdAt)).fromNow()}</Text>
                     {
                        comment.likes &&
                        comment.likes?.length > 0 &&
                        <Text style={{ fontSize: 12, fontWeight: '500', color: '#444', marginRight: 10 }}>{comment.likes?.length} likes</Text>
                     }
                  </View>
               </View>
               <TouchableOpacity onPress={handleLikeComment}>
                  {
                     isLike ?
                        <Icon
                           name="heart"
                           size={15}
                           style={styles.heartActive}
                        />
                        :
                        <Icon
                           name="heart"
                           size={15}
                           color="#333"
                        />
                  }
               </TouchableOpacity>
            </View>
               
         </View>
      </View>
   )
}

export default CommentCardItem

const styles = StyleSheet.create({
   contentPost: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10
   },
   heartActive: {
      tintColor: 'red',
      color: 'red',
   },
})