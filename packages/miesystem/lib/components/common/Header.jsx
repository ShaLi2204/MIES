
import React from 'react';
import PropTypes from 'prop-types';
import { registerComponent, Components, withCurrentUser } from 'meteor/vulcan:core';
import { SurveyLists } from '../../modules/Surveys/index.js';
import { STATES } from 'meteor/vulcan:accounts';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { withApollo } from 'react-apollo';
import { Meteor } from 'meteor/meteor';
  
  // navigation bar component when the user is logged out
  
 
  // Header component
  
  const Header = (props) => {

    return(
  
    <div className="header-wrapper">
  
      <div className="header">
        
        <h1>
        MIE System
        </h1>
      <div className="nav">
        <div className="nav-user">
        {!!props.currentUser ? 
          <Components.NavLoggedIn currentUser={props.currentUser}/> : 
          <Components.NavLoggedOut/>
        }
        </div>
        <div className="nav-new-survey">
          {/*<Components.ShowIf check={SurveyLists.options.mutations.new.check}>*/}
          {/*</Components.ShowIf>*/}
{/*
          <Components.ShowIf check={() => Users.canDo(props.currentUser, 'surveyLists.new')}>
            <Components.SurveysNewButton/>
          </Components.ShowIf>
*/}
        </div>
      </div>
      </div>
    </div>
    )
}
  
Header.displayName = "Header";

Header.propTypes = {
  currentUser: PropTypes.object,
};
  
registerComponent({ name: 'Header', component: Header, hocs: [withCurrentUser] });
  