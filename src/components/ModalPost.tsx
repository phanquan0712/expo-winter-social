import { StyleSheet, Text, View, TouchableOpacity, Clipboard } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { IPost } from '../utils/TypeScript'
import { ShowSuccess } from '../utils/ShowMessage'
const ModalProfile = () => {
   const navigation = useNavigation<any>()
   const listOptions: any[] = [
      {
         icon: "link",
         title: "Copy Link",
         onPress: (post: IPost) => {
            Clipboard.setString(`https://www.wintersocial.com/post/${post._id}}`);
            return ShowSuccess("Copied to clipboard")
         }
      },
      {
         icon: "share-alt",
         title: "Share",
         onPress: (post: IPost) => alert("Coming soon...")
      },
      {
         icon: "bookmark",
         title: "Save",
         onPress: (post: IPost) => alert("Coming soon...")
      },
      {
         icon: "qrcode",
         title: "QR Code",
         onPress: (post: IPost) => alert("Coming soon...")
      },
      {
         icon: "star",
         title: "Add to favorites",
         onPress: (post: IPost) => alert("Coming soon...")
      },
      {
         icon: "flag",
         title: "Report",
         onPress: (post: IPost) => alert("Coming soon...")
      },
      {
         icon: "ban",
         title: "Hide",
         onPress: (post: IPost) => alert("Coming soon...")
      },
   ];


   return (
      <View style={[styles.modalContainer, {
         height: (50 * listOptions.length + 30), bottom: 0
      }]}>
         <View style={styles.draggbleArea}>
            <View style={styles.dragleBar} />
         </View>
         {
            (listOptions as any[]).map((item, index) => (
               <TouchableOpacity key={index + 1} style={styles.optionItem}
                  onPress={() => item.onPress()}
               >
                  <Icon
                     name={item.icon}
                     size={20}
                     style={{ width: 30 }}
                  />
                  <Text>{item.title}</Text>
               </TouchableOpacity>
            ))
         }
      </View>
   )
}

export default ModalProfile

const styles = StyleSheet.create({
   optionItem: {
      height: 50,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
   },
   draggbleArea: {
      width: 100,
      height: 32,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
   },
   dragleBar: {
      width: 80,
      height: 5,
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderRadius: 10,
   },
   modalContainer: {
      backgroundColor: 'white',
      width: '100%',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 24,
      position: 'absolute',
      elevation: 10,
   },
})