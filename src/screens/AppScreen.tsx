import { StyleSheet, Text, View, Image, Easing } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen, SearchScreen, NewPost_Step1Screen, NotificationScreen, ProfileScreen } from './index'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux'
import { RootStore } from '../utils/TypeScript'
const Tab = createBottomTabNavigator()
import { useRoute,  useIsFocused } from '@react-navigation/native'

const AppScreen = () => {
   const { auth } = useSelector((state: RootStore) => state)
   const screenOptions = ({ route }: any) => ({
      headerShown: false,
      gestureEnabled: true,
      tarBarBackgroundColor: '#fff',
      tabBarActiveTintColor: '#000',
      tabBarInactiveTintColor: '#d1cece',
      tabBarShowLabel: false,
      tarBarStyle: {
         zIndex: 1,
      },
      tabBarIcon: ({ focused, color, size }: any) => {
         let iconName;
         if(route.name === 'Home') {
            iconName = 'home'
         } else if(route.name === 'Search') {
            iconName = 'search'
         } else if(route.name === 'NewPost_Step1Screen') {
            iconName = 'plus'
         } else if(route.name === 'Notification') {
            iconName = 'heart'
         } else if(route.name === 'Profile') {
            if(auth.user) {
               return (
                  <Image 
                     source={{ uri: auth.user.avatar }} 
                     style={{ width: 30, height: 30, borderRadius: 40 }}
                  />
               )
            }
            iconName = 'user'
         }
         return <Icon name={iconName as string} size={size} color={color} />;
      },
   })

   return (
      <Tab.Navigator screenOptions={screenOptions}>
         <Tab.Screen name="Home" component={HomeScreen}
         />
         <Tab.Screen name="Search" component={SearchScreen} />
         <Tab.Screen name="NewPost_Step1Screen" component={NewPost_Step1Screen} />
         <Tab.Screen name="Notification" component={NotificationScreen} />
         <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
   )
}

export default AppScreen

const styles = StyleSheet.create({})