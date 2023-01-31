import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import cameraSymbol from '../../assets/camera2.jpg'
import gallerySymbol from '../../assets/gallerysymbol2.png'
import ButtonWithText from '../components/ButtonWithText'
import * as ImagePicker from 'expo-image-picker'
import Icon from 'react-native-vector-icons/FontAwesome5'
const NewPost_Step1Screen = () => {
   const [images, setImages] = React.useState<any>([])


   const handleOpenGallery = async () => {
      await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsMultipleSelection: true,
         aspect: [4, 3],
         base64: true,
         quality: 1,
      }).then((result: any) => {
         if (!result.cancelled) {
            setImages([...images,`data:image/jpg;base64,${result.assets[0].base64}`])
         }
      })
   }

   const handleTakePhoto = async () => {
      await ImagePicker.launchCameraAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      }).then((result: any) => {
         if (!result.cancelled) {
            setImages([...images, `data:image/jpg;base64,${result.assets[0].base64}`])
         }
      })
   }

   return (
      <View style={styles.container}>
         <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#000' }}>
            <TouchableOpacity style={{ flex: 1, height: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', marginRight: 2 }}
               onPress={handleOpenGallery}
            >
               <Image
                  source={gallerySymbol}
                  style={{ width: 80, height: 80 }}
               />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, height: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', marginLeft: 2 }}
               onPress={handleTakePhoto}
            >
               <Image
                  source={cameraSymbol}
                  style={{ width: 80, height: 80 }}
               />
            </TouchableOpacity>
         </View>
         <ScrollView style={{ flex: 1, padding: 10 }}>
            {
               images.length > 0 &&
               <ButtonWithText
                  text='Clear all'
                  onPress={() => setImages([])}
                  bgBtn='#000'
                  colorText='#fff'
                  height={40}
                  fontSize={16}
                  borderRadius={30}
               />
            }
            {
               images.map((image: any, index: number) => (
                  <TouchableOpacity style={{ height: 300, width: '100%'}} key={index}>
                  <Icon 
                     name='times-circle'
                     size={25}
                     color='#fff'
                     style={{ position: 'absolute', top: 10, left: 10}}
                  />
                  <Image
                     source={{ uri: image.uri as any }}
                     style={{ width: '100%', height: 300, marginBottom: 10 }}
                  />
               </TouchableOpacity>
               ))
            }
         </ScrollView>
      </View>
   )
}

export default NewPost_Step1Screen

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   }
})