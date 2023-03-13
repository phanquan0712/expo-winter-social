import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Animated, Easing, ScrollView, FlatList , SafeAreaView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, IUser, IPost } from '../utils/TypeScript'
import ModalProfile from '../components/ModalProfile'
import { useNavigation, useRoute } from '@react-navigation/native'
import Modal from '../components/Modal'
import Loading from '../components/Loading'
import ListPostProfileUser from '../components/ListPostProfileUser'
import { getProfileUser } from '../redux/actions/userAction'
import FollowButton from '../components/FollowButton'
const ProfileScreen = () => {
   const navigation = useNavigation<any>()
   const dispatch = useDispatch<any>()
   const { id } = useRoute<any>().params
   const [typePost, setTypePost] = React.useState<'post' | 'saved'>('post')
   const { auth, user } = useSelector((state: RootStore) => state)
   const translateBarBot = React.useRef(new Animated.Value(0)).current
   const translateX1 = React.useRef(new Animated.Value(0)).current
   const translateX2 = React.useRef(new Animated.Value(0)).current

   React.useEffect(() => {
      if(id && auth.access_token){
         dispatch(getProfileUser(id, auth.access_token))
      }
   }, [id, auth.access_token])


   React.useEffect(() => {
      Animated.timing(translateBarBot, {
         toValue: typePost === 'post' ? 0 : Dimensions.get('window').width / 2,
         duration: 200,
         useNativeDriver: true,
         easing: Easing.elastic(0.8),
      }).start()
   }, [typePost])

   React.useEffect(() => {
      Animated.timing(translateX1, {
         toValue: typePost === 'post' ? 0 : -Dimensions.get('window').width,
         duration: 200,
         useNativeDriver: true,
         easing: Easing.elastic(0.8),
      }).start()
   }, [typePost])

   React.useEffect(() => {
      Animated.timing(translateX2, {
         toValue: typePost === 'saved' ? 0 : Dimensions.get('window').width,
         duration: 200,
         useNativeDriver: true,
         easing: Easing.elastic(0.8),
      }).start()
   }, [typePost])
   const translateXPost = {
      transform: [
         {
            translateX: translateX1
         }
      ]
   }

   const translateXSaved = {
      transform: [
         {
            translateX: translateX2
         }
      ]
   }

   return (
      <SafeAreaView style={[styles.container]}>
         {
            user.load ?
               <Loading />
               :
               <>
                  <View style={styles.header}>
                     <TouchableOpacity
                        onPress={() => navigation.goBack()}
                     >
                        <Icon
                           name="arrow-left"
                           size={20}
                           color="black"
                           style={{ marginRight: 10 }}
                        />
                     </TouchableOpacity>
                     <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.headerText}>{user.user?.username}</Text>
                     </View>
                  </View>
                  <ScrollView style={{ flexGrow: 1, backgroundColor: 'white' }}>
                     <View style={{ padding: 20, backgroundColor: 'white' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
                           <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginRight: 20, alignItems: 'center' }}>
                              <Image
                                 source={{ uri: user.user?.avatar as string }}
                                 style={{ width: 70, height: 70, borderRadius: 50 }}
                              />
                              <Text>{user.user?.fullname}</Text>
                           </View>
                           <View style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                              <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                 <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{user.user?.followers?.length}</Text>
                                 <Text style={{ fontSize: 14 }}>Followers</Text>
                              </View>
                              <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                 <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{user.user?.following?.length}</Text>
                                 <Text style={{ fontSize: 14 }}>Following</Text>
                              </View>
                           </View>
                        </View>
                        {
                           user.user?.story &&
                           <View style={{ padding: 5, backgroundColor: '#ddd', borderRadius: 5, marginBottom: 20 }}>
                              <Text style={{ fontSize: 14, color: '#333' }}>{user.user?.story}</Text>
                           </View>
                        }
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                           {/* <TouchableOpacity style={{ borderRadius: 10, height: 40, width: '46%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                           >
                              <Text style={{ fontSize: 16, fontWeight: '500', marginRight: 10, color: '#333' }}>Following</Text>
                              <Icon
                                 name='angle-down'
                                 size={20}
                                 color='#333'
                              />
                           </TouchableOpacity> */}
                           <View style={{ width: '46%'}}>
                              <FollowButton
                                 user={user.user}
                              />
                           </View>
                           <TouchableOpacity style={{ borderRadius: 20, height: 40, width: '46%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                              onPress={() => navigation.navigate('MessageScreen', { userMessage: {
                                 _id: user.user?._id,
                                 avatar: user.user?.avatar,
                                 fullname: user.user?.fullname,
                                 username: user.user?.username,
                                 online: false,
                              } })}
                           >
                              <Text style={{ fontSize: 16, fontWeight: '500', marginRight: 10, color: '#000' }}>Message</Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                     <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
                        <TouchableOpacity style={{
                           flex: 1, alignItems: 'center', justifyContent: 'center',
                           opacity: typePost === 'post' ? 1 : 0.3
                        }}
                           onPress={() => setTypePost('post')}
                        >
                           <Icon
                              name='th'
                              size={20}
                              color='#000'
                              style={{ padding: 10 }}
                           />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                           flex: 1, alignItems: 'center', justifyContent: 'center',
                           opacity: typePost === 'saved' ? 1 : 0.3
                        }}
                           onPress={() => setTypePost('saved')}
                        >
                           <Icon
                              name='user'
                              size={20}
                              color='#000'
                              style={{ padding: 10 }}
                           />
                        </TouchableOpacity>
                        <Animated.View
                           style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              transform: [{ translateX: translateBarBot }],
                              width: '50%',
                              height: 1,
                              backgroundColor: '#000',
                           }}
                        />
                     </View>
                     <Animated.View style={[typePost === 'post' ? styles.profilePostActive : styles.profilePost, translateXPost]}>
                        {
                           user.posts?.length > 0 ?
                              <ListPostProfileUser
                                 posts={user.posts}
                              />
                              :
                              <>
                                 <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Profile</Text>
                                 <Text style={{ fontSize: 16, fontWeight: '300', textAlign: 'center' }}>
                                    When you share photos and videos they'll appear on your profile.
                                 </Text>
                              </>
                        }
                     </Animated.View>
                     <Animated.View style={[typePost === 'saved' ? styles.profilePostActive : styles.profilePost, translateXSaved]}>
                        {
                           user.saved?.length > 0 ?
                              <ListPostProfileUser
                                 posts={user.saved}
                              />
                              :
                              <>
                                 <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
                                    Photo and videos of you
                                 </Text>
                                 <Text style={{ fontSize: 16, fontWeight: '300', textAlign: 'center' }}>
                                    When people tag you in photos and videos they'll appear here.
                                 </Text>
                              </>
                        }
                     </Animated.View>
                  </ScrollView>
               </>

         }
      </SafeAreaView>
   )
}

export default ProfileScreen

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   header: {
      height: 50,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#fff',
   },
   headerText: {
      fontSize: 16,
      fontWeight: '500',
   },
   btnEdit: {
      display: 'flex',
      width: '100%',
      height: 40,
      backgroundColor: '#ddd',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
   },
   textBtnEdit: {
      fontSize: 14,
      color: '#000'
   },
   modalSheet: {
      flex: 1,
      height: Dimensions.get('window').height,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
   },
   profilePostActive: {
      flex: 1,
      padding: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   profilePost: {
      flex: 1,
      padding: 24,
      display: 'none'
   }
})