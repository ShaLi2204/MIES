import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Row,
    Col,
    Spinner
} from 'reactstrap';

const SurveyItemsNode = ({ surveyItem, surveyItems, surveyList, currentUser, i}) => {

    /*if (loading) {

        return(
            <div>
                {console.log('Loaidng SurveyItemsNode')}
                <Spinner color='primary' />
            </div>
        )

    } else*/ if (surveyItem.surveyItemType=="CommentBox"){
        return(
            <div>
                <Components.CommentBoxDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyList={surveyList} />
            </div>
        )
    } else if (surveyItem.surveyItemType=="TextBox"){
        return(
            <div>
                <Components.TextBoxDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyList={surveyList} />
            </div>
        )
    } else if (surveyItem.surveyItemType=="MultipleChoice"){
        return(
            <div>
                <Components.MultipleChoiceDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyList={surveyList} />
            </div>
        )
    } else if (surveyItem.surveyItemType=="CheckBox"){
        return(
            <div>
                <Components.CheckBoxDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyList={surveyList} />
            </div>
        )
    } else if (surveyItem.surveyItemType=="RatingScale"){
        return(
            <div>
                <Components.RatingScaleDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyList={surveyList} />
            </div>
        )
    } else if (surveyItem.surveyItemType=="SelfTracking"){
        return(
            <div>
                <Components.SelfTrackingDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyList={surveyList} />
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

SurveyItemsNode.propTypes = {
    surveyItem: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
};

registerComponent({
    name: 'SurveyItemsNode',
    component: SurveyItemsNode
});