import * as React from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../components/Loading'
import  { IPost, RootStore } from '../utils/TypeScript'
import { getPostDiscover } from '../redux/actions/discoverPostAction'
import { useNavigation } from '@react-navigation/native'
const SearchScreen = () => {
   const { auth, discoverPost } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const navigation = useNavigation<any>()
   const [search, setSearch] = React.useState<string>('')

   React.useEffect(() => {
      if(auth.access_token) {
         dispatch(getPostDiscover(auth.access_token))
      }
   }, [auth.access_token])

   return (
      <View style={styles.container}>
         <View style={styles.search}>
            <View style={{ backgroundColor: '#e9e9e9', borderRadius: 10, display: 'flex', flexDirection: 'row', height: '100%', alignItems: 'center', paddingHorizontal: 10}}>
               <Icon name="search" size={15} color="#000" />
               <TextInput 
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search"
                  placeholderTextColor={'#666'}
                  style={{ color: '#333', marginLeft: 10, padding: 5, fontSize: 14, fontWeight: '400' }}
               />
            </View>
         </View>
         <ScrollView style={{ flex: 1, padding: 10}}>
            {
               discoverPost.loading ? 
               <Loading />
               :
               discoverPost.posts.map((item: IPost) => (
                  <TouchableOpacity style={styles.gridImage} key={item._id}
                     onPress={() => navigation.navigate('DetailPost', { post: item })}
                  >
                     <Image 
                        source={{ uri: item.images[0]?.url as string }}
                        style={{ width: '100%', height: '100%' }}
                     />
                  </TouchableOpacity>
               ))
            }
         </ScrollView>
      </View>
   )
}

export default SearchScreen

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   search: {
      height: 55,
      width: '100%',
      padding: 10,
      backgroundColor: '#fff'
   },
   gridImage: {
      width: '46%',
      height: 200,
      borderRadius: 10,
      padding: 5,
      overflow: 'hidden',
   }
})