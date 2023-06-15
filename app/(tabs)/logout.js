import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../_layout'
import { useRouter } from 'expo-router'

const logout = () => {
    const router = useRouter()
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)

    useEffect(() => {
        setLoggedInUser('')
        router.push('/')
      }, []);
    
}

export default logout