import * as React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import ButtonWithText from './ButtonWithText'
import { useNavigation } from '@react-navigation/native'
const RealWelcome = () => {
   const navigation = useNavigation<any>()
   return (
      <View style={styles.container}>
         <View style={styles.infoTop}>
            <Image
               source={require('../../assets/logo.png')}
               style={styles.image}
            />
         </View>
         <View style={styles.infoBot}>
            <View style={{ flex: 1}}>
               <Text style={styles.title}>Welcome to the Winter Social App!</Text>
               <Text style={styles.text}>This is a social app clone Instagram</Text>
            </View>
            <View style={{ flex: 1, marginTop: 20 }}>
               <ButtonWithText
                  text="Login"
                  onPress={() => navigation.navigate('Login')}
                  bgBtn="#fff"
                  colorText="#90aeea"
               />
               <ButtonWithText
                  text="Sign Up"
                  onPress={() => navigation.navigate('SignUp')}
                  bgBtn="#fff"
                  colorText="#90aeea"
               />
            </View>
            <Text style={styles.text}>Creator and Design: Winter-PHQ</Text>
         </View>
      </View>
   )
}

export default RealWelcome

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white'
   },
   infoTop: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   image: {
      width: 200,
      height: 200,
      borderRadius: 200,
   },
   infoBot: {
      flex: 1,
      backgroundColor: '#90aeea',
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
   },
   title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: 'white',
      padding: 20,
      textAlign: 'center',
   },
   text: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center'
   },
   buttonCircle: {
      width: 100,
      height: 40,
      backgroundColor: 'white',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
   },
   buttonCircleText: {
      fontSize: 16,
      color: '#90aeea',
      fontWeight: '500',
      textTransform: 'uppercase'
   }
})