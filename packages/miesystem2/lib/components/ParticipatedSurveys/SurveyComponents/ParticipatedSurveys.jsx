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
import { Button, Jumbotron } from 'reactstrap';

const ParticipatedSurveys = (props, context, currentUser) => {

    return(
        <div>
            {!!props.currentUser?
            <div>
                <Components.ParticipatedUsersProfile userId={props.currentUser} />
            </div> : 
            <div>
                <Jumbotron>
                    <h1>Welcome!</h1>
                    <p>Here you can view the surveys you participated in!</p>
                    <p>Please first login in for viewing your participated surveys!</p>
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

ParticipatedSurveys.displayName = 'ParticipatedSurveys';

registerComponent({
    name: 'ParticipatedSurveys', 
    component: ParticipatedSurveys,
    hocs: [withCurrentUser]
});