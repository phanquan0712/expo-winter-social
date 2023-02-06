import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { IPost } from '../utils/TypeScript'
import { useNavigation } from '@react-navigation/native'
interface IProps {
   posts: IPost[]
}
const ListPostProfileUser: React.FC<IProps> = ({ posts }) => {
   const navigation = useNavigation<any>()
   return (
      <View style={styles.listPost}>
         {
            posts.map((post: IPost ) => (
               <TouchableOpacity style={{ height: 200, width: '46%', margin: 5}} key={post._id}
                  onPress={() => navigation.navigate('DetailPost', { id : post._id})}
               >
                  <Image 
                     source={{ uri: post.images[0]?.url as string }}
                     style={{ width: '100%', height: "100%", borderRadius: 5 }}
                  />
               </TouchableOpacity>
            ))
         }
      </View>
   )
}

export default ListPostProfileUser

const styles = StyleSheet.create({
   listPost: {
      display : 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
   }
})