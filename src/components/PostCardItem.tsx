import * as React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { IPost, IImages } from 'src/utils/TypeScript'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Video } from 'expo-av';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unLikePost } from '../redux/actions/postAction';
import { useNavigation } from '@react-navigation/core';
import RenderMedia from './RenderMedia';
import { savePost, unSavePost } from '../redux/actions/postAction';
interface IProps {
   post: IPost
   handleModal: (post: IPost) => void
}
const width = Dimensions.get('window').width
const PostCardItem: React.FC<IProps> = ({ post, handleModal }) => {
   const { auth, socket } = useSelector((state: any) => state)
   const carouselRef = React.useRef<any>(null)
   const [activeSlide, setActiveSlide] = React.useState<number>(0)
   const [isSaved, setIsSaved] = React.useState<boolean>(false)
   const [isLiked, setIsLiked] = React.useState<boolean>(false)
   const dispatch = useDispatch<any>()
   const navigation = useNavigation<any>()
   React.useEffect(() => {
      if (post.likes?.find((like: any) => like._id === auth.user?._id)) {
         setIsLiked(true)
      }
   }, [auth.user, post.likes])

   React.useEffect(() => {
      if(auth.user.saved?.find((save: string) => save === post._id)) {
         setIsSaved(true)
      }
   },[auth.user, post])


   const handleLike = () => {
      if (isLiked) {
         dispatch(unLikePost(post, auth ))
      } else {
         dispatch(likePost(post, auth, socket))
      }
      setIsLiked(!isLiked)
   }

   const renderItem = ({ item }: { item: IImages }) => (
      <RenderMedia 
         media={item.url as string}
         id={post._id}
         styleHeight={400}
         shouldPlay={false}
         isNavigation={true}
      />
   )

   const handleNavigationProfile = () => {
      if(post.user?._id === auth.user?._id) {
         return navigation.navigate('Profile')
      }
      return navigation.navigate('OtherProfile', { id: post.user?._id })
   }

   const handleBookmark = () => {
      if(isSaved) {
         dispatch(unSavePost(post, auth))
      } else {
         dispatch(savePost(post, auth))
      }
      setIsSaved(!isSaved)
   }


   return (
      <View style={{ backgroundColor: 'white' }}>
         <View style={styles.headerPost}>
            <TouchableOpacity
               onPress={handleNavigationProfile}
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
            </TouchableOpacity>
            <TouchableOpacity
               onPress={() => handleModal(post)}
            >
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
            sliderWidth={width}
            itemWidth={width}
            style={{ height: 400, width: width }}
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
                     onPress={() => navigation.navigate('CommentPost', { id: post._id})}
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
               <TouchableOpacity
                  onPress={handleBookmark}
               >
                  {
                     isSaved ? 
                     <Icon 
                           name='bookmark'
                           size={20}
                           color='red'
                     />
                     :
                     <Icon 
                        name='bookmark'
                        size={20}
                        color='#333'
                     />
                  }
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
                  <Text
                     onPress={() => navigation.navigate('CommentPost', { id: post._id })}
                  style={{ fontSize: 16, fontWeight: '400', color: '#999' }}>View all {post.comments?.length} comments</Text>
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