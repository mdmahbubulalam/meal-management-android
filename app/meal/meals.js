import {Text, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'expo-router';
import { UserContext } from '../_layout';


const meals = () => {
  const [loggedInUser] = useContext(UserContext);
  const params =useSearchParams();
  const monthName = params.monthName;
  const userEmail = loggedInUser.email
  const [allUsers, setAllUsers] = useState([])
  


  const url2 = `https://meal-management-server.onrender.com/api/users/allUsers`
  useEffect(()=>{
    fetch(url2)
      .then(res => res.json())
      .then(data => setAllUsers(data))
  },[])

  return (
    <>
    {
      allUsers.map(user =>
        <Link href={{ pathname: "./mealForm", params: { monthName: monthName, userName:user.username, userEmail:user.email }}}>
        <Text>{user.username}</Text>
        <Text>{user.email}</Text>
      </Link>
        )
    }
    </>
   
  )
}



export default meals