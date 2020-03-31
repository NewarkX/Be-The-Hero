import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import incidents from './pages/incidents';
import detail from './pages/detail';
import React from 'react';

const AppStack = createStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions = {{headerShown:false}}>
                <AppStack.Screen name='incidents' component={incidents}/>
                <AppStack.Screen name='detail' component={detail}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}