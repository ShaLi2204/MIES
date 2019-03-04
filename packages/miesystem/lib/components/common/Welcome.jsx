import React, { PropTypes, Component } from 'react';
import { Components, registerComponent, withMulti, withCurrentUser, Loading } from 'meteor/vulcan:core';

class Welcome extends Component{
    render(){
        return(
        <div style={ { padding: '20px 0', marginBottom: '20px', borderBottom: '1px solid #ccc' } }>
            Welcome to the MIE System!
            Here you can fulfil questionnaires and create new survyes of your own.
            Please login first for creating new surveys.          
        </div>    
        )
    }
}

registerComponent({name: 'Welcome', component: Welcome});