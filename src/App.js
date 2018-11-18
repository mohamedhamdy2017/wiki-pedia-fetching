import React, { Component } from 'react'
import { FlatList, Text, View, TouchableOpacity, ActivityIndicator, Linking } from 'react-native'
// Styles
import { CardItem, Body } from 'native-base'
import { SearchBar } from 'react-native-elements'

export default class LaunchScreen extends Component {
    
    state = {
        data: [],
        discription: [],
        Link: null,
        loading: false
    }
    
    onTyping = (search) => {
        fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${search}`)
            .then(response => response.json())
            .then(result => this.setState({
                loading: true,
                data: result[1],
                discription: result[2],
                Link: result[3],
                loading: false
            }))
    }
   
    
    renderItem = ({item}) => (
            <CardItem >
              <Body style={{backgroundColor: '#eee', borderWidth:0.4}} >
              <Text style={{margin: 10, fontWeight: 'bold'}}>{item}</Text>
                <TouchableOpacity onPress ={() => Linking.openURL(this.state.Link)}>
                    <Text style={{margin: 10}}>{this.state.discription}</Text>
                </TouchableOpacity>
              </Body>
            </CardItem>    
    )
    
    render () {
        const{loading} = this.state;
        return (
            <View>
                <SearchBar 
                    round
                    lightTheme
                    placeholder="Type Here..."
                    onChangeText={this.onTyping}
                />
                {loading? 
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <ActivityIndicator size="large" color={'#9bfb8c'} />
                </View>:
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item}
                />
            }
            </View>
        )
    }
}
