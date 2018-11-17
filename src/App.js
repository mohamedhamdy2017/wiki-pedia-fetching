import React, { Component } from 'react';
import {
  View, FlatList, Text
} from 'react-native';
import { SearchBar } from 'react-native-elements';


export default class App extends Component{
    state={
        data: [],
        loadingIcon: false
    }

    onTyping = (search) => {
        fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${search}`)
        .then(response => response.json())
        .then(result => this.setState({
            data: result[1]
        }))
    }
    

    renderItem = ({item, index}) => {
        <View key={index}>  
            <Text>{item}</Text>
        </View>
    }



  render() {
    return (
      <View >
            <SearchBar
                lightTheme
                round
                onChangeText={(search) => {this.onTyping(search)}}
                placeholder='Type Here...' 
                showLoadingIcon = {false}
                />
           <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item}
            />
      </View>
    );
  }
}

