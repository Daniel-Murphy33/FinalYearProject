import React from 'react'
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native'
import FitnessCards from '../../components/FitnessCards';

const HomeScreen = () => {
    return(
        <ScrollView style={styles.container}>
           <View style={styles.headerBlockWrapper}>
               <View style={styles.headerBlock}>
                   <View style={{width:"50%"}}>
                        <Text style={styles.headerText}>Welcome Daniel</Text>
                   </View>
                   <View style={{width:"50%",alignItems:"flex-end"}}>
                      <Image source={require('../../assets/logo-no-bg.jpg')} style={{height:60,width:90}} />
                   </View>
               </View>
               <Image style={styles.headerImage} source={require('../../assets/Home1.jpg')} />
            <FitnessCards style={{marginTop:20}}/>
           </View>
        </ScrollView>
    )
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    marginTop:45
  }, 
  headerBlockWrapper: {
    backgroundColor:"#4682B4",
    height:"28%",
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    paddingHorizontal:20
  },
  headerBlock: {
    flexDirection:"row",
    alignItems:"center",
    marginTop:25,
    width:"100%"
  },
  headerText: {
    fontSize:28,
    color:"#FFF",
    fontWeight:"bold"
  },
  headerImage: {
    width: 320,
    height: 130,
    marginTop: 25,
    borderRadius: 15,
    alignSelf:'center',
    
  },
})