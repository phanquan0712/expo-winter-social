import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
export interface IOptionBottomSheetProps {
     icon: string
     title: string
}
const OptionBottomSheet: React.FC<IOptionBottomSheetProps> = ({ icon, title }) => {
     const navigation = useNavigation<any>()
     const handleNavigationSettings = () => {
          if(title === 'Settings') {
               return navigation.navigate('Settings')
          }
     }
  return (
    <TouchableOpacity
     style={styles.option}
     onPress={handleNavigationSettings}
    >
          <Icon name={icon} size={20} color="#000" />
          <Text style={{ marginLeft: 16, fontSize: 16, fontWeight: '500' }}>{title}</Text>
    </TouchableOpacity>
  )
}

export default OptionBottomSheet

const styles = StyleSheet.create({
     option: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
     }
})