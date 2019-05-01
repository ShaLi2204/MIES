
import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Row,
    Col
} from 'reactstrap';

const SurveyItemsNode = ({ surveyItem, surveyItems, currentUser, i }) => {
    
    if(surveyItem.surveyItemType=="CommentBox") {
        return (
            <div>
                <Components.SurveyItemCommentBox i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} />
            </div>
        )
    } else if (surveyItem.surveyItemType=="TextBox") {
        return(
            <div>
                <Components.SurveyItemTextBox i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} />
            </div>
        )
    } else if (surveyItem.surveyItemType=="MultipleChoice") {
        return(
            <div>
                <Components.SurveyItemMultipleChoice i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id}/>
            </div>
        )
    } else if (surveyItem.surveyItemType=="CheckBox") {
        return(
            <div>
                <Components.SurveyItemCheckBox i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id}/>
            </div>
        )
    } else if (surveyItem.surveyItemType=="RatingScale"){
        return(
            <div>
                <Components.SurveyItemListRatingScale i={i} currentUser={currentUser} surveyItem={surveyItem} surveyItems={surveyItems} key={surveyItem._id}/>
            </div>
        )
    } else {
        return(
            <div>
                No Survey Items
            </div>
        )
    }
}

SurveyItemsNode.propTypes = {
    surveyItem: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
};

registerComponent({name: 'SurveyItemsNode', component: SurveyItemsNode});




class SurveyItemListRatingScale extends Component{

    render(){

        const {surveyItems} = this.props;
        const {currentUser} = this.props;

        const surveyItemsRatingScale = surveyItems.filter(surveyItem => surveyItem.surveyItemType ==='RatingScale');
        const grouped = _.groupBy(surveyItemsRatingScale, 'matrixSurveyItemId');

        return(

            <div>
                {Object.keys(grouped).map((group, i) => 
                <Components.SurveyItemRatingScale key={group} group={group} grouped={grouped} i={i} currentUser={currentUser} />
                )}
            </div>

        )
    }
}

SurveyItemListRatingScale.displayName = "SurveyItemListRatingScale";


registerComponent({name: 'SurveyItemListRatingScale', component: SurveyItemListRatingScale});
