import { View, StyleSheet, TextInput, Button, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';


const MealForm = () => {
    const params =useSearchParams();
    const router = useRouter();
    const monthName = params.monthName;
    const userEmail = params.userEmail;
    const userName = params.userName;
    const singleUserEmail = params.singleUserEmail;

    const [mealCount, setMealCount] = useState(0)
    const [expense, setExpense] = useState(0)
   


   
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
          expense: parseFloat(expense),
          mealCount: parseFloat(mealCount)
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
    <SafeAreaView style={styles.container}>
      <Stack.Screen
         options={{
          headerStyle : {backgroundColor : "#EA6F6F"},
          headerTitle : "Meal Form"
      }}
      />
     <View>
      
      {
          singleUserEmail === userEmail &&
            <TextInput
              style={styles.input}
              placeholder="Write todays expense"
              value={expense}
              keyboardType={'numeric'}
              onChangeText={(text) => setExpense(text)}
            />
        }
        
        <TextInput
          style={styles.input}
          placeholder="Write todays Meal"
          value={mealCount}
          keyboardType={'numeric'}
          onChangeText={(text) => setMealCount(text)}
        />
        <Button style={styles.button} color={"#EA6F6F"} title="Submit" onPress={handleSubmit} />
     </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor : "#2F2F2F",
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 2,
    marginBottom: 12,
    padding: 10,
    borderRadius: 3,
    borderColor : "#EA6F6F",
    backgroundColor:'white'
    
  },

  button : {
    borderRadius: 4
  }
});
export default MealForm