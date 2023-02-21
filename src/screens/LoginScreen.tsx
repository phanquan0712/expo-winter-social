import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing, ScrollView, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome5'
import InputCustom from '../components/InputCustom'
import ButtonWithText from '../components/ButtonWithText'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { ILoginUser } from '../utils/TypeScript'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../utils/TypeScript'
import { login } from '../redux/actions/authAction'
const LoginScreen = () => {
   const borderBotRightRadius = React.useRef(new Animated.Value(500)).current
   const borderTopLeftRadius = React.useRef(new Animated.Value(500)).current
   const [state, setState] = React.useState<ILoginUser>({
      email: '',
      password: '',
   })
   const { auth } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const navigation = useNavigation<any>()
   React.useEffect(() => {
      Animated.loop(
         Animated.parallel([
            Animated.sequence([
               Animated.timing(borderBotRightRadius, {
                  toValue: 200,
                  duration: 2000,
                  useNativeDriver: true,
                  easing: Easing.linear,
               }),
               Animated.timing(borderBotRightRadius, {
                  toValue: 500,
                  duration: 3000,
                  useNativeDriver: true,
                  easing: Easing.linear,
               }),
            ]),
            Animated.sequence([
               Animated.timing(borderTopLeftRadius, {
                  toValue: 200,
                  duration: 2000,
                  useNativeDriver: true,
                  easing: Easing.linear,
               }),
               Animated.timing(borderTopLeftRadius, {
                  toValue: 500,
                  duration: 3000,
                  useNativeDriver: true,
                  easing: Easing.linear,
               })
            ])
         ])
      ).start()
   }, [])


   const handleLogin = async() => {
      try {
         dispatch(login(state))
         setState({
            email: '',
            password: '',
         })
      } catch(err: any) {
         console.log(err)
      }
   }

   return (
      <ScrollView style={{ flex: 1 , backgroundColor: 'white'}}>
         <StatusBar style="auto" backgroundColor='transparent' />
         <LinearGradient
            colors={['#d8c4fc', '#bcc5fc', '#9dc6fc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.form]}
         >
            <Animated.View style={[styles.ani,{ borderBottomRightRadius: borderBotRightRadius, borderTopLeftRadius: borderTopLeftRadius}]}>
               <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', marginBottom: 30 }}>Login</Text>
               <View style={{ width: '100%', marginBottom: 50 }}>
                  <InputCustom
                     value={state.email}
                     onChangeText={(text) => setState({ ...state, email: text })}
                     placeholder="Email"
                     icon='user'
                  />
                  <InputCustom
                     value={state.password}
                     onChangeText={(text) => setState({ ...state, password: text })}
                     placeholder="Password"
                     secureTextEntry={true}
                     icon='lock'
                  />
               </View>
               <ButtonWithText
                  text="Login"
                  onPress={handleLogin}
                  bgBtn="#6a75cf"
                  colorText="white"
               />
               <Text style={styles.textBtn}>Forgot your password?</Text>
            </Animated.View>
         </LinearGradient>
         <View style={styles.other}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
               <View style={{ height: 1, backgroundColor: '#666', flex: 1 }} />
               <Text style={{ fontSize: 14, fontWeight: '500', color: '#333', paddingHorizontal: 10 }}>Or connect with</Text>
               <View style={{ height: 1, backgroundColor: '#666', flex: 1 }} />
            </View>
            <View style={styles.socialConnect}>
               <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#36a6ef' }]}>
                  <Icon name="facebook" size={20} color="#fff" />
                  <Text style={styles.textBtn}>Facebook</Text>
               </TouchableOpacity>
               <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#5273b6' }]}>
                  <Icon name="twitter" size={20} color="#fff" />
                  <Text style={styles.textBtn}>Twitter</Text>
               </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#333', paddingHorizontal: 10, textAlign: 'center' }}>
               Dont't have an account? &nbsp;<Text onPress={() => navigation.navigate("SignUp")} style={{ color: '#a4c2f8' }}>Sign Up</Text>
            </Text>
         </View>
      </ScrollView>
   )
}

export default LoginScreen

const styles = StyleSheet.create({
   form: {
      flex: 3,
   },
   ani: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 36,
      marginTop: 120,
      backgroundColor: 'rgba(255,255,255,0.3)',
   },
   other: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 48,
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
   },
   socialConnect: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 30
   },
   socialButton: {
      width: 160,
      height: 40,
      borderRadius: 20,
      flexDirection: 'row',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   },
   textBtn: {
      fontSize: 14,
      fontWeight: '600',
      color: 'white',
      marginLeft: 10
   }
})