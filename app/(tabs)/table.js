import {  ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useContext, useEffect, useState } from 'react'
import { Table, TableWrapper, Row,  Cell } from 'react-native-table-component';
import SignIn from '../auth/SignIn';
import { UserContext } from '../_layout';
import Dialog from "react-native-dialog";


const MealTable = () => {
  const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);
    const [rowId, setRowId] = useState('')
    const [latestMonth, setLatestMonth] = useState([])
    const [loggedInUser] = useContext(UserContext);
    const userEmail = loggedInUser.email
    const headerData = ["Date", "Name","Expense", "Meal Count"]
    const [expense, setExpense] = useState('');
    const [mealCount, setMealCount] = useState('');
    const [date, setDate] = useState('');
  
    const latestMonthName = latestMonth.monthName;

    const initialValue = 0;

    const totalExpense = meals.reduce((accumulator, currentValue) => accumulator + currentValue.expense, initialValue);
  const totalMealCount = meals.reduce((accumulator, currentValue) => accumulator + currentValue.mealCount, initialValue);

    const url = `https://meal-management-server.onrender.com/api/months/allMonths`
  useEffect(()=>{
    setLoading(true)
    fetch(url)
      .then(res => res.json())
      .then(data => 
        {setLatestMonth(data[data.length - 1])
        setLoading(false)}
      );
  },[])

    const url2 = `https://meal-management-server.onrender.com/api/meals/currentMonthMealInfo?monthName=${latestMonthName}`
  useEffect(()=>{
    setLoading(true)
    const fetchPost = async () => {
      const res = await fetch(url2)
      const data = await res.json();
      setMeals(data.meal);
      setLoading(false)
      }
      fetchPost();
      
  },[latestMonthName])

  const url3 =  `https://meal-management-server.onrender.com/api/meals/${rowId}`
  useEffect(() => {
    const fetchPost = async () => {
    const res = await fetch(url3)
    const data = await res.json();
    setExpense(data?.meal?.expense)
    setMealCount(data?.meal?.mealCount)
    setDate(data?.meal?.date)
    }
    fetchPost();
},[rowId])
    


  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleEdit = async () => {
    const url5 =  `https://meal-management-server.onrender.com/api/meals/${rowId}`
    try {
      //   setLoading(true)
        const response = await fetch(url5, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            expense: parseFloat(expense),
            mealCount: parseFloat(mealCount),
          }),
        });
  
        if (response.ok) {
          //window.location.reload(true)
          console.log('Meal updated successfully!');
          // setSuccess('Meal updated successfully!')
          // setError('')
          setLoading(false)
          setVisible(false);
        } else {
          console.log('Meal update failed!');
          // setError('Meal update failed!');
          // setSuccess('')
          setLoading(false)
          
        }
      } catch (error) {
        console.log(error);
      }
  };

  const handleDelete = async () => {
    const url6 =  `https://meal-management-server.onrender.com/api/meals/${rowId}`
    try {
     
      const response = await fetch(url6, {
        method: 'DELETE',
      });

      if (response.ok) {
        const filteredMeal = meals.filter((item) => item._id !== rowId);
        setMeals(filteredMeal);
        console.log('Meal Deleted successfully!');
        //setSuccess('Meal Deleted successfully!')
        setVisible(false);
        // setLoading(false)
      } else {
        console.log('Failed to delete meal!');
        //setError('Failed to delete meal!');
        // setLoading(false) 
      }
      
    } catch (error) {
      console.log(error);
    }
 };


  



  
    return (
      <SafeAreaView style={styles.container}>
        {
          !userEmail && <SignIn/>
        }

        {
          loading ?

          <ActivityIndicator styles={{paddingTop : 10}} size='large' color='#EA6F6F' />

          :

          <ScrollView>
            <Text style={{color:"white", fontSize:20, textAlign:'center' , fontWeight:'bold', marginBottom:5}}>Meal Table of {latestMonthName}</Text>
            <Text style={{color:"white", fontSize:16, textAlign:'center' , fontWeight:'bold', marginBottom:5}}>Total Expense = {totalExpense}</Text>
            <Text style={{color:"white", fontSize:16, textAlign:'center' , fontWeight:'bold', marginBottom:5}}>Total Meal = {totalMealCount}</Text>
            
            <Table borderStyle={{borderWidth:1, borderColor:'#EA6F6F'}} >
              <Row data={headerData} style={[styles.head , { fontWeight: 'bold'}] } textStyle={styles.text}/>
                    {
                        
                      meals.map((meal) => (
                        <TouchableOpacity 
                        style={{borderRightWidth:1, borderBottomWidth:1, borderColor:'#EA6F6F'}}
                            onPress= {() => {
                              setVisible(true)
                              setRowId(meal._id)
                            }
                          }
                        >
                          <TableWrapper key={meal._id} style={styles.row}>
                              <Cell data={meal.date} textStyle={styles.text} />
                              <Cell data={meal.userName} textStyle={styles.text} />
                              <Cell data={meal.expense} textStyle={styles.text} />
                              <Cell data={meal.mealCount} textStyle={styles.text} />
                          </TableWrapper>
                        </TouchableOpacity>
                        
                        
                      ))
                      
                    }
            </Table>
          </ScrollView>
        }

      <Dialog.Container visible={visible}>
      
        <Dialog.Title>Date : {date}</Dialog.Title>
        <Dialog.Description>
          <View>
            <Text style={{fontWeight:'bold', fontSize:13}}>Edit Expense</Text>
            <TextInput
              style={styles.input}
              placeholder="Write todays total bazar cost"
              keyboardType={'numeric'}
              value = {expense.toString()}     
              onChangeText={(text) => setExpense(text)}
            />
            <Text style={{fontWeight:'bold', fontSize:13}}>Edit Meal Count</Text>
            <TextInput
              style={styles.input}
              placeholder="Write todays total bazar cost"
              value= {mealCount.toString()}
              keyboardType={'numeric'}
              onChangeText={(text) => setMealCount(text)}
            />
          </View>
        
        </Dialog.Description>
        <Dialog.Button style={{color:'green', fontWeight:'bold'}} label="Update" onPress={handleEdit} />
        <Dialog.Button style={{color:'red', fontWeight:'bold'}} label="Delete" onPress={handleDelete} />
        <Dialog.Button style={{color:'black', fontWeight:'bold'}}  label="Cancel" onPress={handleCancel} />
      </Dialog.Container>
            
      </SafeAreaView>    
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 5, backgroundColor: '#2F2F2F' },
    head: { height: 40, backgroundColor: '#537791' },
    text: { margin: 6, textAlign:'center', color: 'white', fontSize:15,fontWeight: '500' },
    row: { flexDirection: 'row', backgroundColor: '#1F1F1F'},
    input: {
      width: "100%",
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
  });

export default MealTable