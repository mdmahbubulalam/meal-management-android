import { View, StyleSheet, TextInput, Button, SafeAreaView, Text } from 'react-native'
import React, { useState } from 'react'
import { Stack, useRouter, useSearchParams } from 'expo-router';
import DateTimePickerModal from "react-native-modal-datetime-picker";



const MealForm = () => {
    const params =useSearchParams();
    const router = useRouter();
    const monthName = params.monthName;
    const userEmail = params.userEmail;
    const userName = params.userName;
    const singleUserEmail = params.singleUserEmail;

    const [mealCount, setMealCount] = useState(0)
    const [expense, setExpense] = useState(0)
    const [selectedDate, setSelectedDate] = useState("")

    console.log(selectedDate)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    const dateSelected = x1[2] + '-' + x1[1] + '-' + x1[0];
    setSelectedDate(dateSelected);
    
    hideDatePicker();
  };
   


   
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
          mealCount: parseFloat(mealCount),
          date: selectedDate
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
              placeholder="Write todays total bazar cost"
              value={expense}
              keyboardType={'numeric'}
              onChangeText={(text) => setExpense(text)}
            />
        }
        
        <TextInput
          style={styles.input}
          placeholder="Write todays meal"
          value={mealCount}
          keyboardType={'numeric'}
          onChangeText={(text) => setMealCount(text)}
        />
        <View>
      <View style={{paddingBottom:12}}>
        {selectedDate &&
         <TextInput
          style={styles.input}
          value={selectedDate}
       /> 
        }
      <Button  title="Select a date" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      </View>
    </View>
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
    marginBottom: 8,
    padding: 10,
    borderRadius: 3,
    borderColor : "#EA6F6F",
    backgroundColor:'white',
    fontWeight:'bold',
    fontSize:15
  },

  button : {
    borderRadius: 4,
    paddingTop:2
  }
});
export default MealForm