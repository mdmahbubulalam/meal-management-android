import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import { UserContext } from '../_layout';

const month = () => {
  const router = useRouter();
  const [allMonth, setAllMonth] = useState([])
  const [loggedInUser] = useContext(UserContext);
  const userEmail = loggedInUser.email

  console.log('email', userEmail)

  const url = `https://meal-management-server.onrender.com/api/months/allMonths`
  useEffect(()=>{
    fetch(url)
      .then(res => res.json())
      .then(data => setAllMonth(data)) 
  },[])
  return (
    <View>
      <FlatList
            data={allMonth}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => router.push(`meal/${item.monthName}`)}>
                  <View style={{padding:12}}>
                    <Text style={{backgroundColor:"white", padding:12, flexDirection: 'row', textAlign: 'justify', borderRadius: 3}}>
                      <Text style={{color:"gray", fontSize: 16, fontWeight:'bold' }}>{item.monthName} </Text> 
                    </Text>
                  </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ columnGap: 16}}
          /> 
    </View>
  )
}

export default month