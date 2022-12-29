import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing, Dimensions, TouchableNativeFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'

interface IProps {
   modalVisible: boolean
   setModalVisible: (value: boolean) => void
}

const ModalProfile: React.FC<IProps> = ({ modalVisible, setModalVisible }) => {
   const animatedValue = React.useRef(new Animated.Value(0)).current
   const navigation = useNavigation<any>()
   const listOptions = [
      {
         icon: 'cog',
         title: 'Settings'
      },
      {
         icon: 'stopwatch',
         title: 'Your Activity'
      },
      {
         icon: 'qrcode',
         title: 'QR Code'
      },
      {
         icon: 'star',
         title: 'Favorites'
      }
   ]

   React.useEffect(() => {
      if (modalVisible) {
         Animated.timing(animatedValue, {
            toValue: -280,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.linear
         }).start()
      } else {
         Animated.timing(animatedValue, {
            toValue: 280,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.linear
         }).start()
      }
   }, [modalVisible])

   const bottomTransform = {
      transform: [
         {
            translateY: animatedValue
         }
      ]
   }

   const navigationSettings = () => {
      setModalVisible(false)
      return navigation.navigate('Settings')
   }

   return (
      <View style={styles.container} pointerEvents={modalVisible ? 'auto' : 'none'}>
         <TouchableOpacity style={modalVisible ? styles.overlay: styles.overlay_1} onPress={() => setModalVisible(false)} />
         <Animated.View style={[styles.modalContainer, bottomTransform]}>
            <View style={styles.draggbleArea}>
               <View style={styles.dragleBar} />
            </View>
            {
               listOptions.map((item, index) => (
                  <TouchableOpacity key={index + 1} style={styles.optionItem}
                     onPress={() => {
                        if(item.title === 'Settings') return navigationSettings()
                        else return alert('Coming soon...')
                     }}
                  >
                        <Icon 
                           name={item.icon}
                           size={20}
                           style={{ width: 30}}
                        />
                        <Text>{item.title}</Text>
                  </TouchableOpacity>
               ))
            }
         </Animated.View>
      </View>
   )
}

export default ModalProfile

const styles = StyleSheet.create({
   container: {
      flex: 1,
      height: Dimensions.get('window').height,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
   },
   overlay: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      flex: 1,
   },
   overlay_1: {
      flex: 1,
   },
   modalContainer: {
      backgroundColor: 'white',
      height: 280,
      width: '100%',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 24,
      position: 'absolute',
      bottom: -280,
      elevation: 10,
   },
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
   }
})