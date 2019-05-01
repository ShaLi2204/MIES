/*
    Component to add new surveys
*/

import {
  Components,
  registerComponent,
  getRawComponent,
  getFragment,
  withMessages,
  withList,
} from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withRouter } from 'react-router';
import { SurveyLists } from '../../modules/SurveyLists/index.js';
  
import { Button } from 'reactstrap';
import swal from 'sweetalert';
import { browserHistory } from 'react-router';
  
const SurveysNewForm = (props, context) => {
  if (props.loading) {
    return <div><Components.Loading/></div>;
  }
  return (
    <div>
      <Components.ShowIf
        check={SurveyLists.options.mutations.new.check}
        failureComponent={
          <div style={ { padding: '20px 0', marginBottom: '20px', borderBottom: '1px solid #ccc' } }>
              <p>Please first sign in to create a new survey!</p> 
              <Components.ModalTrigger label="Sign Up/Log In" size="small" component={<Button size="sm" color="primary">Sign Up/ Log In</Button>} >
                <Components.AccountsLoginForm/>
              </Components.ModalTrigger>
          </div>
        }>
        <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #ccc' }}>
            <Components.SmartForm 
              collection={SurveyLists} 
              mutationFragment={getFragment('SurveyListsFragment')} 
              showRemove={false}
              successCallback={surveyList => {
                props.closeModal();
                props.router.push({pathname: props.redirect || SurveyLists.getNewPageUrl(surveyList)});
              }}
            />
          </div>
        </Components.ShowIf> 
  </div>
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

const options = {
  collectionName: 'SurveyLists',
  queryName: 'SurveyListsQuery',
  limit: 0
}
  
SurveysNewForm.displayName = "SurveysNewForm";
    
registerComponent({ 
  name: 'SurveysNewForm', 
  component: SurveysNewForm,
   hocs: [withRouter, withMessages, [withList, options]] 
  });