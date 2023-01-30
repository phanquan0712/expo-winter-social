import * as React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import InputCustom from '../components/InputCustom'
import Icon from 'react-native-vector-icons/FontAwesome5'
const SearchScreen = () => {
   const [search, setSearch] = React.useState<string>('')
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
   }
})