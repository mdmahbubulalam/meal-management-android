import { View, Text } from 'react-native'
import React from 'react'
import { Link, useSearchParams } from 'expo-router'

const Meal = () => {
    const params =useSearchParams();
    const monthName = params.monthName;

    console.log(params.monthName)

  return (
    <View>
      <Link href={{ pathname: "./expense", params: { monthName: monthName } }}>Add Expense</Link>
      <Link href={{ pathname: "./meals", params: { monthName: monthName } }}>Add Todays Meal</Link>
    </View>
  )
}

export default Meal