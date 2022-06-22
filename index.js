/**
 * @format
 */
import {AppRegistry} from 'react-native';
import WrappedApp from './App';
import {name as appName} from './app.json';
import AnimatedHeader from './src/screens/AnimatedHeader';

// const App = () => {
//   return <View style={{flex: 1, backgroundColor: 'red'}} />;
// };

AppRegistry.registerComponent(appName, () => WrappedApp);
