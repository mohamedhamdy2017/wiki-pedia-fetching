import React, { Component } from 'react';
import {
  View, FlatList, Text
} from 'react-native';
import { SearchBar } from 'react-native-elements';


export default class App extends Component{
    state={
        data: [],
        query: '',
        loadingIcon: false
    }

    onTyping = (search) => {
        fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${search}`)
        .then(response => response.json())
        .then(result => this.setState({
            data: result[0]
        }))
    }

    renderItem = ({item}) => {
        <View>
            <Text>{item}</Text>
        </View>
    }



  render() {
    return (
      <View >
            <SearchBar
                lightTheme
                round
                onChangeText ={(search) => this.onTyping({search})}
                placeholder='Type Here...' 
                showLoadingIcon = {false}
                />
           <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            />
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
