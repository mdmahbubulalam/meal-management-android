import { View, Text, TouchableOpacity, FlatList, ScrollView, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import { UserContext } from '../_layout';
import { StyleSheet } from 'react-native';

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
      .then(data => {
        data.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1);
        setAllMonth(data)
      }) 
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.info}>
        <Text style={{color:"white", fontSize:20, textAlign:'center' , fontWeight:'bold', marginTop:15}}>Select Month</Text>
        {
          allMonth.map(month => 
            <TouchableOpacity key={month._id} onPress={() => router.push({ pathname: "../meal/userList/[userList].js", params: { monthName: month.monthName}})}>
              <View style={{padding:12}}>
                <Text style={{backgroundColor:"#EA6F6F", padding:12, flexDirection: 'row', textAlign: 'center', borderRadius: 3}}>
                  <Text style={{color:"white", fontSize: 16, fontWeight:'bold' }}>{month.monthName} </Text> 
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
    justifyContent:'center'
  },
  info: {
    width: '100%',
    backgroundColor : "#1F1F1F",
  },

});

export default month