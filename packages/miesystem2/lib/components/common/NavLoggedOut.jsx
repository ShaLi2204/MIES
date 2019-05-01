import React from 'react';
import PropTypes from 'prop-types';
import { registerComponent, Components, withCurrentUser } from 'meteor/vulcan:core';
import { STATES } from 'meteor/vulcan:accounts';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { withApollo } from 'react-apollo';
import { Meteor } from 'meteor/meteor';
import { Button } from 'reactstrap';

 // navigation bar component when the user is logged out

const NavLoggedOut = ({ state }) => (

 <div className="header-nav">

   <Components.ModalTrigger label="Sign Up/Log In" size="small" component={<Button size="sm" color="primary">Sign Up/ Log In</Button>} >
     <Components.AccountsLoginForm  formState={state ? STATES[state] : STATES.SIGN_UP}/>
   </Components.ModalTrigger>

 </div>
);

NavLoggedOut.displayName="NavLoggedOut";

registerComponent({ name: 'NavLoggedOut', component: NavLoggedOut});