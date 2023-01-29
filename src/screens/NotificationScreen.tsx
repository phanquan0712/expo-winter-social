import * as React from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../utils/TypeScript'
import { getNotifies } from '../redux/actions/notifiesAction'
import Loading from '../components/Loading'
import { INotify } from './../redux/types/notifiesType';
import notifyImage from '../../assets/notify.png'
import NotifyItem from '../components/NotifyItem'
const NotifycationScreen = () => {
   const { auth, notify } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()

   React.useEffect(() => {
      if(auth.access_token) {
         dispatch(getNotifies(auth.access_token))
      }
   }, [auth.access_token, dispatch])

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.headerText}>Notifies</Text>
         </View>
         <ScrollView style={{ flex: 1, padding: 16}}>
            {
               notify.load ? 
               <Loading />
               :
               (notify.data as INotify[]).length > 0 ? 
               notify.data.map((item: INotify, index: number) => (
                  <View key={item._id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                     <NotifyItem 
                        notify={item}
                     />
                  </View>
               ))
               :
               <View style={{ padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <Image 
                     source={notifyImage}
                     style={{ width: 300, height: 300, resizeMode: 'contain'}}
                     />
                  <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>No notifications</Text>
               </View>
            }
         </ScrollView>
      </View>
   )
}

export default NotifycationScreen

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white'
   },
   header: {
      height: 50,
      width: '100%',
      paddingHorizontal: 20,
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'      
   },
   headerText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000'
   }
})