import { View, Text } from 'react-native'
import React from 'react'
import { Link, Stack, useSearchParams } from 'expo-router'

const Meal = () => {
    const params =useSearchParams();
    const monthName = params.monthName;

    console.log(params.monthName)

  return (
    <View>
      <Stack.Screen
      
      options={{
      
        headerTitle : 'Meal',
        headerStyle : {backgroundColor : "#C2D8C6"},
       
   }}
   />
      <Link href={{ pathname: "./expense", params: { monthName: monthName } }}>Add Expense</Link>
      <Link href={{ pathname: "./meals", params: { monthName: monthName } }}>Add Todays Meal</Link>
    </View>
  )
}

export default Meal