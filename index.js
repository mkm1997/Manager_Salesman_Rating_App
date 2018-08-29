/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Authentication from'./src/auth/authentication';

AppRegistry.registerComponent(appName, () => Authentication);

