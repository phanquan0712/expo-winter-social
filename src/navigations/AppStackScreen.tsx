import AppScreen from "../screens/AppScreen"
import { Settings, EditProfile, CommentPost, ConverstationsScreen, DetailPost, NewPost_Step2Screen, PreviewImage, OtherProfileScreen, MessageScreen } from '../screens/index'
import { Easing } from 'react-native'
import { TransitionSpecs, CardStyleInterpolators } from "@react-navigation/stack";


const config = {
   animation: 'spring',
   config: {
      stiffness: 1000,
      damping: 50,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
   }
}

const closeConfig = {
   animation: 'timing',
   config: {
      duration: 200,
      easing: Easing.linear,
   }
}

const customTransition = {
   gestureEnabled: true,
   gestureDirection: 'horizontal',
   transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
   },
   cardStyleInterpolator: ({ current, next, layouts }: any) => {
      return {
         cardStyle: {
            transform: [
               {
                  translateX: current.progress.interpolate({
                     inputRange: [0, 1],
                     outputRange: [layouts.screen.width, 0],
                  })
               },
               {
                  rotate: current.progress.interpolate({
                     inputRange: [0, 1],
                     outputRange: ["180deg", "0deg"],
                  }),
               },
               {
                  scale: next ?
                     next.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.7],
                     }) : 1,
               }
            ]
         },
         opacity: current.opacity,
      }
   }
}

export default function (Stack: any) {

   return (
      <>
         <Stack.Screen name="App" component={AppScreen} />
         <Stack.Screen name="Settings" component={Settings}
            options={{
               gestureDirection: 'horizontal',
               cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
               useNativeDriver: true,
            }}
         />
         <Stack.Screen name="EditProfile" component={EditProfile} options={{
            gestureDirection: 'vertical',
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            useNativeDriver: true,
         }} />
         <Stack.Screen name="CommentPost" component={CommentPost}
            options={{
               gestureDirection: 'horizontal',
               cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
               useNativeDriver: true,
            }}
         />
         <Stack.Screen name="ConverstationsScreen" component={ConverstationsScreen} options={{
            ...customTransition,
         }} />
         <Stack.Screen name="DetailPost" component={DetailPost}
            options={{
               gestureDirection: 'vertical',
               cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
               useNativeDriver: true,
            }}
         />

         <Stack.Screen name="NewPost_Step2Screen" component={NewPost_Step2Screen}
            options={{
               gestureDirection: 'horizontal',
               cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
               useNativeDriver: true,
            }}
         />
         <Stack.Screen name="PreviewImage" component={PreviewImage}
            options={{
               gestureDirection: 'vertical',
               cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
               useNativeDriver: true,
            }}
         />
         <Stack.Screen name="OtherProfile" component={OtherProfileScreen}
            options={{
               gestureDirection: 'horizontal',
               cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
               useNativeDriver: true,
            }}
         />
         <Stack.Screen name="MessageScreen" component={MessageScreen}
            options={{
               gestureDirection: 'horizontal',
               cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
               useNativeDriver: true,
            }}
         />
      </>
   )
}