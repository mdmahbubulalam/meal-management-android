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
      
      <ScrollView>
        <View>
          <Text>{loggedInUser.email}</Text>
          <Text>{user[0]?.username}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
    
  )
}

export default Home