
import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const SurveyItemsNode = ({ surveyItem, currentUser }) =>
    <div>
        <Components.SurveyItemsItem currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} />
    </div>

SurveyItemsNode.propTypes = {
    surveyItem: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
};

registerComponent({name: 'SurveyItemsNode', component: SurveyItemsNode});