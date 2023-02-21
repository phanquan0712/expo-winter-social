import * as React from 'react'
import { StyleSheet, Text, View, Animated, Easing, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import InputCustom from '../components/InputCustom'
import ButtonWithText from '../components/ButtonWithText'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { IRegisterUser } from '../utils/TypeScript'
import SelectDropdown from 'react-native-select-dropdown'
import { useDispatch } from 'react-redux'
import { register } from '../redux/actions/authAction'
const listGender = ['Male', 'Female', 'Other']
const SinUp = () => {
   const borderBotRightRadius = React.useRef(new Animated.Value(500)).current
   const borderTopLeftRadius = React.useRef(new Animated.Value(500)).current
   const [state, setState] = React.useState<IRegisterUser>({
      fullname: '',
      username: '',
      email: '',
      password: '',
      cf_password: '',
      gender: '',
   })
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

   const handleSignUp = async() => {
      try {
         dispatch(register(state))
         setState({
            fullname: '',
            username: '',
            email: '',
            password: '',
            cf_password: '',
            gender: '',
         })
         return navigation.navigate('Login')
      } catch(err: any) {
         console.log(err)
      }
   }

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
         <StatusBar />
         <LinearGradient
            colors={['#d8c4fc', '#bcc5fc', '#9dc6fc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.form]}
         >
            <Animated.View style={[styles.ani, { borderBottomRightRadius: borderBotRightRadius, borderTopLeftRadius: borderTopLeftRadius }]}>
               <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', marginBottom: 30 }}>Sign up</Text>
               <View style={{ width: '100%', marginBottom: 50 }}>
                  <InputCustom
                     value={state.fullname}
                     onChangeText={(text) => setState({ ...state, fullname: text })}
                     placeholder="Full name"
                     icon='pen'
                  />
                  <InputCustom
                     value={state.username}
                     onChangeText={(text) => setState({ ...state, username: text })}
                     placeholder="User name"
                     icon='signature'
                  />
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
                  <InputCustom
                     value={state.cf_password}
                     onChangeText={(text) => setState({ ...state, cf_password: text })}
                     placeholder="Confirm password"
                     secureTextEntry={true}
                     icon='lock'
                  />
                  <SelectDropdown 
                     data={listGender}
                     buttonStyle={{ width: '100%', height: 50, backgroundColor: 'white', borderRadius: 500, justifyContent: 'center', alignItems: 'center' }}
                     dropdownStyle={{ height: 150, backgroundColor: 'white', borderRadius: 10}}
                     buttonTextStyle={{ fontSize: 16, color: 'black' }}
                     onSelect={(selectedItem, index) => {
                        setState({...state, gender: (selectedItem as string).toLowerCase()})
                     }}
                     buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                     }}
                     rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                     }}
                  />
               </View>
               <ButtonWithText
                  text="Signup"
                  onPress={handleSignUp}
                  bgBtn="#6a75cf"
                  colorText="white"
               />
               <Text style={{ fontSize: 14, fontWeight: '500', color: '#333', paddingHorizontal: 10, textAlign: 'center' }}>
                  Already an account? &nbsp;<Text onPress={() => navigation.navigate("Login")} style={{ color: 'white' }}>Login</Text>
               </Text>
            </Animated.View>
         </LinearGradient>
      </SafeAreaView>
   )
}

export default SinUp

const styles = StyleSheet.create({
   form: {
      flex: 3,
   },
   ani: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 36,
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