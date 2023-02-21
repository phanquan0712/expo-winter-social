import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, TextInput, ImageBackground, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { RootStore } from '../utils/TypeScript'

const MessageScreen = () => {
     const navigation = useNavigation<any>()
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
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Messages</Text>
               </View>
               <ScrollView style={{ flex: 1, width: '100%' }}>
                    <View style={styles.body}>
                         <View style={styles.myMess}>
                              <Text style={styles.myMessText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                         </View>
                         <View style={styles.other}>
                              <Image
                                   source={{ uri: 'https://cdn.sforum.vn/sforum/wp-content/uploads/2022/04/15-7-scaled-e1650708800882.jpg' }}
                                   style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        marginRight: 8,
                                   }}
                              />
                              <View style={styles.otherMess}>
                                   <Text style={styles.otherMessText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                              </View>
                         </View>
                         <View style={styles.myMess}>
                              <Text style={styles.myMessText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                         </View>
                         <View style={styles.other}>
                              <Image
                                   source={{ uri: 'https://cdn.sforum.vn/sforum/wp-content/uploads/2022/04/15-7-scaled-e1650708800882.jpg' }}
                                   style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        marginRight: 8,
                                   }}
                              />
                              <View style={styles.otherMess}>
                                   <Text style={styles.otherMessText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                              </View>
                         </View>
                    </View>
               </ScrollView>
               <View style={styles.inputMessage}>
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
                    />
                    <TouchableOpacity style={{
                         width: 50,
                         height: '100%',
                         justifyContent: 'center',
                         alignItems: 'center',
                    }}>
                         <Icon name="paper-plane" size={20} color="#000" />
                    </TouchableOpacity>
               </View>
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
          height: 40,
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
          paddingHorizontal: 20,
          backgroundColor: '#f5f5f5',
          marginBottom: 100
     },
     myMess: {
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
          position: 'absolute',
          bottom: 0,
          left: 0,
          borderTopColor: '#ccc',
          borderTopWidth: 1,
          backgroundColor: 'white'
     }
})