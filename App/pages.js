import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import Story from  './components/story.js'

export default class Pages extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      profiles: [],
      imageCount: 15,
      loadedImages: []
    }
  }

  setContent(){
    const story = []
    const temp = []
    for(let i = 218; i < 327  ; i++){
        var index = i-217
        if(this.state.profiles[index] != null){
            story.push({
                id: index, 
                item: <Story key={i} image_id={i} user_name={this.state.profiles[index].login.username} user_img={this.state.profiles[index].picture.thumbnail}/>
            })
        }
    }
    return story
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

  componentDidMount(){
      this.setContent()
  }

  render(){
    return (
     
        
        <ScrollView 
          contentContainerStyle={{paddingBottom: 20, paddingTop: 20, width: '100%', alignItems: 'center'}}
          showsVerticalScrollIndicator={false}>
          {this.setContent().map(story => {
              if(story.id <= this.state.imageCount){
                return story.item
              }
              
          }) }
            <TouchableOpacity
            style={{backgroundColor: "darkslategrey", marginBottom: 20, paddingBottom: 10, paddingTop: 17, paddingLeft: 30, paddingRight: 30,  borderRadius: 5}}
            onPress={() => this.setState(prevState => ({ imageCount: prevState.imageCount + 15 }))}
            >
              <Text style={{fontSize: 20, color: "white", marginBottom: 10 }}>Press to load more</Text>
            </TouchableOpacity>
        </ScrollView>
     
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    //flex: 1
  },
  
});
