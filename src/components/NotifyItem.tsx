import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { INotify } from '../redux/types/notifiesType'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { ShowError } from '../utils/ShowMessage'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../utils/TypeScript'
import { isReadNotify } from '../redux/actions/notifiesAction'
interface IProps {
   notify: INotify
}

const NotifyItem: React.FC<IProps> = ({ notify }) => {
   const navigation = useNavigation<any>()
   const dispatch = useDispatch<any>()
   const { auth } = useSelector((state: RootStore) => state)
   const handleReadNotify = () => {
      if(!notify._id) return ShowError('Something went wrong')
      dispatch(isReadNotify(notify, auth.access_token))
      if(notify.text === 'has started to follow you') {
         return navigation.navigate('OtherProfile', { id: notify.user?._id as string })
      } 
      return navigation.navigate('DetailPost', { id: notify.url.slice(7) })
   }

   return (
      <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', paddingVertical: 8, width: '100%', backgroundColor: notify.isRead ? '#fff' : '#ddd', padding: 16}}
         onPress={handleReadNotify}
      >
         <Image 
            source={{ uri: notify.user?.avatar as string}}
            style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10, borderColor: '#e76e34', borderWidth: 1}}
         />
         <View style={styles.notifyInfo}>
            <View style={{
               display: 'flex',
               flexDirection: 'row',
               alignItems: 'center',
               flexWrap: 'wrap',
               marginRight: 5
             }}>
               <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold', marginRight: 5 }}>{notify.user?.username as string}</Text>
               <Text style={{ fontSize: 16, color: '#333', fontWeight: '400', marginRight: 5 }}>
                  {notify.text}.
               </Text>
            </View>
            <Text style={{ fontSize: 16, color: '#666', fontWeight: '400'}}>
               {moment(notify.createdAt).fromNow()}
            </Text>
         </View>
         {
            notify.text === 'has started to follow you' && 
            <TouchableOpacity style={{ width: 60, height: 35, backgroundColor: '#3ab1da', justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
               <Text style={{ color: 'white', fontSize: 16, fontWeight: '500'}}>Follow</Text>
            </TouchableOpacity>
         }
      </TouchableOpacity>
   )
}

export default NotifyItem

const styles = StyleSheet.create({
   notifyInfo: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',   
      justifyContent: 'center',
   },
})