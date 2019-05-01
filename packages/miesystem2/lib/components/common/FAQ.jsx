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

class FAQ extends Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        return(
            <div>
                FAQ
            </div>
        )
    }
}

registerComponent({
    name: 'FAQ',
    component: FAQ
});