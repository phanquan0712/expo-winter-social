import * as React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Video, ResizeMode } from 'expo-av'

import { useNavigation } from '@react-navigation/native'


interface IProps {
   media: string
   id?: string,
   styleHeight: number
   shouldPlay: boolean
   isNavigation?: boolean
}
const RenderMedia: React.FC<IProps> = ({ media, id, styleHeight, shouldPlay, isNavigation }) => {
   const navigation = useNavigation<any>()
   const [status, setStatus] = React.useState({})

   const handleNavigation = () => {
      if(!isNavigation) {
         return navigation.navigate('DetailPost', { id })
      }
   }
   return (
      <TouchableOpacity style={[styles.videoContainer, { height: styleHeight }]} onPress={handleNavigation}>
         {
            media &&
               (media as string).match('/video/') ?
               shouldPlay ?
                  <Video
                     source={{ uri: media as string }}
                     style={styles.video}
                     useNativeControls={false}
                     shouldPlay={true}
                     isLooping={true}
                     isMuted={true}
                     rate={1.0}
                     resizeMode={ResizeMode.COVER}
                     onPlaybackStatusUpdate={status => setStatus(() => status)}
                  />
                  :
                  <Video
                     source={{ uri: media as string }}
                     style={styles.video}
                     useNativeControls
                     resizeMode={ResizeMode.COVER}
                     onPlaybackStatusUpdate={status => setStatus(() => status)}
                  />
               :
               <Image
                  source={{ uri: media as string }}
                  style={{
                     width: '100%',
                     resizeMode: 'cover',
                     height: '100%',
                  }}
               />
         }
      </TouchableOpacity>

   )
}

export default RenderMedia

const styles = StyleSheet.create({
   videoContainer: {
      marginHorizontal: 3,
      marginBottom: 3,
      justifyContent: 'center',
      alignItems: 'center',
   },
   video: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
   },
   imageContainer: {
      width: '48%',
      marginHorizontal: 3,
      marginBottom: 3,
   }
})