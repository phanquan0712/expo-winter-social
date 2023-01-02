import { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AuthStackScreen from "./AuthStackScreen"
import AppStackScreen from "./AppStackScreen"
import { useSelector, useDispatch } from "react-redux"
import { RootStore } from "../utils/TypeScript"
import { refreshToken } from "../redux/actions/authAction"
const Stack = createNativeStackNavigator()
const Routes = () => {
   const { auth } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const screenOptions = {
      headerShown: false,
      Animation: 'slide_from_right',
      smoothTransition: true,
      transitionSpec: {
         open: { animation: 'timing', config: { duration: 100 } },
         close: { animation: 'timing', config: { duration: 100 } },
      }
   }

   useEffect(() => {
      dispatch(refreshToken())
   }, [dispatch])

   return (
      <NavigationContainer>
         <Stack.Navigator screenOptions={screenOptions}>
            {/* { (auth.user && auth.access_token) ? AppStackScreen(Stack) : AuthStackScreen(Stack) } */}
            {
               AppStackScreen(Stack)
            }
         </Stack.Navigator>
      </NavigationContainer>
   )
}

export default Routes