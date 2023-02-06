import * as React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { IPost, IImages } from 'src/utils/TypeScript'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Video } from 'expo-av';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unLikePost } from '../redux/actions/postAction';
import { useNavigation } from '@react-navigation/core';
interface IProps {
   post: IPost
   handleModal?: (post: IPost) => void
}
const PostCardItem: React.FC<IProps> = ({ post, handleModal }) => {
   const { auth } = useSelector((state: any) => state)
   const carouselRef = React.useRef<any>(null)
   const [activeSlide, setActiveSlide] = React.useState<number>(0)
   const [isLiked, setIsLiked] = React.useState<boolean>(false)
   const dispatch = useDispatch<any>()
   const navigation = useNavigation<any>()
   React.useEffect(() => {
      if (post.likes.find((like: any) => like._id === auth.user._id)) {
         setIsLiked(true)
      }
   }, [auth.user, post.likes])


   const handleLike = () => {
      if (isLiked) {
         dispatch(unLikePost(post, auth ))
      } else {
         dispatch(likePost(post, auth ))
      }
      setIsLiked(!isLiked)
   }

   const renderItem = ({ item }: { item: IImages }) => (
      <>
         {
            item.url.includes('/video/i') ?
               <Video
                  source={{ uri: item.url as string }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  style={{ height: 400, width: 400, borderColor: '#ddd', borderWidth: 1 }}
                  shouldPlay={false}

               />
               :
               <Image
                  source={{ uri: item.url as string }}
                  style={{ height: 400, width: 400, borderColor: '#ddd', borderWidth: 1 }}
                  resizeMode='cover'
               />
         }
      </>
   )


   return (
      <View style={{ backgroundColor: 'white' }}>
         <View style={styles.headerPost}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
               <Image
                  source={{ uri: post.user?.avatar as string }}
                  style={{
                     height: 30,
                     width: 30,
                     borderRadius: 35,
                     borderColor: 'orange',
                     borderWidth: 1,
                     marginRight: 10
                  }}
               />
               <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{post.user?.username as string}</Text>
            </View>
            <TouchableOpacity>
               <Icon
                  name='ellipsis-v'
                  size={18}
                  color='#333'
               />
            </TouchableOpacity>
         </View>
         <Carousel
            ref={carouselRef}
            layout={'tinder'}
            data={post.images}
            renderItem={({ item }: any) => renderItem({ item })}
            sliderWidth={400}
            itemWidth={400}
            style={{ height: 400, width: 400 }}
            onSnapToItem={(activeSlide) => setActiveSlide(activeSlide)}
         />
         <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 40 }}>
               <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 100 }}>
                  <TouchableOpacity onPress={handleLike}>
                     {
                        isLiked ?
                           <Icon
                              name='heart'
                              size={20}
                              color='red'
                           />
                           :
                           <Icon
                              name='heart'
                              size={20}
                              color='#333'
                           />
                     }
                  </TouchableOpacity>
                  <TouchableOpacity 
                     onPress={() => navigation.navigate('CommentPost', {post})}
                  >
                     <Icon
                        name='comment'
                        size={20}
                        color='#333'
                     />
                  </TouchableOpacity>
                  <TouchableOpacity>
                     <Icon
                        name='paper-plane'
                        size={20}
                        color='#333'
                     />
                  </TouchableOpacity>
               </View>
               <Pagination
                  dotsLength={post.images?.length}
                  activeDotIndex={activeSlide}
                  containerStyle={{ width: 50 }}
                  dotStyle={{
                     width: 6,
                     height: 6,
                     borderRadius: 5,
                     marginHorizontal: 2,
                     backgroundColor: '#2C65E0'
                  }}
                  inactiveDotStyle={{
                     // Define styles for inactive dots here
                  }}
                  dotColor="#2C65E0"
                  inactiveDotColor="#999"
                  inactiveDotScale={1}
               />
               <TouchableOpacity>
                  <Icon
                     name='bookmark'
                     size={20}
                     color='#333'
                  />
               </TouchableOpacity>
            </View>
            <View style={{ paddingVertical: 5 }}>
               {
                  post.likes &&
                  post.likes?.length > 0 &&
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>{post.likes?.length} likes</Text>
               }
               <View style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', marginRight: 10 }}>{post.user?.username}</Text>
                  <Text style={{ fontSize: 16, fontWeight: '400' }} >{post.content}</Text>
               </View>
               {
                  post.comments &&
                  post.comments?.length > 0 &&
                  <Text style={{ fontSize: 16, fontWeight: '400', color: '#999' }}>View all {post.comments?.length} comments</Text>
               }
               <Text style={{ fontSize: 14, fontWeight: '400', color: '#999' }}>
                  {moment(post.createdAt).fromNow()}
               </Text>
            </View>
         </View>
      </View>
   )
}

export default PostCardItem

const styles = StyleSheet.create({
   headerPost: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 50,
      paddingHorizontal: 10
   },
})