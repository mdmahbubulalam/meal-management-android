import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import React, { useContext, useEffect, useState } from 'react'
import { Stack, useSearchParams } from 'expo-router';
import { UserContext } from '../../_layout';

const Summery = () => {
    const params =useSearchParams();
    const monthName = params.monthName;
    const mealRate = params.mealRate;
    const [loggedInUser] = useContext(UserContext);
    const userEmail = loggedInUser.email
    const [individualMeals, setIndividualMeals] = useState([]);
    const url = `https://meal-management-server.onrender.com/api/meals/userMealInfo?email=${userEmail}&monthName=${monthName}`
    useEffect(()=>{
        const fetchPost = async () => {
        const res = await fetch(url)
        const data = await res.json();
        setIndividualMeals(data.meal);
        }
        fetchPost();
    },[userEmail,monthName])

    
    const initialValue = 0;
    const singleUserExpense = individualMeals?.reduce((accumulator, currentValue) => accumulator + currentValue.expense, initialValue);
    const singleUserMealCount = individualMeals?.reduce((accumulator, currentValue) => accumulator + currentValue.mealCount, initialValue);
    const totalTaka = singleUserMealCount * mealRate;
    const giveOrTake = singleUserExpense-totalTaka;

   

  return (
    <SafeAreaView style={styles.container}>
       <Stack.Screen
         options={{
          headerStyle : {backgroundColor : "#EA6F6F"},
          headerTitle : "Summery"
      }}
      />
        {
            userEmail &&
            <View style={styles.info}>
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
      justifyContent: 'center',
    },
  
  
    info: {
      width: '100%',
      backgroundColor : "#1F1F1F",
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