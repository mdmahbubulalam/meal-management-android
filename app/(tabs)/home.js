import { View, SafeAreaView, ScrollView, StyleSheet} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../_layout'

import MonthList from '../components/MonthList';
import Dashboard from '../components/Dashboard';


const Home = () => {
  
  const [loggedInUser] = useContext(UserContext)
  const userEmail = loggedInUser.email;
  const [latestMonth, setLatestMonth] = useState([])
  const [allMonth, setAllMonth] = useState([])
  const [meals, setMeals] = useState([]);
  const [individualMeals, setIndividualMeals] = useState([]);
  
  const monthName = latestMonth.monthName;
    
    const initialValue = 0;
    const totalExpense = meals.reduce((accumulator, currentValue) => accumulator + currentValue.expense, initialValue);
    const totalMealCount = meals.reduce((accumulator, currentValue) => accumulator + currentValue.mealCount, initialValue);
    const singleUserExpense = individualMeals?.reduce((accumulator, currentValue) => accumulator + currentValue.expense, initialValue);
    const singleUserMealCount = individualMeals?.reduce((accumulator, currentValue) => accumulator + currentValue.mealCount, initialValue);
    const mealRate = Math.round(totalExpense/totalMealCount);
    const totalTaka = Math.round(singleUserMealCount * mealRate);
    const giveOrTake = Math.round(singleUserExpense-totalTaka);


  const url = `https://meal-management-server.onrender.com/api/months/allMonths`
  useEffect(()=>{
    fetch(url)
      .then(res => res.json())
      .then(data => setLatestMonth(data[data.length - 1]));
  },[])

  useEffect(()=>{
    fetch(url)
      .then(res => res.json())
      .then(data => {
        data.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1);
        data.slice(0, 4);
        setAllMonth(data)
      });
  },[])




  const url2 = `https://meal-management-server.onrender.com/api/meals/userMealInfo?email=${userEmail}&monthName=${monthName}`
    useEffect(()=>{
        const fetchPost = async () => {
        const res = await fetch(url2)
        const data = await res.json();
        setIndividualMeals(data.meal);
        }
        fetchPost();
    },[userEmail,monthName])

  const url3 = `https://meal-management-server.onrender.com/api/meals/currentMonthMealInfo?monthName=${monthName}`
  useEffect(()=>{
    const fetchPost = async () => {
      const res = await fetch(url3)
      const data = await res.json();
      setMeals(data.meal);
      }
      fetchPost();
  },[monthName])

  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View>
          <Dashboard
            userEmail={userEmail}
            latestMonth={latestMonth}
            totalMealCount={totalMealCount}
            totalExpense={totalExpense}
            mealRate={mealRate}
            singleUserMealCount={singleUserMealCount}
            singleUserExpense={singleUserExpense}
            totalTaka={totalTaka}
            giveOrTake={giveOrTake}
          />
          <MonthList
            allMonth={allMonth}
            mealRate={mealRate}
          />
      </View>
    </ScrollView>
      
  </SafeAreaView>
    
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

export default Home