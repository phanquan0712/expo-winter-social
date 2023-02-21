import * as React from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../components/Loading'
import { IPost, IUser, RootStore } from '../utils/TypeScript'
import { getPostDiscover } from '../redux/actions/discoverPostAction'
import { useNavigation } from '@react-navigation/native'
import RenderMedia from '../components/RenderMedia'
import { getApi } from '../utils/fetchData'
import { ShowError } from '../utils/ShowMessage'
import CardPeopleItemSearch from '../components/CardPeopleItemSearch'
interface IState {
   avatar: string,
   username: string,
   fullname: string,
   _id: string
}
const SearchScreen = () => {
   const { auth, discoverPost } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const navigation = useNavigation<any>()
   const [search, setSearch] = React.useState<string>('')
   const [load, setLoad] = React.useState<boolean>(false)
   const [users, setUsers] = React.useState<IState[]>([])
   React.useEffect(() => {
      if (auth.access_token) {
         dispatch(getPostDiscover(auth.access_token))
      }
   }, [auth.access_token])


   React.useEffect(() => {
      const handleSearch = async () => {
         if (!search) return;
         try {
            let searchString = search.trim().toLowerCase()
            setLoad(true);
            const res = await getApi(`search?username=${searchString}`, auth.access_token);
            setUsers(res.data.users);
            setLoad(false)
         } catch (err: any) {
            return ShowError(err.response.data.msg)
         }
      }
      handleSearch()
   }, [search])

   React.useEffect(() => {
      if(!search) {
         setUsers([])
      }
   }, [search])

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.search}>
            <View style={{ backgroundColor: '#e9e9e9', borderRadius: 10, display: 'flex', flexDirection: 'row', height: '100%', alignItems: 'center', paddingHorizontal: 10 }}>
               <Icon name="search" size={15} color="#000" />
               <TextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search user..."
                  placeholderTextColor={'#666'}
                  style={{ color: '#333', marginLeft: 10, padding: 5, fontSize: 14, fontWeight: '400', flex: 1 }}
               />
               {
                  search &&
                  <TouchableOpacity
                     onPress={() => {
                        setSearch('')
                        setUsers([])
                     }}
                  >
                     <Icon
                        name="times"
                        size={15}
                        color="#000"
                     />
                  </TouchableOpacity>
               }
            </View>
         </View>
         <ScrollView style={{ flex: 1, padding: 5, width: '100%' }}>
            {
               load ?
                  <Loading />
                  :
                  users.length > 0 &&
                  <View style={{ marginBottom: 30}}>
                     {
                        users.map((item: IState) => (
                           <CardPeopleItemSearch
                              key={item._id}
                              avatar={item.avatar}
                              username={item.username}
                              fullname={item.fullname}
                              _id={item._id}
                           />
                        ))
                     }
                  </View>
            }
            {
               discoverPost.loading ?
                  <Loading />
                  :
                  <View style={{ flex: 1 }}>
                     <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Discover post</Text>
                     <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                     }}>
                        {
                           discoverPost.posts.map((item: IPost) => (
                              <TouchableOpacity style={styles.gridImage} key={item._id}
                                 onPress={() => navigation.navigate('DetailPost', { post: item })}
                              >
                                 <RenderMedia
                                    media={item.images[0]?.url as string}
                                    id={item._id}
                                    styleHeight={200}
                                    shouldPlay={true}
                                 />
                                 {/* <Image
                                 source={{ uri: item.images[0]?.url as string }}
                                 style={{ width: '100%', height: '100%' }}
                              /> */}
                              </TouchableOpacity>
                           ))
                        }
                     </View>
                  </View>
            }
         </ScrollView>
      </SafeAreaView>
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