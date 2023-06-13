import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native-web';

const MonthList = ({allMonth, mealRate}) => {
  const router = useRouter();
  return (
    <View style={styles.info}>
      <View style={{borderBottomColor:'#EA6F6F', borderBottomWidth: 1, }}></View>
      <Text style={{color:"white", fontSize:20, textAlign:'center' , fontWeight:'bold', marginTop:15}}>Monthly Meal Info</Text>
      {
        allMonth.map(month =>
          <TouchableOpacity key={month._id} onPress={() => router.push({ pathname: "../meal/summery/[summery].js", params: { monthName: month.monthName, mealRate: mealRate }})} >
            <View style={{padding:12}}>
              <Text style={{backgroundColor:"#EA6F6F", padding:12, flexDirection: 'row', textAlign: 'center', borderRadius: 3}}>
                <Text style={{color:"white", fontSize: 16, fontWeight:'bold' }}>{month.monthName} </Text> 
              </Text>
            </View>
          </TouchableOpacity> 
          )
      }
    </View>
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

export default MonthList