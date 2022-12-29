import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import * as React from 'react'
import { IPost } from '../utils/TypeScript'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { IComment, IUser } from './../utils/TypeScript';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../utils/TypeScript';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { likePost, unLikePost } from '../redux/actions/postAction';
import { useNavigation } from '@react-navigation/native'
interface IProps {
   post: IPost,
   handleModal: (value: IPost) => void
}

const PostCardItem: React.FC<IProps> = ({ post, handleModal }) => {
   const dispatch = useDispatch<any>()
   const navigation = useNavigation<any>()
   const { auth } = useSelector((state: RootStore) => state)
   const [activeSlide, setActiveSlide] = React.useState<number>(0)
   const [isLike, setIsLike] = React.useState<boolean>(false)
   React.useEffect(() => {
      if(post.likes.find(item => item._id === auth.user?._id))
         setIsLike(true)
   }, [auth.user?._id, post.likes])


   const handleLikePost =  () => {
      if(!isLike) {
         dispatch(likePost(post, auth))
         setIsLike(true)
      } else {
         dispatch(unLikePost(post, auth))
         setIsLike(false)
      }
   }



   return (
      <>
         <View style={{ flex: 1 }}>
            <View style={styles.headerCardPost}>
               <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                     source={{ uri: post.user.avatar as string }}
                     style={{
                        width: 30,
                        height: 30,
                        borderRadius: 30,
                        marginRight: 5,
                     }}
                  />
                  <Text>{post.user.username as string}</Text>
               </View>
               <TouchableOpacity
                  onPress={() => handleModal(post)}
                  style={{ width: 30, height: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
               >
                  <Icon
                     name="ellipsis-v"
                     size={20}
                     color="#333"
                  />
               </TouchableOpacity>
            </View>
            <Carousel
               data={post.images}
               layout={'tinder'}
               renderItem={({ item }: { item: any }) => (
                  <Image
                     source={{ uri: item.url as string }}
                     style={{
                        width: '100%',
                        height: 400,
                        resizeMode: 'cover'
                     }}
                  />
               )}
               sliderWidth={Dimensions.get('window').width}
               itemWidth={Dimensions.get('window').width}
               onSnapToItem={(index) => setActiveSlide(index)}
            />
            <View style={styles.footerCardPost}>
               <View style={{ marginBottom: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                     <TouchableOpacity onPress={handleLikePost}>
                        {
                           isLike ?
                              <Icon
                                 name="heart"
                                 size={25}
                                 style={styles.heartActive}
                              />
                              :
                              <Icon
                                 name="heart"
                                 size={25}
                                 color="#333"
                                 style={{ marginRight: 15 }}
                              />
                        }
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => navigation.navigate('CommentPost', { post })}>
                        <Icon
                           name="comment"
                           size={25}
                           color="#333"
                           style={{ marginRight: 15 }}
                        />
                     </TouchableOpacity>
                     <TouchableOpacity>
                        <Icon
                           name="paper-plane"
                           size={25}
                           color="#333"
                        />
                     </TouchableOpacity>
                  </View>
                  <Pagination
                     dotsLength={post.images.length}
                     activeDotIndex={activeSlide}
                     containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
                     dotStyle={{
                        width: 5,
                        height: 5,
                        borderRadius: 5,
                        marginHorizontal: 2,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                     }}
                     inactiveDotStyle={{
                        // Define styles for inactive dots here
                     }}
                     inactiveDotOpacity={0.4}
                     inactiveDotScale={0.6}
                  />
                  <TouchableOpacity>
                     <Icon
                        name="bookmark"
                        size={25}
                        color="#333"
                     />
                  </TouchableOpacity>
               </View>
               {
                  (post.likes as IUser[])?.length > 0 &&
                  <Text style={{ fontSize: 14, fontWeight: '400', marginBottom: 10 }}>{post.likes.length} likes</Text>
               }
               {
                  post.content &&
                  post.content.length > 0 &&
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                     <Text style={{ fontSize: 14, fontWeight: '500', color: '#000', marginRight: 5 }}>{post.user.username as string}</Text>
                     <Text style={{ fontSize: 14, fontWeight: '400', color: '#333' }}>{post.content}</Text>
                  </View>
               }
               {
                  (post.comments as IComment[])?.length > 0 &&
                  <TouchableOpacity style={{ marginBottom: 10 }} 
                     onPress={() => navigation.navigate('CommentPost', { post })}
                  >
                     <Text style={{ fontSize: 14, fontWeight: '400', color: '#666' }}>View all {post.comments?.length} comments</Text>
                  </TouchableOpacity>
               }
               <Text style={{ fontSize: 12, color: '#666' }}>{moment(new Date(post.createdAt)).fromNow()}</Text>
            </View>
         </View>
      </>
   )
}

export default PostCardItem

const styles = StyleSheet.create({
   headerCardPost: {
      height: 50,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      backgroundColor: 'white'
   },
   footerCardPost: {
      padding: 15,
      backgroundColor: 'white',
   },
   heartActive: {
      tintColor: 'red',
      color: 'red',
      marginRight: 15
   },
})