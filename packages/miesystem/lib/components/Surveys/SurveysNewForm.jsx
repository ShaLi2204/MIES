/*
    Component to add new surveys
*/

import {
  Components,
  registerComponent,
  getRauComponent,
  getFragment,
  withMessages,
  withList,
  withAccess
} from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withRouter } from 'react-router';
import { SurveyLists } from '../../modules/Surveys/index.js';
//import SurveyLists from '../../modules/Surveys/collection.js';

import { Button } from 'reactstrap';
import swal from 'sweetalert';
import { browserHistory } from 'react-router';

/*
function NewSurveyPageII(t){
  swal({
    title:"New Survey Saved",
    icon:"success",
    showCancelButton: true
  });
  browserHistory.push('./newsurvey/'+t);
}
*/
/*
SurveyLists.getPageUrl = function(surveyList, isAbsolute = false){
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
  return `${prefix}/newsurvey/${surveyList._id}`;
};
*/
const SurveysNewForm = (props, context) => {
  if (props.loading) {
    return <div><Components.Loading/></div>;
  }
  return (
    /*<Components.ShowIf
      check={SurveyLists.options.mutations.new.check}
      failureComponent={
        <div style={ { padding: '20px 0', marginBottom: '20px', borderBottom: '1px solid #ccc' } }>
            Please first sign in to create a new survey!         
        </div>
      }>*/
      <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #ccc' }}>
          <Components.SmartForm 
            collection={SurveyLists} 
            mutationFragment={getFragment('SurveyListsFragment')} 
            successCallback={surveyList => {
              props.closeModal();
              props.router.push({pathname: props.redirect || SurveyLists.getPageUrl(surveyList)});
          }}/>
        </div>
      /*</Components.ShowIf>   */
  );
};

SurveysNewForm.propTypes = {
  closeModal: PropTypes.func,
  router: PropTypes.object,
  redirect: PropTypes.string
}

SurveysNewForm.contextTypes = {
  closeCallback: PropTypes.func,
}

SurveysNewForm.displayName = "SurveysNewForm";

const accessOptions = {
  groups: ['members', 'admins']
};
  
registerComponent({ name: 'SurveysNewForm', component: SurveysNewForm, hocs: [withRouter, [withAccess, accessOptions]] });