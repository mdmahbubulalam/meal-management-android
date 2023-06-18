import { View, Text, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import React, { useContext, useEffect, useState } from 'react'
import { Stack, useSearchParams } from 'expo-router';
import { UserContext } from '../../_layout';
import SignIn from '../../auth/SignIn';

const Summery = () => {
    const params =useSearchParams();
    const monthName = params.monthName;
    const [loggedInUser] = useContext(UserContext);
    const userEmail = loggedInUser.email
    const [individualMeals, setIndividualMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);

    const initialValue = 0;
    const totalExpense = meals.reduce((accumulator, currentValue) => accumulator + currentValue.expense, initialValue);
    const totalMealCount = meals.reduce((accumulator, currentValue) => accumulator + currentValue.mealCount, initialValue);
    const singleUserExpense = individualMeals?.reduce((accumulator, currentValue) => accumulator + currentValue.expense, initialValue);
    const singleUserMealCount = individualMeals?.reduce((accumulator, currentValue) => accumulator + currentValue.mealCount, initialValue);
    const mealRate = totalExpense/totalMealCount;
    const totalTaka = Math.round(singleUserMealCount * mealRate);
    const giveOrTake = Math.round(singleUserExpense-totalTaka);

    const url = `https://meal-management-server.onrender.com/api/meals/userMealInfo?email=${userEmail}&monthName=${monthName}`
    useEffect(()=>{
      setLoading(true);
      const fetchPost = async () => {
        const res = await fetch(url)
        const data = await res.json();
        setIndividualMeals(data.meal);
        setLoading(false)
      }
      fetchPost();
    },[userEmail,monthName])

    const url2 = `https://meal-management-server.onrender.com/api/meals/currentMonthMealInfo?monthName=${monthName}`
    useEffect(()=>{
      setLoading(true);
      const fetchPost = async () => {
        const res = await fetch(url2)
        const data = await res.json();
        setMeals(data.meal);
        setLoading(false)
      }
      fetchPost();
    },[monthName])
    
   

   

  return (
    <SafeAreaView style={styles.container}>
      {
        !userEmail && <SignIn/>
      }
       <Stack.Screen
         options={{
          headerStyle : {backgroundColor : "#EA6F6F"},
          headerTitle : "Summery"
      }}
      />
        {
          loading ?
            <ActivityIndicator  size='large' color='#EA6F6F' />

          :
            userEmail &&
            <View style={styles.info}>
              <View style={styles.summery}>
               <View style={{flexDirection:'row', alignItems:'center', paddingBottom: 15}}>
                 <MaterialIcons name="dashboard" size={24} color="white" />
                 <Text style={{color:"white", fontSize:25, paddingLeft: 5, fontWeight:'bold'}}>Summery of  {monthName}</Text>
               </View>
               
               <View style={{flexDirection:'row', alignItems:'center', paddingBottom: 5}}>
                 <MaterialIcons name="set-meal" size={24} color="white"/>
                 <Text style={{color:'white',paddingLeft: 5, fontSize:18, fontWeight:'bold'}}>Total Meal : {totalMealCount}
                 </Text>
               </View>

               <View style={{flexDirection:'row', alignItems:'center', paddingBottom: 5}}>
                 <MaterialIcons name="account-balance" size={24} color="white"/>
                 <Text style={{color:'white',paddingLeft: 5, fontSize:18, fontWeight:'bold'}}>Total Expense : {totalExpense} Taka</Text>
               </View>

               <View style={{flexDirection:'row', alignItems:'center', paddingBottom: 5}}>
                 <MaterialIcons name="rate-review" size={24} color="white"/>
                 <Text style={{color:'white', paddingLeft: 5, fontSize:18, fontWeight:'bold'}}>Meal Rate: {mealRate}</Text>
               </View>
             </View>
             <View style={{borderBottomColor:'#EA6F6F', borderBottomWidth: 1, }}></View>

             <Text style={{color:"white", fontSize:20, textAlign:'center' , fontWeight:'bold', marginTop:15}}>Your Meal info of {monthName}</Text>
               <View style={{borderBottomColor:'#EA6F6F', borderBottomWidth: 1, marginTop:15}}></View>
               <Text style={{color:"white", fontSize:18, textAlign:'center' , fontWeight:'bold'}}></Text>
               <View style={{flexDirection:'row',justifyContent:'center', paddingBottom:10}}>
                 <View style={styles.circle}>
                   <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>Meal</Text>
                   <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>{singleUserMealCount}</Text>
                 </View>
                 
                 <View style={styles.circle}>
                    <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>Cost</Text>
                    <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>{singleUserExpense}</Text>
                 </View>

                 <View style={styles.circle}>
                    <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>Taka</Text>
                    <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>{totalTaka}</Text>
                 </View>

                 <View style={styles.circle}>
                    <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>{giveOrTake<0 ? "Give" : "Take"}</Text>
                    <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>{giveOrTake}</Text>
                 </View>
               </View>         
           </View>
        }
     
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor : "#2F2F2F",
    },
  
  
    info: {
      width: '100%',
      backgroundColor : "#1F1F1F",
    },

    summery: {
      width: '100%',
      padding: 15,
      backgroundColor : "#2F2F2F",
    },
  
    circle : {
      height:90,
      width:90,
      borderColor : '#EA6F6F',
      borderRadius:45,
      borderWidth:2,
      margin:2,
      justifyContent:'center'
    }
  });

export default Summery