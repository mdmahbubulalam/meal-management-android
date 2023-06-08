import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../_layout'
import { MaterialIcons } from '@expo/vector-icons'; 


const Home = () => {
  const [loggedInUser] = useContext(UserContext)
  const userEmail = loggedInUser.email;

  const [latestMonth, setLatestMonth] = useState([])

  const [meals, setMeals] = useState([]);
  const [expense, setExpense] = useState([]);
    const initialValue = 0;
    const totalExpense = parseFloat(expense.reduce((accumulator, currentValue) => accumulator + currentValue.expenses, initialValue));
    const totalMealCount = meals.reduce((accumulator, currentValue) => accumulator + currentValue.mealCount, initialValue);
    const mealRate = totalExpense/totalMealCount;

    console.log(totalExpense)

  console.log('email', userEmail)

  const url = `https://meal-management-server.onrender.com/api/months/allMonths`
  useEffect(()=>{
    fetch(url)
      .then(res => res.json())
      .then(data => setLatestMonth(data[0])) 
  },[])

  const url2 = `https://meal-management-server.onrender.com/api/meals/allMeals`
  useEffect(()=>{
    fetch(url2)
      .then(res => res.json())
      .then(data => setMeals(data)) 
  },[])

  const url3 = `https://meal-management-server.onrender.com/api/expense/allExpense`
  useEffect(()=>{
    fetch(url3)
      .then(res => res.json())
      .then(data => setExpense(data)) 
  },[])
 
console.log('sss',userEmail)

  return (
    <SafeAreaView>
      
      <ScrollView >
        
         {
          userEmail && 
            <View style={styles.container}>
              <View style={styles.summery}>
                <View style={{flexDirection:'row', alignItems:'center', paddingBottom: 15}}>
                  <MaterialIcons name="dashboard" size={24} color="white" />
                  <Text style={{color:"white", fontSize:25, paddingLeft: 5, fontWeight:'bold'}}>Summery of {latestMonth.monthName}</Text>
                </View>
                
                <View style={{flexDirection:'row', alignItems:'center', paddingBottom: 5}}>
                  <MaterialIcons name="set-meal" size={24} color="white"/>
                  <Text style={{color:'white',paddingLeft: 5, fontSize:18, fontWeight:'bold'}}>Total Meal : {totalMealCount}
                  </Text>
                </View>

                <View style={{flexDirection:'row', alignItems:'center', paddingBottom: 5}}>
                  <MaterialIcons name="account-balance" size={24} color="white"/>
                  <Text style={{color:'white',paddingLeft: 5, fontSize:18, fontWeight:'bold'}}>Total Expense : {totalExpense} Taka</Text>
                </View>

                <View style={{flexDirection:'row', alignItems:'center', paddingBottom: 5}}>
                  <MaterialIcons name="rate-review" size={24} color="white"/>
                  <Text style={{color:'white', paddingLeft: 5, fontSize:18, fontWeight:'bold'}}>Meal Rate: {mealRate}</Text>
                </View>
              </View>

              <View style={styles.info}>
                <Text style={{color:"#FD5A55", fontSize:20, textAlign:'center' , fontWeight:'bold', marginTop:15}}>Meal info</Text>
                
                <View style={{borderBottomColor:'#EA6F6F', borderBottomWidth: 1, marginTop:15}}></View>
                
                <Text style={{color:"white", fontSize:18, textAlign:'center' , fontWeight:'bold', marginTop:15}}>Mahbubul Alam</Text>
                <View style={{flexDirection:'row',justifyContent:'center', paddingTop:10, paddingBottom:10}}>
                  <View style={styles.circle}>
                    <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>Meal</Text>
                    <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>24</Text>
                  </View>
                  
                  <View style={styles.circle}>
                  <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>Cost</Text>
                    <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>2487</Text>
                  </View>
                  <View style={styles.circle}>
                  <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>Taka</Text>
                    <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>2400</Text>
                  </View>
                  <View style={styles.circle}>
                  <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>Give</Text>
                    <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>1234</Text>
                  </View>
                </View>

          
                
                <View style={{borderBottomColor:'#EA6F6F', borderBottomWidth: 1, marginTop:15}}></View>
                
                <Text style={{color:"white", fontSize:18, textAlign:'center' , fontWeight:'bold', marginTop:15}}>Mahbubul Alam</Text>
                <View style={{flexDirection:'row',justifyContent:'center', paddingTop:10, paddingBottom:10}}>
                  <View style={styles.circle}>
                    <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>Meal</Text>
                    <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>24</Text>
                  </View>
                  
                  <View style={styles.circle}>
                  <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>Cost</Text>
                    <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>2487</Text>
                  </View>
                  <View style={styles.circle}>
                  <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>Taka</Text>
                    <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>2400</Text>
                  </View>
                  <View style={styles.circle}>
                  <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>Give</Text>
                    <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>1234</Text>
                  </View>
                </View>

                
                
                <View style={{borderBottomColor:'#EA6F6F', borderBottomWidth: 1, marginTop:15}}></View>
                
                <Text style={{color:"white", fontSize:18, textAlign:'center' , fontWeight:'bold', marginTop:15}}>Mahbubul Alam</Text>
                <View style={{flexDirection:'row',justifyContent:'center', paddingTop:10, paddingBottom:10}}>
                  <View style={styles.circle}>
                    <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>Meal</Text>
                    <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>24</Text>
                  </View>
                  
                  <View style={styles.circle}>
                  <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>Cost</Text>
                    <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>2487</Text>
                  </View>
                  <View style={styles.circle}>
                  <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>Taka</Text>
                    <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>2400</Text>
                  </View>
                  <View style={styles.circle}>
                  <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>Give</Text>
                    <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>1234</Text>
                  </View>
                </View>
                
              </View>
            </View>
         }
      </ScrollView>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor : "#2F2F2F",
  },
  summery: {
    width: '100%',
    padding: 15,
    
  },


  info: {
    width: '100%',
    backgroundColor : "#1F1F1F",
  },

  circle : {
    height:90,
    width:90,
    borderColor : '#EA6F6F',
    borderRadius:45,
    borderWidth:2,
    margin:2,
    justifyContent:'center'
  }
});

export default Home