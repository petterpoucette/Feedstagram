import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions} from 'react-native';
import Story from  './components/story.js'

export default class Base extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      profiles: []
    }
  }

  setContent(){
    const story = []
    for(let i = 1; i < 109 ; i++){
      if(this.state.profiles[i] != null){
      story.push(
        <Story key={i} image_id={i} user_name={this.state.profiles[i].login.username} user_img={this.state.profiles[i].picture.thumbnail}/> 
      )
    }
    }
    return story; 
  }

getProfile(){
    fetch("https://randomuser.me/api/?results=110&inc=login,picture")
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          profiles: responseJson.results
        })
    })
      .catch(error=>console.log(error)) //to catch the errors if any
  }

  componentWillMount(){
    this.getProfile()
  }

  render(){
    return (
     
        
        <ScrollView 
          contentContainerStyle={{paddingBottom: 20, paddingTop: 20, width: '100%', alignItems: 'center'}}
          showsVerticalScrollIndicator={false}>
          {this.setContent()}
        </ScrollView>
     
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    //flex: 1
  },
  
});
