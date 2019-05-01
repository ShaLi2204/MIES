/*

Created Surveys Page

*/

import { Components, registerComponent, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';
import PropTypes from 'prop-types';


const SurveysUsersProfile = (props) => {
  if (props.loading) {

    return <div className="page users-profile"><Components.Loading/></div>

  } else if (!props.document) {

    // console.log(`// missing user (_id/slug: ${props.documentId || props.slug})`);
    return <div className="page users-profile"><FormattedMessage id="app.404"/></div> 
  
  } else {

    const user = props.currentUser;

    const terms = {view: "userSurveyLists", userId: user._id};

    return (
      <div className="page users-profile">
        <Components.SurveysList terms={terms} /*userId={props.currentUser._id}*/ showHeader={false} />
      </div>
    )
  }
}

SurveysUsersProfile.propTypes = {
//  document: PropTypes.object.isRequired,
}

SurveysUsersProfile.displayName = "SurveysUsersProfile";

const options = {
  collection: Users,
  queryName: 'usersSingleQuery',
  //fragmentName: 'UsersProfile',
};

registerComponent({ 
  name: 'SurveysUsersProfile', 
  component: SurveysUsersProfile, 
  hocs: [withCurrentUser, [withDocument, options]] 
});
