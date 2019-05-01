import {
    Components,
    Loading,
    registerComponent,
    getRawComponent,
    getFragment,
    withCurrentUser,
    withMessages,
    withList,
    withMulti
} from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Button } from 'reactstrap';

class Contact extends Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        return(
            <div>
                Contact
            </div>
        )
    }
}

registerComponent({
    name: 'Contact',
    component: Contact
});