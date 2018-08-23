import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Header, Button, Card, CardItem, HeaderNoShadow,Input} from "../component/common";
import LoginForm from "../component/LoginForm";
import LOGIN from "../Constant/const.js"
import ListView  from "../View/ListView";





export default class Authentication extends Component<{}>{



    // componentWillMount(){
    //
    //
    // }
    renderViewFunction =() =>{
        if(LOGIN){
            return(

                <View>
                    <HeaderNoShadow headerText="Escale"/>
                    <ListView/>

                </View>
            );
        }
        else{
            return(

                <View>
                    <HeaderNoShadow headerText="Escale"/>
                    <LoginForm/>
                </View>
            );

        }



    };
    render(){


        return(

           this.renderViewFunction()

        );
    }


}

// export default Authentication