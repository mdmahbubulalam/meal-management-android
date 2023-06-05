import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { useSearchParams } from 'expo-router';
import { UserContext } from '../_layout';

const expense = () => {
  const [loggedInUser] = useContext(UserContext);
  const params =useSearchParams();
    const monthName = params.monthName;

    console.log(params.monthName)
  return (
    <View>
      <Text>{monthName}</Text>
      <Text>{monthName}</Text>
      <Text>{monthName}</Text>
    </View>
  )
}

export default expense