import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'expo-router';

const MealForm = () => {
    const params =useSearchParams();
    const router = useRouter();
    const monthName = params.monthName;
    const userEmail = params.userEmail;
    const userName = params.userName;

    const [mealCount, setMealCount] = useState('')

  const handleSubmit = async () => {
    const url = `https://meal-management-server.onrender.com/api/meals/addMeal`
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: userName,
          userEmail: userEmail,
          monthName: monthName,
          mealCount: mealCount
        }),
      });

      if (response.ok) {
       console.log("Meal added successfully")
       router.back();
        // Additional actions after successful sign-in, such as navigating to another screen
      } else {
        console.log('Meal added failed.');
        // Handle sign-in failure, such as displaying an error message
      }
    } catch (error) {
      console.log(error);
      // Handle any other error that may occur during sign-in
    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write todays Meal"
        value={mealCount}
        onChangeText={(text) => setMealCount(text)}
      />
    
      <Button title="Submit" onPress={handleSubmit} />
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    input: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      marginBottom: 12,
      padding: 10,
    },
  });
export default MealForm