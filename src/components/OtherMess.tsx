import * as React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { IMessage } from '../redux/types/messageType'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Times from './Times'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
interface IProps {
     avatar: string
     message: IMessage
}
const OtherMess: React.FC<IProps> = ({ message, avatar }) => {
     const navigation = useNavigation<any>()
     const handlePreviewImage = () => { 
          navigation.navigate('PreviewImage', { images: message.media })
     }

     return (
          <View style={styles.other}>
               <Image
                    source={{ uri: avatar as string }}
                    style={{
                         width: 30,
                         height: 30,
                         borderRadius: 15,
                         marginRight: 8,
                    }}
               />
               <View style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start',
               }}>
                    {
                         message.media.length > 0 &&
                         <View style={[styles.otherMess, { 
                         }]}>
                              {
                                   message.media.map((item, index) => (
                                        <TouchableOpacity
                                             onPress={handlePreviewImage}
                                        >
                                             <Image
                                                  key={index}
                                                  source={{ uri: item.url }}
                                                  style={{
                                                       width: Dimensions.get('window').width * 0.7,
                                                       height: 320,
                                                       borderRadius: 10,
                                                       marginRight: 8,
                                                       borderWidth: 1,
                                                       borderColor: '#ddd',
                                                  }}
                                             />
                                        </TouchableOpacity>
                                   ))
                              }
                         </View>
                    }
                    {
                         message.text &&
                         <View 
                         style={[styles.otherMess, {
                         }]}>
                              <Text style={styles.otherMessText}>{message.text}</Text>
                         </View>
                    }
               </View>
               {
                    message.call &&
                    <TouchableOpacity style={{
                         display: 'flex',
                         flexDirection: 'row',
                         alignItems: 'center',
                         borderColor: message.call.times === 0 ? 'crimson' : 'green',
                         borderWidth: 1,
                         padding: 10,
                         borderRadius: 10
                    }}>
                         <Text style={{
                              fontSize: 16, color: message.call.times === 0 ? 'crimson' : 'green',
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
                              <Text>{message.call?.video ? 'Video Call' : 'Audio Call'}</Text>
                              <Text style={{ fontSize: 14, fontWeight: '300' }}>
                                   {
                                        message.call.times > 0 ? <Times total={message.call.times} /> :
                                             moment(message.call.times).format('hh:mm A')
                                   }
                              </Text>
                         </View>
                    </TouchableOpacity>
               }
          </View>
     )
}

export default OtherMess

const styles = StyleSheet.create({
     other: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          alignSelf: 'flex-start',
          marginBottom: 20
     },
     otherMess: {
          marginBottom: 10,
          borderRadius: 10,
          overflow: 'hidden',
     },
     otherMessText: {
          backgroundColor: '#e4e6eb',
          borderRadius: 10,
          color: '#000',
          fontSize: 16,
          padding: 10,
          fontWeight: '500'
     },
})