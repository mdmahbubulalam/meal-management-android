import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../_layout'
import { Stack } from 'expo-router';

const Home = () => {
  const [loggedInUser] = useContext(UserContext);
  const [user, setUser] = useState([])

  const url = `https://meal-management-server.onrender.com/api/users/allUsers`
  useEffect(()=>{
    fetch(url)
      .then(res => res.json())
      .then(data =>{
        setUser(data.filter(user => user.email === loggedInUser.email))
      }) 
  },[])

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle : {backgroundColor : 'green'},
          headerShadowVisible : false,
          headerTitle : "Home"
        }}
      />
      <ScrollView>
        <View>
          <Text>{loggedInUser.email}</Text>
          <Text>{user?.email}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
    
  )
}

export default Home