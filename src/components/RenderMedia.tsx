import * as React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Video, ResizeMode } from 'expo-av'

import { useNavigation } from '@react-navigation/native'
interface IProps {
   media: string
   id: string
}
const RenderMedia: React.FC<IProps> = ({ media, id }) => {
   const navigation = useNavigation<any>()
   const [status, setStatus] = React.useState({})
   return (
      <TouchableOpacity style={styles.videoContainer} onPress={
         () => navigation.navigate('DetailPost', { id })
      }>
         {
            media &&
               (media as string).match('/video/') ?
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
                     height: 180,
                     resizeMode: 'cover',
                  }}
               />
         }
      </TouchableOpacity>

   )
}

export default RenderMedia

const styles = StyleSheet.create({
   videoContainer: {
      width: '48%',
      height: 180,
      marginHorizontal: 3,
      marginBottom: 3,
      justifyContent: 'center',
      alignItems: 'center',
   },
   video: {
      width: '100%',
      height: 180,
      alignSelf: 'center',
   },
   imageContainer: {
      width: '48%',
      height: 180,
      marginHorizontal: 3,
      marginBottom: 3,
   }
})