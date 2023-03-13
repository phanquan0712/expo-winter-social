import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Image, Platform, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { IImages, RootStore } from '../utils/TypeScript'
import * as ImagePicker from 'expo-image-picker'
import { ShowError } from '../utils/ShowMessage'
import { imageUpload } from '../utils/imageUpload'
import { addMessage } from '../redux/actions/messageAction'
import { IMessage } from '../redux/types/messageType'
import MyMess from '../components/MyMess'
import OtherMess from '../components/OtherMess'
import { getMessages } from '../redux/actions/messageAction'
import Loading from '../components/Loading'
import { DELETE_ALL_MESSAGE } from '../redux/types/messageType'
interface IProps {
     _id: string
     avatar: string
     username: string
     fullname: string
     online: boolean
}

const listIcon = ["🙂", "😀", "😄", "😆", "😅", "😂", "🤣", "😊", "😌", "😉", "😏", "😍", "😘", "😗", "😙", "😚", "🤗", "😳", "🙃", "😇", "😈", "😛", "😝", "😜", '😋', '🤤', "🤓", "😎", '🤑', "😠", "😡", "💩", "🎃", "👿", "👍", "👎", "🤞", "👩", "💂", "👳", "👊", "✊", "🙌", "🖖", "👂", "👃", "👁️️", "🎖️️", "🏆️", "🎧️", "🥈️", "🥇️", "🏅"]

const MessageScreen = () => {
     const { userMessage }: {
          userMessage: IProps
     } = useRoute<any>().params
     const { auth, socket, message } = useSelector((state: RootStore) => state)
     const dispatch = useDispatch<any>()
     const navigation = useNavigation<any>()
     const [showFuture, setShowFuture] = React.useState<boolean>(false)
     const [text, setText] = React.useState<string>('')
     const [images, setImages] = React.useState<any[]>([])
     const [isShowIcon, setIsShowIcon] = React.useState<boolean>(false)


     React.useEffect(() => {
          dispatch(getMessages(userMessage._id as string, auth))
          return () => {
               dispatch({ type: DELETE_ALL_MESSAGE})
          }
     }, [(userMessage._id as string), auth, dispatch])

     const handleCreateMessage = async () => {
          if (!text && images.length === 0) return ShowError('Please, enter message or upload image')
          let newMediaArr = [];
          if (images.length > 0) {
               for (let i = 0; i < images.length; i++) {
                    newMediaArr.push(await imageUpload(images[i]))
               }
          }

          const msg = {
               sender: auth.user?._id,
               recipient: userMessage._id as string,
               text,
               media: newMediaArr,
               createdAt: new Date().toISOString()
          }
          setText('')
          setImages([])
          dispatch(addMessage(msg as IMessage, auth, socket))
     }

     const getPermissionAsync = async (typeImage: string) => {
          let check: boolean = false
          if (Platform.OS !== 'web') {
               if (typeImage === 'camera') {
                    const { status } = await ImagePicker.requestCameraPermissionsAsync()
                    if (status !== 'granted') {
                         alert('Sorry, we need camera permissions to make this work!')
                    } else {
                         check = true
                    }
               } else {
                    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
                    if (status !== 'granted') {
                         alert('Sorry, we need camera roll permissions to make this work!')
                    } else {
                         check = true
                    }
               }
          }
          return check
     }

     const handleOpenGallery = async () => {
          const check = await getPermissionAsync('gallery')
          if (!check) return alert('Please allow permission to use this feature')
          await ImagePicker.launchImageLibraryAsync({
               mediaTypes: ImagePicker.MediaTypeOptions.Images,
               quality: 1,
               allowsMultipleSelection: true,
               aspect: [4, 3],
               base64: true,
               selectionLimit: 6,
          }).then((result: any) => {
               if (!result.canceled) {
                    if (result.assets.length > 1) {
                         let listImage = result.assets.map((item: any) => `data:image/jpg;base64,${item.base64}`)
                         setImages([...images, ...listImage])
                    }
               }
          })
               .catch((err: any) => {
                    return ShowError('Please, upload image in albums to successfully if you use iPhone')
               })
     }

     const handleLoadMoreMessage = () => {
          dispatch(getMessages(userMessage._id as string, auth, (message.data.length / 9) + 1))
     }

     return (
          <SafeAreaView style={styles.container}>
               <View style={styles.header}>
                    <TouchableOpacity
                         style={{ marginRight: 20 }}
                         onPress={() => navigation.goBack()}
                    >
                         <Icon
                              name="arrow-left"
                              size={20}
                         />
                    </TouchableOpacity>
                    <View style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                         <View style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              flex: 1,
                         }}>
                              <Image
                                   source={{ uri: userMessage.avatar as string }}
                                   style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        marginRight: 10
                                   }}
                              />
                              <View style={{
                                   alignItems: 'flex-start',
                              }}>
                                   <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{userMessage.fullname}</Text>
                                   <Text style={{ fontSize: 12, color: '#666' }}>
                                        {userMessage.online ? 'Online' : 'Offline'}
                                   </Text>
                              </View>
                         </View>
                         <TouchableOpacity style={{ marginRight: 20 }}>
                              <Icon
                                   name='phone'
                                   size={20}
                                   color="green"
                              />
                         </TouchableOpacity>
                         <TouchableOpacity style={{ marginRight: 20 }}>
                              <Icon
                                   name='video'
                                   size={20}
                                   color="red"
                              />
                         </TouchableOpacity>
                         <TouchableOpacity style={{}}>
                              <Icon
                                   name='ellipsis-v'
                                   size={20}
                                   color="black"
                              />
                         </TouchableOpacity>
                    </View>
               </View>
               <ScrollView 
               style={{ flex: 1, width: '100%' }}>
                    {
                         message.data.length > 0 &&
                         message.data.length % 9 === 0 &&
                         <TouchableOpacity style={{
                              alignSelf: 'center',
                              height: 40,
                              paddingHorizontal: 10,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#ddd',
                              borderRadius: 10,
                         }}
                              onPress={handleLoadMoreMessage}
                         >
                              {
                                   message.loadMessage && message.firstLoad === true ?
                                        <Loading />
                                        :
                                        <Text
                                             style={{
                                                  fontSize: 14,
                                                  fontWeight: '500',
                                                  color: '#333'
                                             }}
                                        >Load older message</Text>
                              }
                         </TouchableOpacity>
                    }
                    <View style={styles.body}>
                         {
                              message.loadMessage &&  message.firstLoad === false ?
                                   <Loading />
                                   :
                                   message.data.map((item: IMessage, index: number) => (
                                        item.sender === auth.user?._id ?
                                             <MyMess 
                                                  key={item._id}
                                                  message={item}
                                             />
                                             :
                                             <OtherMess 
                                                  key={item._id}
                                                  avatar={userMessage.avatar as string}
                                                  message={item}
                                             />
                                   ))
                         }
                    </View>
               </ScrollView>
               <View style={styles.inputMessage}>
                    <TouchableOpacity
                         onPress={() => setShowFuture(!showFuture)}
                         style={{
                              marginRight: 10
                         }}
                    >
                         {
                              showFuture ?
                                   <Icon
                                        name='times'
                                        size={20}
                                        color="red"
                                   />
                                   :
                                   <Icon
                                        name="plus"
                                        size={20}
                                        color="green"
                                   />
                         }
                    </TouchableOpacity>
                    {
                         showFuture &&
                         <View style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                         }}>
                              <TouchableOpacity
                                   onPress={handleOpenGallery}
                                   style={{
                                        marginRight: 10
                                   }}
                              >
                                   <Icon
                                        name="camera"
                                        size={20}
                                        color="green"
                                   />
                              </TouchableOpacity>
                              <TouchableOpacity
                                   style={{
                                        marginRight: 10
                                   }}
                                   onPress={() => setIsShowIcon(!isShowIcon)}
                              >
                                   <Icon
                                        name="smile"
                                        size={20}
                                        color="pink"
                                        style={{
                                              transform: [{
                                                  rotate: isShowIcon ? '180deg' : '0deg'
                                              }]                                           
                                        }}
                                   />
                              </TouchableOpacity>
                         </View>
                    }
                    <TextInput
                         placeholder="Type a message"
                         placeholderTextColor={'#666'}
                         style={{
                              flex: 1,
                              backgroundColor: '#ddd',
                              borderBottomLeftRadius: 20,
                              borderTopLeftRadius: 20,
                              padding: 10,
                              marginRight: 8
                         }}
                         value={text}
                         onChangeText={text => setText(text)}
                    />
                    <TouchableOpacity
                         onPress={handleCreateMessage}
                         disabled={!text && images.length === 0 ? true : false}
                         style={{
                              width: 50,
                              height: '100%',
                              justifyContent: 'center',
                              alignItems: 'center',
                         }}>
                         <Icon name="paper-plane" size={20} color="#000" />
                    </TouchableOpacity>
               </View>
               {
                    isShowIcon && images.length === 0 &&
                    <View style={{ height: 50, width: '100%', borderBottomColor: '#ddd', borderBottomWidth: 1, borderTopColor: '#ddd', borderTopWidth: 1 }}>
                         <FlatList
                              data={listIcon}
                              keyExtractor={(item, index) => index.toString()}
                              horizontal
                              showsHorizontalScrollIndicator={false}
                              renderItem={({ item }) => (
                                   <TouchableOpacity style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => setText(text + item)}
                                   >
                                        <Text style={{ fontSize: 20 }}>{item}</Text>
                                   </TouchableOpacity>
                              )}
                         />
                    </View>
               }
               {
                    images.length > 0 &&
                    <FlatList 
                         data={images}
                         style={{
                              height: 50,
                              width: '100%',
                              borderBottomColor: '#ddd',
                              borderBottomWidth: 1,
                              paddingHorizontal: 10

                         }}
                         showsHorizontalScrollIndicator={false}
                         keyExtractor={(item, index) => index.toString()}
                         horizontal
                         renderItem={({ item }) => (
                              <Image 
                                   source={{ uri: item }}
                                   style={{
                                        width: 400,
                                        height: '100%',
                                        borderRadius: 10,
                                        marginRight: 10,
                                        resizeMode: 'cover'
                                   }}
                              />
                         )}
                    />
               }
          </SafeAreaView>
     )
}

export default MessageScreen

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: 'white'
     },
     header: {
          height: 50,
          paddingHorizontal: 20,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: '#ccc',
          borderBottomWidth: 1
     },
     body: {
          width: '100%',
          flex: 1,
          paddingHorizontal: 10,
          paddingVertical: 20,
          backgroundColor: '#f5f5f5',
          marginBottom: 100
     },
     myMess: {
          width: '100%',
          marginBottom: 10,
          alignSelf: 'flex-end',
          borderRadius: 10,
          backgroundColor: '#0084ff',
     },
     myMessText: {
          color: 'white',
          fontSize: 16,
          padding: 10,
          fontWeight: '500'
     },
     other: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          alignSelf: 'flex-start',
     },
     otherMess: {
          backgroundColor: '#e4e6eb',
          marginBottom: 10,
          borderRadius: 10,
          flex: 1,
     },
     otherMessText: {
          color: '#000',
          fontSize: 16,
          padding: 10,
          fontWeight: '500'
     },
     inputMessage: {
          height: 50,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          borderTopColor: '#ccc',
          borderTopWidth: 1,
          backgroundColor: 'white'
     },
     symbol: {
          height: 50,
     }
})