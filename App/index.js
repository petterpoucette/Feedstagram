import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import Base from  './base.js'
import Indicator from  './indicator.js'
import Pages from  './pages.js'
import Popup from  './popup.js'

export default class App extends React.Component {

    constructor(props){
      super(props)
      this.state = {
          view: "start"
      }
    }

    start(){
        return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <TouchableOpacity style={{margin: 30}} onPress={() => this.setState({view: "base"})}>
                <Text>Base</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{margin: 30}} onPress={() => this.setState({view: "indicator"})}>
                <Text>Indicator</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{margin: 30}} onPress={() => this.setState({view: "pages"})}>
                <Text>Pages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{margin: 30}} onPress={() => this.setState({view: "popup"})}>
                <Text>Popup</Text>
            </TouchableOpacity>
        </View>
        ) 
    }



    changeView(name){
        this.setState=({
            view: name
        })
    }
  
    render(){
      return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => this.setState({view: "start"})}>
                    <Text style={{textAlign: "center", fontSize: 20}}>Feedstagram</Text>
                </TouchableOpacity>
            </View>
          {
            (this.state.view == "start")?this.start():null 
          }
          {
            (this.state.view == "base")?<Base/>:null 
          }
          {
            (this.state.view == "indicator")?<Indicator/>:null 
          }
          {
            (this.state.view == "pages")?<Pages/>:null 
          }
           {
            (this.state.view == "popup")?<Popup/>:null 
          }
         </SafeAreaView>
          
      );
    } 
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1, 

        alignItems: "center",
    },
    header: {
        backgroundColor: '#FEFEFE', 
        width: Dimensions.get("window").width,
        height: 60, 
        alignContent: 'center', 
        justifyContent: 'center',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.2,
      }
  });