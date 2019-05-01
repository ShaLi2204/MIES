
import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Row,
    Col
} from 'reactstrap';

const OSSurveyItemsNode = ({ surveyItem, surveyItems, currentUser, i }) => {
    
    if(surveyItem.surveyItemType=="CommentBox") {
        return (
            <div>
                <Components.OSSurveyItemCommentBox i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} />
            </div>
        )
    } else if (surveyItem.surveyItemType=="TextBox") {
        return(
            <div>
                <Components.OSSurveyItemTextBox i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} />
            </div>
        )
    } else if (surveyItem.surveyItemType=="MultipleChoice") {
        return(
            <div>
                <Components.OSSurveyItemMultipleChoice i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id}/>
            </div>
        )
    } else if (surveyItem.surveyItemType=="CheckBox") {
        return(
            <div>
                <Components.OSSurveyItemCheckBox i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id}/>
            </div>
        )
    } else {
        return(
            <div>
                Survey item type not defined
            </div>
        )
    }
}

OSSurveyItemsNode.propTypes = {
    surveyItem: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
};

registerComponent({
    name: 'OSSurveyItemsNode', 
    component: OSSurveyItemsNode
});
