import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, StatusBar} from 'react-native'
import cameraSymbol from '../../assets/camera2.jpg'
import gallerySymbol from '../../assets/gallerysymbol2.png'
import ButtonWithText from '../components/ButtonWithText'
import * as ImagePicker from 'expo-image-picker'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import HeaderShowTitle from '../components/HeaderShowTitle'
const NewPost_Step1Screen = () => {
   const [images, setImages] = React.useState<any>([])
   const navigation = useNavigation<any>()

   const handleOpenGallery = async () => {
      await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         quality: 1,
         allowsMultipleSelection: true,
         base64: true,
      }).then((result: any) => {
         if (!result.canceled) {
            if (result.assets.length > 1) {
               let listImage = result.assets.map((item: any) => `data:image/jpg;base64,${item.base64}`)
               setImages([...images, ...listImage])
            }
         }
      })
   }

   const handleTakePhoto = async () => {
      await ImagePicker.launchCameraAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         base64: true,
         quality: 1,
      }).then((result: any) => {
         if (!result.canceled) {
            setImages([...images, `data:image/jpg;base64,${result.assets[0].base64}`])
         }
      })
   }

   const handleDeleteImage = (index: number) => {
      const newListImage = images.filter((_: any, i: number) => i !== index)
      setImages(newListImage)
   }

   const handleNavigationToStep2 = () => {
      if(images.length === 0) {
         return alert('Please choose image')
      }
      return navigation.navigate('NewPost_Step2Screen', { images })
   }


   return (
      <View style={styles.container}>
         <HeaderShowTitle 
            iconLeft={true}
            title='New Post'
            iconRight='arrow-right'
            onPressIconRight={handleNavigationToStep2}
         />
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
         <ScrollView style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20 }}>
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
                  <TouchableOpacity style={{ height: 400, width: '100%', marginBottom: 20 }} key={index}
                     onPress={() => navigation.navigate('PreviewImage', { images })}
                  >
                     <Icon
                        name='times-circle'
                        size={30}
                        color='#000'
                        style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}
                        onPress={() => handleDeleteImage(index)}
                     />
                     <Image
                        source={{ uri: image as any }}
                        style={{ width: '100%', height: 400, borderRadius: 10 }}
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