import * as React from 'react'
import { StyleSheet, Text, View , SafeAreaView} from 'react-native'
import Intro from '../components/Intro'
const WelcomeScreen = () => {
   return (
      <SafeAreaView style={styles.container}>
         <Intro />
      </SafeAreaView>
   )
}
export default WelcomeScreen
const styles = StyleSheet.create({
   container: {
      flex: 1,
   }
})

