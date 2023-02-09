import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { IUser } from '../utils/TypeScript'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../utils/TypeScript'
import { follow, unfollow } from '../redux/actions/userAction'

interface IProps {
   user: IUser
}
const FollowButton: React.FC<IProps> = ({ user }) => {
   const { auth } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const [isFollow, setIsFollow] = React.useState<boolean>(false)

   React.useEffect(() => {
      if(user.followers.find(item => item._id === auth.user._id))
         setIsFollow(true)
   }, [auth.user, user])


   const handleFollow = () => {
      if(isFollow) {
         setIsFollow(false)
         return dispatch(unfollow(user, auth))
      }
      else {
         setIsFollow(true)
         return dispatch(follow(user, auth))
      }
   }

   return (
      <TouchableOpacity style={{ height: 40, width: '100%', borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', 
      backgroundColor: '#3ab1da'}}
         onPress={handleFollow}
      >
         <Text style={{ color: 'white', fontSize: 16, fontWeight: '500'}}>
            {
               isFollow ? 'Following' : 'Follow'
            }
         </Text>
      </TouchableOpacity>
   )
}

export default FollowButton

const styles = StyleSheet.create({

})