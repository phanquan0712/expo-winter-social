import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Routes from './src/navigations/Routes';
import 'react-native-gesture-handler';
import FlashMessage from "react-native-flash-message";
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { LogBox } from "react-native"
import { useEffect } from 'react'; 
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


LogBox.ignoreAllLogs(true)
export default function App() {

  useEffect(() => {
    const getNotificationPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync()
      if(status !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        if(status !== 'granted') {
          alert('You need to enable notification permission to get notification')
        }
      }
      const tokenData = await Notifications.getExpoPushTokenAsync()
      const token = tokenData.data
      console.log(token);
    }
    getNotificationPermission()
  }, [])

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='transparent' translucent={false}
        />
        <Routes />
        <FlashMessage position="top" />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
