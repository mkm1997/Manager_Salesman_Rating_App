import React from 'react';
import {View} from "react-native";

const CardItem = (props) => {
    return (
        <View style={style.containerStyle}>
            {props.children}
        </View>
    )

};

const style = {
    containerStyle:{
        display: 'flex',
        borderBottomWidth: 1,
        padding: 5,
        textAlign:'center',
        fontSize:30,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};

export { CardItem };

