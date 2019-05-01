import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Button } from 'reactstrap';

const OpenSurveysHome = (props, context) => {

    const terms = _.isEmpty(props.location && props.location.query) ? {view: 'public'}: props.location.query;
    return(
        <div>
            {/*!!props.currentUser ? */}
            <Components.OpenSurveysList terms={terms} /> {/*: 
            <div>
                <Jumbotron>
                <h1>Welcome!</h1>
                <p>Here you can see the open surveys and fulfil them!</p>
                <p>Please first login in for !</p>
                <hr/>
                <Components.ModalTrigger label="Sign Up/Log In" size="small" component={<Button size="sm" color="primary">Sign Up/ Log In</Button>} >
                    <Components.AccountsLoginForm />
                </Components.ModalTrigger>
                </Jumbotron>
            </div>*/}

        </div>
    )
};

OpenSurveysHome.displayName = "OpenSurveysHome";

OpenSurveysHome.propTypes = {
    currentUser: PropTypes.object
}

registerComponent({ 
    name: 'OpenSurveysHome', 
    component: OpenSurveysHome,
    hocs: [withCurrentUser]
});