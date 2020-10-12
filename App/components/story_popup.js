import React from 'react';
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class StoryPopup extends React.Component {
	constructor(props){		
		super(props);
		this.state={
			image_url: "https://picsum.photos/id/1/400/400",
			like: "md-heart-empty",
			likes: 0,
		}
	}

	

	componentDidMount(){
		this.setState({
			image_url: "https://picsum.photos/id/" + this.props.image_id + "/400/400",
			like: "md-heart-empty", 
			liked: false,
			likes: Math.floor(Math.random() * 200) + 1 
		})
		this.props.navigation.addListener('willFocus', this.popup())
	};

	


	likeImage = () => {
		const icon = ""
		const prevLike = this.state.likes
		console.log("liked")
		if(this.state.liked){
			this.setState({
				like: "md-heart-empty",
				liked: false,
				likes: prevLike -1
			})
		} else{
			this.setState({
				like: "md-heart",
				liked: true,
				likes: prevLike + 1
			})
		}
		
	}

	


	handleImagePress  = () => {
		const now = new Date().getTime();
	
		if (this.lastImagePress && (now - this.lastImagePress) < 500) {
			delete this.lastImagePress;
			this.handleImageDoublePress();
		}
		else {
			this.lastImagePress = now;
		}
	}

	handleImageDoublePress() {
		this.likeImage()
	}

	render(){
		return (
		<View style={styles.container}>
			<View style={styles.profile}>
			<Image 
			style={styles.profile_img}
			source={{uri: this.props.user_img}} />
			<Text style={{lineHeight:40, marginLeft: 15}}>{this.props.user_name}</Text>
			</View>
			<TouchableWithoutFeedback onPress={this.handleImagePress}>
				<Image 
				style={{
					width: Dimensions.get("window").width, 
					height: Dimensions.get("window").width, 
					borderColor: 'gray', 
					borderWidth: 0.3}}
				source={{uri: this.state.image_url}}/>
			</TouchableWithoutFeedback>
			<View style={styles.liked}>
				<TouchableWithoutFeedback onPress={this.likeImage}>
					<Ionicons style={styles.like} name={this.state.like} size={45} color="red" />
				</TouchableWithoutFeedback>
				<Text style={{lineHeight: 45, marginLeft: 20}}>{this.state.likes} liked this image</Text>
			</View>
		</View>
		);
	} 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
			justifyContent: 'center',
			marginBottom: 40
		},
		like: {
			
		}, 
		profile: {
			flex: 1,
			height: 40,
			alignItems: "flex-start",
			textAlignVertical: "center",
			flexDirection: "row",
			marginBottom: 10,   
		},
		profile_img: {
			width: 40, 
			height: 40, 
			borderRadius: 20,
			marginLeft: 5,
		},
		liked: {
			flex: 1, 
			alignItems: "flex-start",
			flexDirection: "row", 
			height: 45, 
			textAlignVertical: "center", 
			marginLeft: 10, 
			marginTop: 10,

		},
  });