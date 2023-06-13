import { View, Text, ScrollView, StyleSheet} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 


const Dashboard = ({
    userEmail,
    latestMonth,
    totalMealCount,
    totalExpense,
    mealRate,
    singleUserMealCount,
    singleUserExpense,
    totalTaka,
    giveOrTake

}) => {

  return (
        <ScrollView >
        {
            userEmail &&
            <View style={styles.container}>
             <View style={styles.summery}>
               <View style={{flexDirection:'row', alignItems:'center', paddingBottom: 15}}>
                 <MaterialIcons name="dashboard" size={24} color="white" />
                 <Text style={{color:"white", fontSize:25, paddingLeft: 5, fontWeight:'bold'}}>Summery of  {latestMonth.monthName}</Text>
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
             
               
               <View style={{borderBottomColor:'#EA6F6F', borderBottomWidth: 1, }}></View>

           
               <View style={styles.info}>
               <Text style={{color:"white", fontSize:20, textAlign:'center' , fontWeight:'bold'}}>Your Current Month Meal info</Text>
               {/* <Text style={{color:"white", fontSize:18, textAlign:'center' , fontWeight:'bold', marginTop:15}}></Text> */}
               <View style={{flexDirection:'row',justifyContent:'center', paddingTop:10, paddingBottom:10}}>
                 <View style={styles.circle}>
                   <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>Meal</Text>
                   <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>{singleUserMealCount}</Text>
                 </View>
                 
                 <View style={styles.circle}>
                 <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>Cost</Text>
                   <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>{singleUserExpense}</Text>
                 </View>
                 <View style={styles.circle}>
                 <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>Taka</Text>
                   <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>{totalTaka}</Text>
                 </View>
                 <View style={styles.circle}>
                 <Text style={{color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>{giveOrTake<0 ? "Give" : "Take"}</Text>
                   <Text style={{ color:'white', alignSelf:'center', fontWeight:'bold', fontSize:18}}>{giveOrTake}</Text>
                 </View>
               </View>         
             </View>
             
           </View>
        }
           
       
     </ScrollView>
        
      
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
      paddingTop : 10,
      paddingBottom:10    
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

export default Dashboard