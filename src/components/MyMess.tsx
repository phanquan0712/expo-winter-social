import * as React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { IMessage } from '../redux/types/messageType'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Times from './Times'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
interface IProps {
     message: IMessage
}
const MyMess: React.FC<IProps> = ({ message }) => {
     const navigation = useNavigation<any>()

     const handlePreviewImage = () => {
          navigation.navigate('PreviewImage', { images: message.media })
     }

     return (
          <>
               {
                    message.media?.length > 0 &&
                    <View style={[styles.myMess]}>
                         {
                              message.media.map((item, index) => (
                                   <TouchableOpacity
                                        onPress={handlePreviewImage}
                                   >
                                        <Image
                                             source={{ uri: item.url }}
                                             key={index}
                                             style={{
                                                  width: Dimensions.get('window').width * 0.7,
                                                  height: 320,
                                                  borderRadius: 10,
                                                  borderWidth: 1,
                                                  borderColor: '#ddd',
                                                  resizeMode: 'cover',
                                             }}
                                        />
                                   </TouchableOpacity>
                              ))
                         }
                    </View>
               }
               {
                    message.text &&
                    <View style={[styles.myMess, {backgroundColor: '#ff9fb3'}]}>
                         <Text style={[styles.myMessText]}>{message.text}</Text>
                    </View>
               }
               {
                    message.call && 
                    <TouchableOpacity style={[{ 
                         display: 'flex',
                         flexDirection: 'row',
                         alignItems: 'center',
                         borderColor: message.call.times === 0 ? 'crimson': 'green',
                         borderWidth: 1,
                         padding: 10,
                         borderRadius: 10
                    }, styles.myMess]}>
                     <Text style={{
                           fontSize: 16, color: message.call.times === 0 ? 'crimson': 'green',
                           marginRight: 10
                        }}
                     >
                        {
                           message.call.times === 0 ? 
                           message.call.video ? 
                              <Icon
                                   name='video-slash'
                                   size={16}
                                   color='crimson'
                              />
                           : 
                              <Icon      
                                   name='phone-slash'
                                   size={16}
                                   color='crimson'
                              />
                           :
                           message.call.video ? 
                              <Icon 
                                   name='video'
                                   size={16}
                                   color='green'
                              />
                           : 
                              <Icon 
                                   name='phone'
                                   size={16}
                                   color='green'
                              />
                        }
                     </Text>
                     <View>
                        <Text>{message.call?.video  ? 'Video Call' : 'Audio Call'}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '300'}}>
                           {
                              message.call.times > 0 ? <Times total={message.call.times} /> : 
                              moment(message.call.times).format('hh:mm A')
                           }
                        </Text>
                     </View>
                    </TouchableOpacity>
               }
          </>
     )
}

export default MyMess

const styles = StyleSheet.create({
     myMess: {
          // maxWidth: '80%',
          marginBottom: 20,
          alignSelf: 'flex-end',
          borderRadius: 10,
     },
     myMessText: {
          borderRadius: 10,
          color: 'white',
          fontSize: 16,
          padding: 10,
          fontWeight: '500',
     },
})