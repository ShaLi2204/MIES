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


const CreatedSurveys = (props, context, currentUser) => {

    return(
        <div>
        {!!props.currentUser? 
        <div>
            <Components.SurveysUsersProfile userId={props.currentUser._id} /*slug={props.params.slug}*//>
        </div> : 
        <div>
            <Jumbotron>
                <h1>Welcome!</h1>
                <p>Here you see your own surveys, publish them and see the survey responses!</p>
                <p>Please first login in for viewing your own surveys!</p>
                <hr/>
                <Components.ModalTrigger label="Sign Up/Log In" size="small" component={<Button size="sm" color="primary">Sign Up/ Log In</Button>} >
                    <Components.AccountsLoginForm />
                </Components.ModalTrigger>
            </Jumbotron>
        </div>
        }
        </div>
    )
};

CreatedSurveys.displayName = "CreatedSurveys";

registerComponent({ 
    name: 'CreatedSurveys', 
    component: CreatedSurveys, 
    hocs:[withCurrentUser] 
});