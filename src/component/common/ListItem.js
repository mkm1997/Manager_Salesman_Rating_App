import React,{Component} from 'react';
import {View,Text,Image} from 'react-native';
import {Card} from 'react-native-elements';
import {CardItem,Spinner} from "../common";

class ListItem extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const {titleStyle} = styles;
        let li = this.props.data;
        console.log("ouuu houuuuuuu"+li.salesman);

        console.log("Ouuuu list view me ");
        // console.log("in list view"+this.props);

        console.log("hello"+this.props.data.image);


        return (


            <Card>
                <CardItem>
                <Text style = {titleStyle}>
                    {this.props.data.salesman}
                </Text>
                </CardItem>
                <CardItem>

                <Image
                    style={{width: 300, height: 100}}
                    source={{uri:this.props.data.image}}
                />
                </CardItem>
            </Card>
        )
    }



}
const styles = {

  titleStyle:{
      fontSize:18,
      paddingLeft:15,

  }
};

export {ListItem}