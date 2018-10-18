import React, {Component} from 'react';
import { Text, View} from 'react-native';
import LoginForm from "../component/LoginForm";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../reducers';
import store from '../store';
import ManagerView  from "../View/ManagerView";
import {HeaderNoShadow} from "../component/common";








export default class Authentication extends Component{




    state = {authenticated: false};


    render(){


        return(
            <Provider store={createStore(reducers)}>
            <View style={{flex:1}}>
                <HeaderNoShadow headerText="Escale"/>
                <LoginForm/>
            </View>
            </Provider>

        );
    }


}

// export default Authentication