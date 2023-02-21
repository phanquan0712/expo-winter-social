import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, StatusBar, SafeAreaView, Platform} from 'react-native'
import cameraSymbol from '../../assets/camera2.jpg'
import gallerySymbol from '../../assets/gallerysymbol2.png'
import ButtonWithText from '../components/ButtonWithText'
import * as ImagePicker from 'expo-image-picker'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import HeaderShowTitle from '../components/HeaderShowTitle'
import Loading from '../components/Loading'
import { ShowError } from '../utils/ShowMessage'
const NewPost_Step1Screen = () => {
   const [images, setImages] = React.useState<any>([])
   const navigation = useNavigation<any>()
   const [loadImage, setLoadImage] = React.useState<boolean>(false)

   const getPermissionAsync = async (typeImage: string) => {
      let check: boolean = false
      if (Platform.OS !== 'web') {
         if(typeImage === 'camera') {
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
      if(!check) return alert('Please allow permission to use this feature')
      setLoadImage(true)
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
               setLoadImage(false)
            }
         }
      })
      .catch((err: any) => {
         setLoadImage(false)
         return ShowError('Please, upload image in albums to successfully if you use iPhone')
      })
   }

   const handleTakePhoto = async () => {
      const check = await getPermissionAsync('camera')
      if(!check) return alert('Please allow permission to use this feature')
      setLoadImage(true)
      await ImagePicker.launchCameraAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         base64: true,
         quality: 1,
      }).then((result: any) => {
         if (!result.canceled) {
            setImages([...images, `data:image/jpg;base64,${result.assets[0].base64}`])
            setLoadImage(false)
         }
      })
      .catch((err: any) => {
         setLoadImage(false)
         return ShowError('Something went wrong, please try again later')
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
      const newListImages = images;
      setImages([])
      return navigation.navigate('NewPost_Step2Screen', { images: newListImages })
   }


   return (
      <SafeAreaView style={styles.container}>
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
         {
            loadImage ? 
            <Loading />
            :
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
            
         }
      </SafeAreaView>
   )
}

export default NewPost_Step1Screen

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   }
})