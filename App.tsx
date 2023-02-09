import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Routes from './src/navigations/Routes';
import 'react-native-gesture-handler';
import FlashMessage from "react-native-flash-message";
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { LogBox } from "react-native"

LogBox.ignoreAllLogs(true)
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar backgroundColor='transparent' translucent={false} />
        <Routes />
        <FlashMessage position="top" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
