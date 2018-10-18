import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native';
import {CardItem,ButtonRoundedExample,Spinner} from "./common";
import { Button,Card,icon,FormInput,FormLabel} from 'react-native-elements';
import {Container, Text, Content, Form, Item, Input, Label, Picker, Icon, Toast} from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import ManagerView from "../View/ManagerView";
import {AsyncStorage} from "react-native";

import LOGIN from "../Constant/const.js";
// import from "../auth/authentication";


// path of python server

// /home/manish/PycharmProjects/SalesMan_Manager/Manage



class LoginForm extends Component{


    state = {username:'',password:'',value:'',loading:false,auth:false,token:'',oldtoken:''};
    componentWillMount(){

        this.onLoad()

    }

    onLoad = async () => {
        try {
            const storedValue = await AsyncStorage.getItem("token");
            //console.log("token is "+storedValue);
            this.setState({oldtoken:storedValue});


        } catch (error) {
            console.log('Error There was an error.'+error)
        }
    };





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


        fetch('http://techinvent.pythonanywhere.com/login/', { // ye login karwa dega
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Manish'
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
                    try {
                        this.setState({token:responseJson.token});
                        AsyncStorage.setItem("token",responseJson.token);
                        console.log("saved in local store");
                    } catch (error) {
                        Alert.alert('Error', 'There was an error.')
                    }

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
            }); //ruk dek h


    }


    onLoginSuccess(){


        this.setState({
            username:'',
            password:'',
            value:'',
            loading:false,
            auth:true,

        });
        console.log(AsyncStorage.getItem("token"));
        this.render()





    }

    onLoginFail(){

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
                buttonStyle={{backgroundColor: "#00ccff", borderRadius: 5,width:260}}
                title={`Login`}
                onPress = {this.onButtonPress.bind(this)}
            />


        )


    }


    afterLoginView(){

        console.log("after Login"); //and ye login ke baad dusre page pe bhej dega



        return(
            <View style={{flex:1}}>
                <ManagerView
                token={this.state.token}/>

            </View>
        );


    }

    render() {
        if(this.state.oldtoken ==='')
        {
            this.state.oldtoken = undefined
        }
        console.log(this.state.oldtoken);

        if (this.state.auth === false && this.state.oldtoken === undefined) {
            let data = [{
                value: 'Manager',
            }, {
                value: 'Salesman',
            }];

            return (
                <View style={style.containerStyle}>

                    <Card containerStyle={{marginTop: 100}}>

                        <CardItem>
                            <Picker
                                style={{display: 'flex', flex: 1, alignSelf: 'stretch'}}
                                selectedValue={this.state.value}
                                onValueChange={value => this.onValueChange(value)}
                            >
                                <Picker.Item label="Login as" value="Login as"/>
                                <Picker.Item label="Manager" value="Manager"/>
                                <Picker.Item label="Salesman" value="Salesman"/>
                            </Picker>

                        </CardItem>

                        <CardItem>
                            <Input
                                placeholder="Username"
                                onChangeText={(username) => this.setState({username})}
                            />

                        </CardItem>

                        <CardItem>
                            <Input
                                placeholder="Password"
                                onChangeText={password => this.setState({password})}
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

        else{

          return  this.afterLoginView()


        }
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