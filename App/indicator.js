import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, LayoutAnimation} from 'react-native';
import Story from  './components/story.js'

export default class Indicator extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        width: 0, 
        profiles: []
    }
  }

  setContent(){
    const story = []
    for(let i = 109; i < 218  ; i++){
        var index = i-108
      if(this.state.profiles[index] != null){

      story.push(
        <Story key={i} image_id={i} user_name={this.state.profiles[index].login.username} user_img={this.state.profiles[index].picture.thumbnail}/> 
      )
    }
    }
    return story; 
  }

handelScroll = () => {
    //console.log(event.nativeEvent.contentOffset.y);
    console.log(this.state.width)
    if(this.state.width >= Dimensions.get("window").width){
        setTimeout(()=> {
            LayoutAnimation.linear()
            this.setState(prevState => ({ width: 0 }))
        })
    }else{
        setTimeout(()=> {
            LayoutAnimation.linear()
            this.setState(prevState => ({ width: prevState.width + 10 }))
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
        <View>
        <View style={{backgroundColor: "darkslategrey", width:this.state.width, height: 10, marginTop: -10}} />
        <ScrollView 
          contentContainerStyle={{paddingBottom: 20, paddingTop: 20, width: '100%', alignItems: 'center'}}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={this.handelScroll}
          scrollEventThrottle={50}>
          {this.setContent()}
        </ScrollView>
        </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    //flex: 1
  },
  
});
