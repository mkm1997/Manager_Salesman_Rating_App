import {AsyncStorage, ListView} from "react-native";

<CardItem>

    <Dropdown
        labelStyle={{fontSize:60}}
        label='Login as'
        data={data}
    />
</CardItem>
<Text style = {styles.text}>{this.state.value}</Text>



// let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
// let m = ds.cloneWithRows(responseJson.data);
// this.state = {
//     dataSource: m,
// };
// alert(this.state.dataSource);
// componentWillMount(){
//
//
// }
// renderViewFunction(){
//     if(this.state.authenticated){
//         console.log("Login is done");
//         return(
//
//             <View>
//                 <HeaderNoShadow headerText="Escale"/>
//                 <ManagerView />
//
//             </View>
//             </Provider>
//         );
//     }
//     else{
//         return(
//             <Provider store={store}>
//             <View>
//                 <HeaderNoShadow headerText="Escale"/>
//                 <LoginForm/>
//             </View>
//             </Provider>
//         );
//
//     }
//
//
//
// };

constructor(props) {
    super(props);
}

.then(fetch('http://techinvent.pythonanywhere.com/managerView/', {
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
        this.getDataFromManager(responseJson.data);

        console.log("rseponse from wiil mount"+responseJson.data);

        return responseJson.data;

    } else {

        console.log("hello",AsyncStorage.getItem("token"));
        console.log("response from will mount"+responseJson.message);
        return responseJson.message

    }

}).catch((error) => {
    console.error(error);
}));


//.then((response) =>fetch('http://techinvent.pythonanywhere.com/managerView/', {
//             method: 'GET',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Token ' +this.state.storedValue,
//
//             },
//
//         }).then((response) => response.json()).then((responseJson) => {
//
//             if (responseJson.status === "success") {
//
//                 this.setState({
//                     list_item:responseJson.data
//                 });
//                 this.getDataFromManager(responseJson.data);
//
//                 console.log(responseJson.data);
//
//                 return responseJson.data;
//
//             } else {
//
//                 console.log(AsyncStorage.getItem("token"));
//                 console.log(responseJson.message);
//                 return responseJson.message
//
//             }
//
//         }).catch((error) => {
//             console.error(error);
//         })//