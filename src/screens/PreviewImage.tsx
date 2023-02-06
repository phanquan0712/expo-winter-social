import * as React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import HeaderShowTitle from '../components/HeaderShowTitle';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { IImages } from '../utils/TypeScript';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome5';
const PreviewImage = () => {
   const { images, index } = useRoute<any>().params;
   const navigation = useNavigation<any>()
   const carouselRef = React.useRef<any>(null)
   const [activeSlide, setActiveSlide] = React.useState<number>(0)
   const renderItem = ({ item }: { item: IImages }) => (
      <>
         {
            item.url ? 
               <Image
                  source={{ uri: item.url as string}}
                  style={{ height: 400, width: 400, borderColor: '#ddd', borderWidth: 1 }}
                  resizeMode='cover'
               />
               :
               <Image
               source={{ uri: item as any}}
               style={{ height: 400, width: 400, borderColor: '#ddd', borderWidth: 1 }}
               resizeMode='cover'
            />
         }
      </>
   )

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
               <Icon 
                  name='times'
                  size={25}
                  color='#000'
                  style={{ marginRight: 20}}
               />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: '500', color: '#000' }}>Preview Image</Text>
         </View>
         <View style={{ height: 100, backgroundColor: 'transparent'}} />
         <Carousel
            ref={carouselRef}
            layout={'default'}
            data={images}
            renderItem={({ item }: any) => renderItem({ item })}
            sliderWidth={400}
            itemWidth={400}
            style={{ height: 400, width: 400 }}
            onSnapToItem={(activeSlide) => setActiveSlide(activeSlide)}
         />
         <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
            <Pagination
               dotsLength={images.length}
               activeDotIndex={activeSlide}
               containerStyle={{ width: 50 }}
               dotStyle={{
                  width: 6,
                  height: 6,
                  borderRadius: 5,
                  marginHorizontal: 2,
                  backgroundColor: '#2C65E0'
               }}
               inactiveDotStyle={{
                  // Define styles for inactive dots here
               }}
               dotColor="#2C65E0"
               inactiveDotColor="#999"
               inactiveDotScale={1}
            />
         </View>
      </View>
   )
}

export default PreviewImage

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white'
   },
   header: {
      height: 40, 
      backgroundColor: 'transparent',
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
   }
})