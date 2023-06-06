import { SafeAreaView} from 'react-native';
import SignIn from './auth/signIn';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './_layout';
import Home from './(tabs)/home';
import { Redirect } from 'expo-router';


const Welcome = () => {
  const [loggedInUser,setLoggedInUser] = useContext(UserContext)
  const userEmail = loggedInUser.email
  if (!userEmail) {
      console.log("Not logged in")
  }
  
  return (
    <SafeAreaView style={{flex:1}}>
      {
        !loggedInUser.email && <SignIn/>
      }
        
    </SafeAreaView> 
  )
}



export default Welcome