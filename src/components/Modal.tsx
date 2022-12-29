import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing, Dimensions, TouchableNativeFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
interface IProps {
   modalVisible: boolean
   setModalVisible: (value: boolean) => void
   data: any[]
}

const ModalProfile: React.FC<IProps> = ({ modalVisible, setModalVisible, data }) => {
   const animatedValue = React.useRef(new Animated.Value(0)).current
   const navigation = useNavigation<any>()

   React.useEffect(() => {
      if (modalVisible) {
         Animated.timing(animatedValue, {
            toValue: -(50 * data.length + 30),
            duration: 200,
            useNativeDriver: true,
            easing: Easing.elastic(0.8)
         }).start()
      } else {
         Animated.timing(animatedValue, {
            toValue: (50 * data.length + 30),
            duration: 200,
            useNativeDriver: true,
            easing: Easing.elastic(0.8)
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
         <Animated.View style={[styles.modalContainer, bottomTransform, { height: 
            (50 * data.length + 30), bottom: -(50 * data.length + 30)
         }]}>
            <View style={styles.draggbleArea}>
               <View style={styles.dragleBar} />
            </View>
            {
               (data as any[]).map((item, index) => (
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
      width: '100%',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 24,
      position: 'absolute',
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
   },
   modalBottomSheet: {
      flex: 1,
      backgroundColor: 'red',
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      position: 'absolute'
   }
})