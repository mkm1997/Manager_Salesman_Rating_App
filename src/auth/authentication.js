import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import LoginForm from "../component/LoginForm";
import LOGIN from "../Constant/const.js";
import ManagerView  from "../View/ManagerView";
import {HeaderNoShadow} from "../component/common";





export default class Authentication extends Component{




    state = {authenticated: false};

    // componentWillMount(){
    //
    //
    // }
    renderViewFunction(){
        if(this.state.authenticated){
            console.log("Login is done");
            return(

                <View>
                    <HeaderNoShadow headerText="Escale"/>
                    <ManagerView/>

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
            <View>
                <HeaderNoShadow headerText="Escale"/>
                <LoginForm/>
            </View>

        );
    }


}

// export default Authentication