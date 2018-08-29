import React, {Component} from 'react';
import {Text,AsyncStorage,View,ListView} from 'react-native';

import {Card, List} from 'react-native-elements';
import {ListItem} from "../component/common";
import axios from 'axios';
import {connect} from 'react-redux';


class ManagerView extends Component{


    state = {
        list_item:[],
        storedValue: '',
        flag:false,


    };

    constructor(props) {
        super(props);

    }
    componentWillMount() {


        console.log("ouuooooooooooooooooooooooooooooooooo"+this.props.token);

        this.onLoad()

    }

    onLoad = async () => {
        try {
            const storedValue = await AsyncStorage.getItem("token");
            //console.log("token is "+storedValue);
            this.setState({ storedValue });
            this.getListData();
            return true


        } catch (error) {
            console.log('Error There was an error.'+error)
        }
    };

    async getListData(){

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
                // this.renderRow(responseJson.data);

                console.log(responseJson.data);

                return responseJson.data;

            } else {

                console.log(AsyncStorage.getItem("token"));
                console.log(responseJson.message);
                return responseJson.message

            }

        }).catch((error) => {
            console.error(error);
        });

    };

    getDataFromManager = (props) =>{
        this.setState({
            flag:true
        });
        console.log("aa gaya bhai list view me");


        return(

            <ListView
                dataSource={this.props}
                renderRow={(rowData) => <Text>{rowData}</Text>}
            />
        )
    };

    renderRow(managerdata){
        console.log("render row"+managerdata);

        return <ListItem data={managerdata}/>

    }


    render(){

        console.log(this.state.list_item);
        //console.log("ouuuu again __"+this.getListData());
        if (this.state.list_item !==[])
        {
            let li = this.state.list_item;
            for(let i = 0;i<li.length;++i)
            {
                console.log("loop me hu bhai"+li[i].salesman)
            }

            console.log("renderView"+this.state.list_item[0]);
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.dataSource = ds.cloneWithRows(this.state.list_item);



            return(
                <ListView
                dataSource={this.dataSource}
                renderRow={this.renderRow}
                />
            );
        }else
        {
            return(
                <View>
                    <Text>data is not loaded</Text>
                </View>
            )

        }







    }


}

//<img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />

const mapStateToProps = state =>{

    console.log("in reducer view  ouuuuuuuuuuuuuu");
    console.log(state.managerListdata);

    return {managerdata:state.managerListdata}
};


//export default connect(mapStateToProps)(ManagerView)
export default ManagerView;
