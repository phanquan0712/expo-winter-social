import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native' 
import React from 'react'
import { IUserMessage } from '../redux/types/messageType'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
interface IProps {
     userMessage: IUserMessage
}

const CardItemMessage: React.FC<IProps> = ({ userMessage }) => {
     const navigation = useNavigation<any>()
     return (
          <TouchableOpacity style={styles.userMEssage}
               onPress={() => navigation.navigate('MessageScreen', { userMessage })}
          >
               <Image
                    source={{ uri: userMessage.avatar as string }}
                    style={styles.userMessageImage}
               />
               <View style={styles.userMessageInfo}>
                    <Text style={styles.userMessageName}>{userMessage.fullname}</Text>
                    {
                         userMessage.text &&
                         userMessage.text?.length > 0 &&
                         <Text style={{
                              fontSize: 14,
                              fontWeight: '400',
                              color: '#333',
                         }}>{userMessage.text?.slice(0, 30)}{userMessage.text.length > 30 ? '...' : ''}</Text>
                    }
                    {/* {
                         !userMessage.text &&
                         userMessage.media &&
                         userMessage.media?.length > 0 &&
                         <Text
                              style={{
                                   fontSize: 14,
                                   fontWeight: '400',
                                   color: '#333',
                              }}
                         >Sent you {userMessage.media.length} photos</Text>
                    } */}
                    {/* {
                         !userMessage.text &&
                         userMessage.call &&
                              userMessage.call.times === 0 ?
                              userMessage.call?.video ? <Text
                                   style={{
                                        fontSize: 14,
                                        fontWeight: '400',
                                        color: '#333',
                                   }}
                              >You have a missed video call</Text> : <Text
                                   style={{
                                        fontSize: 14,
                                        fontWeight: '400',
                                        color: '#333',
                                   }}
                              >You have a missed audio call</Text>
                              :
                              userMessage.call?.video ? <Text
                                   style={{
                                        fontSize: 14,
                                        fontWeight: '400',
                                        color: '#333',
                                   }}
                              >You have a video call</Text> : <Text
                                   style={{
                                        fontSize: 14,
                                        fontWeight: '400',
                                        color: '#333',
                                   }}
                              >You have a audio call</Text>
                    } */}
                    <Text style={styles.userMessageTime}>{moment(userMessage.updatedAt).fromNow()}</Text>
               </View>
          </TouchableOpacity>
     )
}

export default CardItemMessage

const styles = StyleSheet.create({
     userMEssage: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          height: 70,
          borderColor: '#ddd',
          borderBottomWidth: 1,
     },
     userMessageImage: {
          width: 40,
          height: 40,
          borderRadius: 50,
          marginRight: 10,
     },
     userMessageInfo: {
          alignItems: 'flex-start',
     },
     userMessageName: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#000',
     },
     userMessageText: {
          fontSize: 14,
          fontWeight: '400',
          color: '#333',
     },
     userMessageTime: {
          fontSize: 12,
          fontWeight: '400',
          color: '#666',
     }
})