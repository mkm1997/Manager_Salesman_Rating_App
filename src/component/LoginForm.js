import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native';
import {CardItem,ButtonRoundedExample,Spinner} from "./common";
import { Button,Card,icon,FormInput,FormLabel} from 'react-native-elements';
import {Container, Text, Content, Form, Item, Input, Label, Picker, Icon, Toast} from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import ListView from "../View/ListView";
import LOGIN from "../Constant/const.js";

// path of python server

// /home/manish/PycharmProjects/SalesMan_Manager/Manage


let auth = false;

class LoginForm extends Component{
    state = {username:'',password:'',value:'',loading:false};

    onValueChange(value){
        console.log(value);
        // alert(value);

        this.setState({

            value: value
        });

        console.log(this.state.value)

    }
    onButtonPress(){

        this.setState({

            loading: true
        });



        const {username,password,value}  = this.state; // for login view

        console.log(username,password,value);


        fetch('http://192.168.43.12:8000/login/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                user_type : value
            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                console.log(responseJson);
                if (responseJson.status === "success")
                {
                    console.log(responseJson.message);
                    this.onLoginSuccess();
                }
                else{
                    alert("Username , Password or Login as may be incorrect");

                    this.onLoginFail();

                }
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });


    }


    onLoginSuccess(){

        this.setState({
            username:'',
            password:'',
            value:'',
            loading:false,

        });
        LOGIN = true;
        alert("login");

        this.renderButton();

        return(

            <View>
                <ListView/>
            </View>

        );


    }

    onLoginFail(){
        alert("hello");
        this.setState({
            loading:false,

        });
        this.renderButton();

    }

    renderButton(){

        console.log("in render button models");

        if(this.state.loading){
            return <Spinner size="large"/>
        }




        return(

            <Button
                raised
                buttonStyle={{backgroundColor: "#00ccff", borderRadius: 7,width:320}}

                title={`Login`}
                onPress = {this.onButtonPress.bind(this)}
            />



        )


    }

    render(){
        let data = [{
            value: 'Manager',
        }, {
            value: 'Salesman',
        }];

        return(
            <View style={style.containerStyle} >

                <Card containerStyle={{marginTop:100}} >

                    <CardItem>
                        <Picker
                            style={{display:'flex',flex: 1, alignSelf: 'stretch'}}
                            selectedValue={this.state.value}
                            onValueChange={value => this.onValueChange(value)}
                        >
                            <Picker.Item label="Login as" value="Login as" />
                            <Picker.Item label="Manager" value="Manager" />
                            <Picker.Item label="Salesman" value="Salesman" />
                        </Picker>

                    </CardItem>

                    <CardItem>
                        <Input
                            placeholder = "   Username"
                            onChangeText = {(username) => this.setState({username})}
                        />

                    </CardItem>

                    <CardItem>
                        <Input
                            placeholder= "   Password"
                            onChangeText = {password => this.setState({password})}
                            secureTextEntry

                        />
                    </CardItem>
                <CardItem>

                    {this.renderButton()}
                </CardItem>

                </Card>
            </View>


        );
    }





}

const style = {
    containerStyle:{

        fontSize:200,

    }
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        alignSelf: 'center',
        color: 'red'
    }
});

export default LoginForm