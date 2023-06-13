import {SafeAreaView, StyleSheet, Text, TouchableOpacity, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Stack, useRouter, useSearchParams } from 'expo-router';
import { UserContext } from '../../_layout';
import { View } from 'react-native';


const UserList = () => {
  const router = useRouter();
  const [loggedInUser] = useContext(UserContext);
  const params =useSearchParams();
  const monthName = params.monthName;
  console.log(monthName)
  const [allUsers, setAllUsers] = useState([])
  const [singleUser, setSingleUser] = useState([])
  const loggedInUserEmail = loggedInUser.email 

  const url1 = `https://meal-management-server.onrender.com/api/users/allUsers`
  useEffect(()=>{
    fetch(url1)
      .then(res => res.json())
      .then(data => setAllUsers(data))
  },[])

  const url2 = `https://meal-management-server.onrender.com/api/users/allUsers`
  useEffect(()=>{
    fetch(url2)
      .then(res => res.json())
      .then(data => setSingleUser(data.find(user => loggedInUserEmail === user.email)))
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
         options={{
          headerStyle : {backgroundColor : "#EA6F6F"},
          headerTitle : "Member List"
      }}
      />
      <View style={styles.info}>
      <Text style={{color:"white", fontSize:20, textAlign:'center' , fontWeight:'bold', marginTop:15}}>Add Meal and Expense</Text>
          {
          allUsers.map(user =>
            <TouchableOpacity key={user._id} onPress={()=> router.push({ pathname: "../mealForm", params: { monthName: monthName, singleUserEmail:singleUser.email, userName:user.username, userEmail:user.email }})}>
              <View style={{padding:12}}>
                <Text style={{backgroundColor:"#EA6F6F", padding:12, flexDirection: 'column', textAlign: 'center', borderRadius: 3}}>
                  <Text style={{color:"white", fontSize: 16, fontWeight:'bold' }}>Name: {user.username} </Text> {"\n"}
                  <Text style={{color:"white", fontSize: 16, fontWeight:'bold' }}>Email: {user.email} </Text> 
                </Text>
              </View>
            </TouchableOpacity>
            )
          }

      </View>
    
    </SafeAreaView>
   
  )
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor : "#2F2F2F",
  },
  info: {
    width: '100%',
    backgroundColor : "#1F1F1F",
  },

});
export default UserList