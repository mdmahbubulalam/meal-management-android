import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Stack, useRouter, useSearchParams } from 'expo-router';
import { UserContext } from '../../_layout';
import { View } from 'react-native';
import SignIn from '../../auth/SignIn';


const UserList = () => {
  const router = useRouter();
  const [loggedInUser] = useContext(UserContext);
  const params =useSearchParams();
  const monthName = params.monthName;
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading] = useState(false);
  const [singleUser, setSingleUser] = useState([])
  const loggedInUserEmail = loggedInUser.email 

  const url1 = `https://meal-management-server.onrender.com/api/users/allUsers`
  useEffect(()=>{
    setLoading(true)
    fetch(url1)
      .then(res => res.json())
      .then(data => {
        setAllUsers(data);
        setLoading(false)
      })
  },[])

  const url2 = `https://meal-management-server.onrender.com/api/users/allUsers`
  useEffect(()=>{
    setLoading(true)
    fetch(url2)
      .then(res => res.json())
      .then(data => {
        setSingleUser(data.find(user => loggedInUserEmail === user.email))
        setLoading(false)
      })
  },[])

  return (
    <SafeAreaView style={styles.container}>
      {
        !loggedInUserEmail && <SignIn/>
      }
      <Stack.Screen
         options={{
          headerStyle : {backgroundColor : "#EA6F6F"},
          headerTitle : "Member List"
      }}
      />
      {
        loading ?
        <ActivityIndicator  size='large' color='#EA6F6F' />

        :
        <ScrollView style={styles.info}>
          <Text style={{color:"white", fontSize:20, textAlign:'center' , fontWeight:'bold', marginTop:15}}>Select Member</Text>
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
        </ScrollView>
      }
      
    
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