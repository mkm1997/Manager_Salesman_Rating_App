import React,{Component} from 'react';
import {AsyncStorage} from "react-native";

export default () => class ManagerData extends Component{


    state = {
        list_item:[],
        storedValue: '',
        flag:false

    };
    componentWillMount() {

        this.onLoad();

    }

    onLoad = async () => {
        try {
            const storedValue = await AsyncStorage.getItem("token");
            //console.log("token is "+storedValue);
            this.setState({ storedValue });
            this.getListData();

        } catch (error) {
            console.log('Error There was an error.'+error)
        }
    };

    getListData(){
        console.log("hello me aa gaya"+this.state.storedValue);
        fetch('http://techinvent.pythonanywhere.com/managerView/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' +this.state.storedValue,

            },

        }).then((response) => response.json()).then((responseJson) => {

            if (responseJson.status === "success") {

                this.setState({
                    list_item:responseJson.data
                });
                console.log(responseJson.data);

                return responseJson.data;

            } else {
                // console.log(this.state.storedValue);
                console.log(AsyncStorage.getItem("token"));
                console.log(responseJson.message);
                return responseJson.message

            }

        }).catch((error) => {
            console.error(error);
        });




    };



    render(){
        console.log("hmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
        return this.getListData();
    }

}