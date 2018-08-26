import React, {Component} from 'react';
import {Text,AsyncStorage,View,ListView} from 'react-native';

import {Card, List,ListItem} from 'react-native-elements';
import axios from 'axios';







class ManagerView extends Component{



    state = {
        list_item:[],
        storedValue: '',
        flag:false

    };

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };



    }
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
                // let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                // let m = ds.cloneWithRows(responseJson.data);
                // this.state = {
                //     dataSource: m,
                // };
                // alert(this.state.dataSource);
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

    // getListView = () =>{
    //     this.setState({
    //         flag:true
    //     });
    //
    //
    //   return(
    //
    //       <ListView
    //           dataSource={this.state.dataSource}
    //           renderRow={(rowData) => <Text>{rowData}</Text>}
    //       />
    //   )
    // };





    render(){

        // console.log(this.state.dataSource);
        // if (this.state.flag){

            return(
                <View>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text>{rowData}</Text>}
                />
                </View>
            );
       // }
        // else
        // {
        //
        //     return(
        //
        //         <Text>
        //             hello
        //         </Text>
        //     );
        //
        // }






    }


}






export default ManagerView