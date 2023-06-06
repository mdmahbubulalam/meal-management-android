import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../_layout'
import { Stack } from 'expo-router';

const Home = () => {
  const [loggedInUser] = useContext(UserContext)
  const userEmail = loggedInUser.email
 
console.log('sss',userEmail)

  return (
    <SafeAreaView>
      
      <ScrollView>
        
         {
          userEmail && 
          
            <View>
              <Text>
             asaSasASas
              </Text>
            </View>
          
         }
      </ScrollView>
    </SafeAreaView>
    
  )
}

export default Home