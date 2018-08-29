import {combineReducers} from 'redux';
import  ManagerData from './manager_data'

export default combineReducers({
    managerListdata: () =>ManagerData
});