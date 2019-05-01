import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Row,
    Col
} from 'reactstrap';

const PSSurveyItemsNode = ({ surveyItem, surveyResponse, currentUser, i, loading, PSSurveyItemUpdateSave }) => {
    if (loading) {
        return <Components.Loading />
    } else if (surveyItem.surveyItemType=="CommentBox"){
        return(
            <div>
                <Components.PSCommentBoxDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyResponse={surveyResponse} PSSurveyItemUpdateSave={PSSurveyItemUpdateSave} />
            </div>
        )
    } else if (surveyItem.surveyItemType=="TextBox"){
        return(
            <div>
                <Components.PSTextBoxDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyResponse={surveyResponse} PSSurveyItemUpdateSave={PSSurveyItemUpdateSave} />
            </div>
        )
    } else if (surveyItem.surveyItemType=="MultipleChoice"){
        return(
            <div>
                <Components.PSMultipleChoiceDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyResponse={surveyResponse} PSSurveyItemUpdateSave={PSSurveyItemUpdateSave} />
            </div>
        )
    } else if (surveyItem.surveyItemType=="CheckBox"){
        return(
            <div>
                <Components.PSCheckBoxDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyResponse={surveyResponse} PSSurveyItemUpdateSave={PSSurveyItemUpdateSave} />
            </div>
        )
    } else if (surveyItem.surveyItemType=="RatingScale"){
        return(
            <div>
                <Components.PSRatingScaleDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyResponse={surveyResponse} PSSurveyItemUpdateSave={PSSurveyItemUpdateSave} />
            </div>
        )
    } else if (surveyItem.surveyItemType=="SelfTracking"){
        return(
            <div>
                <Components.PSSelfTrackingDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyResponse={surveyResponse} PSSurveyItemUpdateSave={PSSurveyItemUpdateSave} />
            </div>
        )
    } else {
        return(
            <div>
                Wrong Survey Item Type
            </div>
        )
    }
}

PSSurveyItemsNode.propTypes = {
    surveyItem: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
};

registerComponent({
    name: 'PSSurveyItemsNode',
    component: PSSurveyItemsNode
});
