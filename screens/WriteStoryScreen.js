import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ToastAndroid} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Header} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class WriteStoryScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            author: '',
            story: '',
        }
    }

    submitStory = () => {
        db.collection("stories").add({
            'title': this.state.title,
            'author': this.state.author,
            'story': this.state.story,
            'date': firebase.firestore.Timestamp.now().toDate()
        });
        this.setState({
            title: '',
            author: '',
            story: ''
        });
        ToastAndroid.show("Your story has been submitted", ToastAndroid.SHORT);
    }

    render(){
        return(
            <KeyboardAvoidingView style = {styles.container} behavior = "padding" enabled>
                <Header
                   backgroundColor = {'pink'}
                   centerComponent = {{
                       text: 'Bed Time Stories',
                       style: {color: 'black', fontSize: 20, fontFamily: 'cursive'}
                   }}
                />
                <TextInput
                   placeholder = "Story Title" placeholderTextColor='black'
                   onChangeText = {(text) => {
                       this.setState({title: text})
                   }}
                   value = {this.state.title}
                   style = {styles.title}
                  
                />

                <TextInput
                   placeholder = "Author" placeholderTextColor='black'
                   onChangeText = {(text) => {
                       this.setState({author: text})
                   }}
                   value = {this.state.author}
                   style = {styles.author}
                   
                />

                <TextInput
                   placeholder = "Write your story"
                   placeholderTextColor='black'
                   onChangeText = {(text) => {
                       this.setState({story: text})
                   }}
                   value = {this.state.story}
                   style = {styles.storyy}
                   multiline = {true}
                />

                <TouchableOpacity 
                    style = {styles.submitButton}
                    onPress = {this.submitStory}
                >
                    <Text style = {styles.buttonText}>Submit</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        height: 40,
        borderWidth: 2,
        margin: 10,
        marginTop: 35,
        color: 'black',
        padding: 6,
    },
    author: {
        height: 40,
        borderWidth: 2,
        margin: 10,
        padding: 6,
    },
    storyy: {
        height: 250,
        borderWidth: 2,
        margin: 10,
        padding: 6,
    },
    submitButton: {
        justifyContent: 'center',
        width: 75,
        height: 35,
        backgroundColor: 'pink',
        alignSelf: 'center',
        color: 'black',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        color: 'black',
    },
});