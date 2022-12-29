import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import React from 'react'
import HeaderShowTitle from './../components/HeaderShowTitle';
import InputText from '../components/InputText';
import Icon from 'react-native-vector-icons/FontAwesome5'
import logo from '../../assets/logo.png'
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authAction';
const Settings = () => {
   const [searh, setSearch] = React.useState<string>('')
   const listOptions = [
      {
         icon: 'user-plus',
         title: 'Follow and invite friends'
      },
      {
         icon: 'bell',
         title: 'Notifications'
      },
      {
         icon: 'lock',
         title: 'Privacy'
      },
      {
         icon: 'user-friends',
         title: 'Supervision'
      },
      {
         icon: 'user-shield',
         title: 'Security'
      },
      {
         icon: 'bullhorn',
         title: 'Ads'
      },
      {
         icon: 'user-circle',
         title: 'Account'
      },
      {
         icon: 'life-ring',
         title: 'Help'
      },
      {
         icon: 'info-circle',
         title: 'About'
      },
      {
         icon: 'palette',
         title: 'Theme'
      }
   ]
   const dispatch = useDispatch<any>()
   const handleLogout = () => {
      Alert.alert(
         'Logout',
         'Are you sure you want to logout?',
         [
            {
               text: 'Cancel',
               style: "cancel"
            },
            {
               text: 'OK',
               onPress: () => dispatch(logout()),
               style: "destructive"
            }
         ]
      )
   }

   return (
      <ScrollView style={styles.container}>
         <HeaderShowTitle title='Settings' />
         <View style={{ paddingHorizontal: 20 }}>
            <InputText
               icon='search'
               placeholder='Search'
               value={searh}
               onChangeText={setSearch}
            />
            <View style={{ paddingVertical: 20 }}>
               {
                  listOptions.map((item, index) => (
                     <TouchableOpacity key={index + 1} style={styles.optionItem}
                        onPress={() => alert('Comming soon...')}
                     >
                        <Icon
                           name={item.icon}
                           size={20}
                           style={{ width: 30 }}
                        />
                        <Text>{item.title}</Text>
                     </TouchableOpacity>
                  ))
               }
            </View>
            <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}>
               <Image
                  source={logo}
                  style={{
                     width: 50,
                     height: 50,
                     marginRight: 10
                  }}
               />
               <Text style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: 2}}>Winter</Text>
            </View>
            <Text style={{ paddingVertical: 20, fontWeight: '300', fontSize: 16}}>
               Control settings for connected experiences across Winter Social, the Winter Blog app and the Winter Video app, including story and post sharing and logging in.
            </Text>
            <TouchableOpacity style={{ height: 50, backgroundColor: 'white', justifyContent: 'center'}}
               onPress={handleLogout}
            >
               <Text style={{ color: 'blue', fontSize: 16}}>Logout</Text>
            </TouchableOpacity>
         </View>
      </ScrollView>
   )
}

export default Settings

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
   },
   optionItem: {
      height: 50,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
   }
})