import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'expo-router';
import { UserContext } from '../_layout';

const expense = () => {
  const [loggedInUser] = useContext(UserContext);
  const router = useRouter();
  const params =useSearchParams();
  const monthName = params.monthName;
  const userEmail = loggedInUser.email
  const [user, setUser] = useState([])
  const [expense, setExpense] = useState('')

  const url = `https://meal-management-server.onrender.com/api/users/findByEmail?email=${userEmail}`
  useEffect(()=>{
    fetch(url)
      .then(res => res.json())
      .then(data => setUser(data.user[0]))
  },[])

  const handleSubmit = async () => {
    const url = `https://meal-management-server.onrender.com/api/expense/addExpense`
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: user?.username,
          userEmail: user?.email,
          monthName: monthName,
          expenses: parseFloat(expense)
          
        }),
      });

      if (response.ok) {
       console.log("Expense added successfully")
       router.back();
        // Additional actions after successful sign-in, such as navigating to another screen
      } else {
        console.log('Expense added failed.');
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
        placeholder="Write todays expense"
        value={expense}
        keyboardType={'numeric'}
        onChangeText={(text) => setExpense(text)}
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

export default expense