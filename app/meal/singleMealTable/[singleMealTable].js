import {  ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
import React, {useContext, useEffect, useState } from 'react'
import {} from 'react-native';

import { Table, TableWrapper, Row,  Cell } from 'react-native-table-component';
import { Stack, useSearchParams } from 'expo-router';
import { UserContext } from '../../_layout';
import SignIn from '../../auth/SignIn';


const SingleMealTable = () => {
  const params = useSearchParams()
  const [loggedInUser] = useContext(UserContext)
  const userEmail = loggedInUser.email;
  const monthName = params.monthName;
  const mealRate = params.mealRate;
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [latestMonth, setLatestMonth] = useState([])

  const headerData = ["Date", "Name","Expense", "Meal Count"]
   
    

    const url = `https://meal-management-server.onrender.com/api/months/allMonths`
    useEffect(()=>{
      setLoading(true);
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setLatestMonth(data[data.length - 1]);
          setLoading(false)
        });
    },[])

    const url2 = `https://meal-management-server.onrender.com/api/meals/userMealInfo?email=${userEmail}&monthName=${monthName}`
    useEffect(()=>{
        setLoading(true);
        const fetchPost = async () => {
        const res = await fetch(url2)
        const data = await res.json();
        setMeals(data.meal);
        setLoading(false)
      }
        fetchPost();
    },[userEmail,monthName])


  
    return (
       <SafeAreaView style={styles.container}>
        
        {
          !userEmail && <SignIn/>
        }
        
        <Stack.Screen
         options={{
          headerStyle : {backgroundColor : "#EA6F6F"},
          headerTitle : "Meal Table"
          }}
        />

          {
            loading ?
            <ActivityIndicator  size='large' color='#EA6F6F' />

          :

            <ScrollView>
              <Text style={{color:"white", fontSize:20, textAlign:'center' , fontWeight:'bold', marginBottom:5}}>Your Meal Table of {monthName}</Text>
            
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

export default SingleMealTable;