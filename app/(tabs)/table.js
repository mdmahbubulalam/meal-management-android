import {  ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
import React, {useContext, useEffect, useState } from 'react'
import { Table, TableWrapper, Row,  Cell } from 'react-native-table-component';
import SignIn from '../auth/SignIn';
import { UserContext } from '../_layout';


const MealTable = () => {
  const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);
    const [latestMonth, setLatestMonth] = useState([])
    const [loggedInUser] = useContext(UserContext);
    const userEmail = loggedInUser.email
    const headerData = ["Date", "Name","Expense", "Meal Count"]
   
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
                        <TableWrapper key={meal._id} style={styles.row}>
                            <Cell data={meal.date} textStyle={styles.text} />
                            <Cell data={meal.userName} textStyle={styles.text}/>
                            <Cell data={meal.expense} textStyle={styles.text}/>
                            <Cell data={meal.mealCount} textStyle={styles.text}/>
                        </TableWrapper>
                        
                      ))
                      
                    }
            </Table>
          </ScrollView>
        }
            
      </SafeAreaView>    
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 5, backgroundColor: '#2F2F2F' },
    head: { height: 40, backgroundColor: '#537791' },
    text: { margin: 6, textAlign:'center', color: 'white', fontSize:15,fontWeight: '500' },
    row: { flexDirection: 'row', backgroundColor: '#1F1F1F'},
  });

export default MealTable