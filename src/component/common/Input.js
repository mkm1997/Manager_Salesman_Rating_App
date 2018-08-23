import React from 'react-native';
import {TextInput,View,Text} from 'react-native';


const Input = ({label,vlaue,onChangeText}) =>{

   return(
       <View>
        <Text>{label}</Text>
        <TextInput
            value = {value}
            onChangeText = {onChangeText}
            style = {{height:20,width:100}}

        />


    </View>
   );



};

export {Input};

