import { View, Text } from 'react-native'
import React from 'react'
import { useSearchParams } from 'expo-router';

const mealCount = () => {
    const params =useSearchParams();
    const monthName = params.monthName;

    console.log(params.monthName)
  return (
    <View>
      <Text>mealCount {monthName}</Text>
    </View>
  )
}

export default mealCount