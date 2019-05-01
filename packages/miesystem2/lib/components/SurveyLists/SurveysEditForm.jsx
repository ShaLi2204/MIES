/*

Edit survey information

*/

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Components, registerComponent, withMessages, withCurrentUser, getFragment } from 'meteor/vulcan:core';
import { SurveyLists } from '../../modules/SurveyLists/index.js';
import swal from 'sweetalert';

function EditAlert(){
  swal({
    title:"Changes Saved",
    icon:"success",
    showCancelButton: true
  });
}

class SurveysEditForm extends Component {

  render() {
    return(
      <div>
      <Components.SmartForm
        collection={SurveyLists}
        documentId={this.props.surveyList._id}
        successCallback={surveyList => {
          this.props.closeModal();
          EditAlert();
        }}
        removeSuccessCallback={({documentId, documentTitle}) => {
          if (this.props.params._id) {
            this.props.router.push('/');
          }

          this.props.falsh( {id: 'deleted', properties: {title: documentTitle }, type: 'success'});
        }}
        showRemove={true}
      />
      </div>
    )
  }
}

SurveysEditForm.propTypes = {
  closeModal: PropTypes.func,
  surveyList: PropTypes.object.isRequired
}

registerComponent({ name: 'SurveysEditForm', component: SurveysEditForm, hocs:[withMessages, withRouter, withCurrentUser] });  