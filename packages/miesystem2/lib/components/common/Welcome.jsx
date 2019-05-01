import React, { Component } from 'react';
import { Components, registerComponent, withMulti, withCurrentUser, Loading } from 'meteor/vulcan:core';
import { Jumbotron, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Users from 'meteor/vulcan:users';
import { SurveyLists } from '../../modules/SurveyLists/index.js';
import { Spinner } from 'reactstrap';


class Welcome extends Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }
    
    render(){

    const {currentUser} = this.props;

       return(
       <div style={ { padding: '20px 0', marginBottom: '20px', borderBottom: '1px solid #ccc' } }>
            <Spinner color="primary" />
                {!!currentUser ?
                <div>
                    <Jumbotron>
                        <h1>
                            Welcome, {Users.getDisplayName(currentUser)}
                        </h1>
                        <p>You can now create your own surveys as well as fulfilling the surveys</p>
                        <hr/>
                        <Components.ShowIf check={SurveyLists.options.mutations.new.check}>
                            <Components.SurveysNewButton/>
                        </Components.ShowIf>
                    </Jumbotron>
                </div> : 
                <div>
                    <Jumbotron>
                    <h1>Welcome!</h1>
                    <p>Here you can create your own surveys and fulfil surveys!</p>
                    <p>Please first login in for creating your own surveys!</p>
                    <hr/>
                    <Components.ModalTrigger label="Sign Up/Log In" size="small" component={<Button size="sm" color="primary">Sign Up/ Log In</Button>} >
                        <Components.AccountsLoginForm />
                    </Components.ModalTrigger>
                    </Jumbotron>
                </div>

                }
       </div>
       )
   }
}

Welcome.propTypes = {
    currentUser: PropTypes.object,
};


registerComponent({
    name: 'Welcome', 
    component: Welcome,
    hocs: [withCurrentUser]
});