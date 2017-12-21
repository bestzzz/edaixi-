import React from 'react';
import {Route,Redirect} from 'react-router-dom'

export default function ({component:Component,...rest}) {
    return (
        <Route {...rest} render={({history,location})=>{
            return localStorage.getItem('login')?<Component />:<Redirect to={{pathname:'/login',state:{from:location.pathname}}}/>
        }

        }/>
    )
}