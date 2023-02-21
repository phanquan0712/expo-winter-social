import * as React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../utils/TypeScript'
import { getNotifies } from '../redux/actions/notifiesAction'
import Loading from '../components/Loading'
import { INotify } from './../redux/types/notifiesType';
import notifyImage from '../../assets/notify.png'
import NotifyItem from '../components/NotifyItem'
import { deleteAllNotify } from '../redux/actions/notifiesAction'
const NotifycationScreen = () => {
   const { auth, notify } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()

   React.useEffect(() => {
      if(auth.access_token) {
         dispatch(getNotifies(auth.access_token))
      }
   }, [auth.access_token, dispatch])

   const handleClearAllNotifies = () => {
      return dispatch(deleteAllNotify(auth))
   }

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.headerText}>Notifies</Text>
            {
               notify.data &&
               notify.data.length > 0 &&               
               <TouchableOpacity
                  onPress={handleClearAllNotifies}
                  style={{
                     backgroundColor: 'rgba(0, 0, 0, 0.5)',
                     justifyContent: 'center',
                     alignItems: 'center',
                     borderRadius: 10,
                     padding: 8
                  }}
               >
                  <Text
                     style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: '600',
                     }}
                  >Clear All</Text>
               </TouchableOpacity>
            }
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
      </SafeAreaView>
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
      justifyContent: 'space-between',
      alignItems: 'center'      
   },
   headerText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000'
   }
})