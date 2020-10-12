import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Alert} from 'react-native';
import Story from  './components/story.js'


export default class Popup extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      profiles: [], 
      images: [],
      popup: false
    }
  }

  setContent(){
    const story = []
    for(let i = 327; i < 436 ; i++){
      var index = i-326
      if(this.state.profiles[index] != null){
          story.push({
            id: index, 
            item: <Story key={i} image_id={i} user_name={this.state.profiles[index].login.username} user_img={this.state.profiles[index].picture.thumbnail}/>
          })
          
    }
    }
    return story; 
  }

  popup = (e) => {
    const scroll = e.nativeEvent.contentOffset.y
    if(!this.state.popup & scroll >= 7600 & scroll <= 7700){
      Alert.alert("Just a little reminder", "You have now seen 15 images")
      this.setState({
        popup:true
      })
    }
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
          showsVerticalScrollIndicator={false}
          onScroll={this.popup}
          scrollEventThrottle={16}>
          {this.setContent().map(story => {
              return story.item
          }) }
        </ScrollView>
     
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    //flex: 1
  },
  
});
