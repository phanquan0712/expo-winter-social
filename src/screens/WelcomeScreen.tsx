import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Intro from '../components/Intro'
const WelcomeScreen = () => {
   return (
      <View style={styles.container}>
         <Intro />
      </View>
   )
}
export default WelcomeScreen
const styles = StyleSheet.create({
   container: {
      flex: 1,
   }
})

