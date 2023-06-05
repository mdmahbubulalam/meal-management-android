import { View, Text, SafeAreaView } from 'react-native'
import { Tabs } from "expo-router";

const HomeLayout = () => {
  return (
    
    <Tabs>
      <Tabs.Screen name="home"/>
      <Tabs.Screen name="month"/>
    </Tabs>
    
  )
}

export default HomeLayout