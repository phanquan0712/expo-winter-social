import * as React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage'
import RealWelcome from './RealWelcome';
const slides = [
   {
      key: 1,
      title: 'Connect with another people',
      text: 'Connect with another people',
      image: require('../../assets/bg1.jpg'),
      backgroundColor: '#59b2ab',
   },
   {
      key: 2,
      title: 'Title 2',
      text: 'Other cool stuff',
      image: require('../../assets/bg2.jpg'),
      backgroundColor: '#febe29',
   },
   {
      key: 3,
      title: 'Rocket guy',
      text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
      image: require('../../assets/bg3.jpg'),
      backgroundColor: '#22bcb5',
   }
];



export default function Intro() {
   const [showRealApp, setShowRealApp] = React.useState<boolean>(false);

   React.useEffect(() => {
      const getViewedIntro = async () => {
         const viewedIntro = await AsyncStorage.getItem('viewedIntro')
         if (viewedIntro) {
            setShowRealApp(true)
         }
      }
      getViewedIntro()
   }, [])

   const _renderItem = ({ item }: { item: any }) => {
      return (
         <View style={styles.slide}>
            <View style={styles.infoTop}>
               <Image source={item.image} style={styles.image} />
            </View>
            <View style={styles.infoBot}>
               <Text style={styles.title}>{item.title}</Text>
               <Text style={styles.text}>{item.text}</Text>
            </View>
         </View>
      );
   }

   const _renderDoneButton = () => {
      const handleViewDoneIntro = async () => {
         try {
            await AsyncStorage.setItem('viewedIntro', 'true')
            setShowRealApp(true)
         } catch (e) {
            console.log(e)
         }
      }
      return (
         <TouchableOpacity style={styles.buttonCircle} onPress={handleViewDoneIntro}>
            <Text style={styles.buttonCircleText}>Done</Text>
         </TouchableOpacity>
      );
   };

   if (showRealApp) {
      return <RealWelcome />;
   } else {
      return <AppIntroSlider
         data={slides}
         renderItem={_renderItem}
         showNextButton={false}
         renderDoneButton={_renderDoneButton}
      />;
   }
}


const styles = StyleSheet.create({
   slide: {
      flex: 1,
      backgroundColor: 'white'
   },
   infoTop: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   image: {
      width: 350,
      height: 350,
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
      marginBottom: '35%',
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