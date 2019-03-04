import React, { PropTypes, Component } from 'react';
import { Components, registerComponent, withMulti, withCurrentUser, Loading } from 'meteor/vulcan:core';

class Login extends Component{
    render(){
        return(
        <div style={ { padding: '20px 0', marginBottom: '20px', borderBottom: '1px solid #ccc' } }>
    
        <Components.AccountsLoginForm />
          
        </div>    
        )
    }
}

registerComponent({name: 'Login', component: Login});