import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Animated, Easing, ScrollView, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, IUser, IPost } from '../utils/TypeScript'
import ModalProfile from '../components/ModalProfile'
import { useNavigation } from '@react-navigation/native'
import { getDiscoverPeople } from '../redux/actions/discoverPeopleAction'
import PeopleCardItem from '../components/PeopleCardItem'
import Modal from '../components/Modal'
import Loading from '../components/Loading'
import ListPostProfileUser from '../components/ListPostProfileUser'
import { getApi } from '../utils/fetchData'
import { ShowError } from '../utils/ShowMessage'
import { getProfileUser } from '../redux/actions/userAction'
const ProfileScreen = () => {
   const navigation = useNavigation<any>()
   const dispatch = useDispatch<any>()
   const { auth, discoverPeople } = useSelector((state: RootStore) => state)
   const [typePost, setTypePost] = React.useState<'post' | 'saved'>('post')
   const [modalVisible, setModalVisible] = React.useState(false)
   const [discoverPeopleList, setDiscoverPeopleList] = React.useState<IUser[]>(discoverPeople.users)
   const [userPost, ] = React.useState<IPost[]>([])
   const [loadUserSaved, setLoadUserSaved] = React.useState<boolean>(false)
   const [userSaved, setUserSaved] = React.useState<IPost[]>([])
   const translateBarBot = React.useRef(new Animated.Value(0)).current
   const translateX1 = React.useRef(new Animated.Value(0)).current
   const translateX2 = React.useRef(new Animated.Value(0)).current

   const listOptions: any[] = [
      {
         icon: 'cog',
         title: 'Settings'
      },
      {
         icon: 'stopwatch',
         title: 'Your Activity'
      },
      {
         icon: 'qrcode',
         title: 'QR Code'
      },
      {
         icon: 'star',
         title: 'Favorites'
      }
   ]


   React.useEffect(() => {
      if(auth.user?._id && auth.access_token) {
         dispatch(getProfileUser(auth.user?._id, auth.access_token))
      }
   }, [auth.user?._id, auth.access_token])

   React.useEffect(() => {
      if(auth.user?._id && auth.access_token) {
         if(typePost === 'post') {

         } else {
            const getUserSaved = async () => {
               try {
                  setLoadUserSaved(true)
                  const res = await getApi(`saved_posts`, auth.access_token)
                  if (res.status === 200) {
                     setUserSaved(res.data.posts)
                  }
                  setLoadUserSaved(false)
               } catch (err: any) {
                  setLoadUserSaved(false)
                  return ShowError(err.response.data.msg)
               }
            }
            getUserSaved()
         }
      }
   }, [auth.access_token, auth.user?._id, typePost])


   React.useEffect(() => {
      if (auth.access_token) {
         dispatch(getDiscoverPeople(auth.access_token))
      }
   }, [auth.access_token, dispatch])

   React.useEffect(() => {
      if (discoverPeople.users.length > 0) {
         setDiscoverPeopleList(discoverPeople.users)
      }
   }, [discoverPeople.users])

   React.useEffect(() => {
      if (modalVisible) {
         navigation.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
         return () => navigation.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
      }
   }, [navigation, modalVisible])


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

   const handleOpenModal = () => {
      if (!modalVisible) {
         setModalVisible(true)
      }
   }
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

   const handleDeleteDiscoverPeople = (id: string) => {
      const newList = discoverPeopleList.filter((item: any) => item._id !== id)
      setDiscoverPeopleList(newList)
   }




   return (
      <View style={[styles.container]}>
         <View style={styles.header}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
               <Text style={styles.headerText}>{auth.user?.username}</Text>
               <Icon
                  name='chevron-down'
                  size={15}
                  color='#000'
                  style={{ marginLeft: 5, marginTop: 5 }}
               />
            </View>
            <View>
               <TouchableOpacity
                  onPress={handleOpenModal}
               >
                  <Icon
                     name='bars'
                     size={20}
                     color='#000'
                  />
               </TouchableOpacity>
            </View>
         </View>
         <ScrollView style={{ flexGrow: 1, backgroundColor: 'white' }}>
            <View style={{ padding: 20, backgroundColor: 'white' }}>
               <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
                  <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginRight: 20, alignItems: 'center' }}>
                     <Image
                        source={{ uri: auth.user?.avatar }}
                        style={{ width: 70, height: 70, borderRadius: 50 }}
                     />
                     <Text>{auth.user?.fullname}</Text>
                  </View>
                  <View style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                     <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{auth.user?.followers?.length}</Text>
                        <Text style={{ fontSize: 14 }}>Followers</Text>
                     </View>
                     <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{auth.user?.following?.length}</Text>
                        <Text style={{ fontSize: 14 }}>Following</Text>
                     </View>
                  </View>
               </View>
               <View style={{ padding: 5, backgroundColor: '#ddd', borderRadius: 5, marginBottom: 20 }}>
                  <Text style={{ fontSize: 14, color: '#333' }}>{auth.user?.story}</Text>
               </View>
               <TouchableOpacity style={styles.btnEdit}
                  onPress={() => navigation.navigate('EditProfile')}
               >
                  <Text style={styles.textBtnEdit}>Edit Profile</Text>
               </TouchableOpacity>
            </View>
            {
               discoverPeople.load ?
               <Loading />
               :
                  <FlatList
                     data={discoverPeopleList}
                     keyExtractor={(item, index) => item._id.toString()}
                     renderItem={({ item }) => (
                        <PeopleCardItem
                           key={item._id}
                           user={item}
                        />
                     )}
                     horizontal
                     style={{ backgroundColor: 'white', marginVertical: 10 }}
                     showsHorizontalScrollIndicator={false}
                  />
            }
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
               {/* {
                  user.load ?
                     <Loading />
                     :
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
               } */}
            </Animated.View>
            <Animated.View style={[typePost === 'saved' ? styles.profilePostActive : styles.profilePost, translateXSaved]}>
               {
                  loadUserSaved ?
                     <Loading />
                     :
                     userPost.length > 0 ?
                        <ListPostProfileUser
                           posts={userSaved}
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
         <Modal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            data={listOptions}
         />
      </View>
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
      justifyContent: 'space-between',
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