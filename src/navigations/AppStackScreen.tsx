import AppScreen from "../screens/AppScreen"
import { Settings, EditProfile, CommentPost } from '../screens/index'

export default function (Stack: any) {
   return (
      <>
         <Stack.Screen name="App" component={AppScreen} />
         <Stack.Screen name="Settings" component={Settings} options={{
            animation: 'slide_from_right',
         }} />
         <Stack.Screen name="EditProfile" component={EditProfile} options={{
            animation: 'slide_from_bottom',
            popup: true,
         }} />
         <Stack.Screen name="CommentPost" component={CommentPost} options={{
            animation: 'slide_from_right',
         }} />
      </>
   )
}