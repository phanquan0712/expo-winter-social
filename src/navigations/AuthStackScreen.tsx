import { WelcomeScreen, LoginScreen, SignUpScreen } from "../screens"

export default function (Stack: any) {
   return (
      <>
         <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
         />
         <Stack.Screen
            name="Login"
            component={LoginScreen}
         />
         <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
         />
      </>
   )
}