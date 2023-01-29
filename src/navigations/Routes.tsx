import { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators, CardStyleInterpolators } from "@react-navigation/stack";
import AuthStackScreen from "./AuthStackScreen"
import AppStackScreen from "./AppStackScreen"
import { useSelector, useDispatch } from "react-redux"
import { RootStore } from "../utils/TypeScript"
import { refreshToken } from "../redux/actions/authAction"
import { Easing } from 'react-native';
const Stack = createStackNavigator()


const Routes = () => {
   const { auth } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()

   useEffect(() => {
      dispatch(refreshToken())
   }, [dispatch])

   return (
      <NavigationContainer>
         <Stack.Navigator screenOptions={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerShown: false
         }}>
            {(auth.user && auth.access_token) ? AppStackScreen(Stack) : AuthStackScreen(Stack)}
         </Stack.Navigator>
      </NavigationContainer>
   )
}

export default Routes