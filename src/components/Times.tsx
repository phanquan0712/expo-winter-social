import React, { useState, useEffect } from 'react'
import { View, Text} from 'react-native'

interface IProps {
   total: number
}
const Times = ({ total }: IProps) => {
   const [hour, setHour] = useState<number>(0)
   const [mins, setMins] = useState<number>(0)
   const [second, setSecond] = useState<number>(0)

   
   useEffect(() => {
      setSecond(total % 60);
      setMins(parseInt((total / 60).toString()));
      setHour(parseInt((total / 3600).toString()));
   }, [total])

   return (
      <View style={{ 
          display: 'flex', flexDirection: 'row', alignItems: 'center',
      }}>
         <Text>{hour.toString().length < 2 ? '0' + hour : hour}</Text>
         <Text>:</Text>
         <Text>{mins.toString().length < 2 ? '0' + mins : mins}</Text>
         <Text>:</Text>
         <Text>{second.toString().length < 2 ? '0' + second : second}</Text>
      </View>
   )
}

export default Times