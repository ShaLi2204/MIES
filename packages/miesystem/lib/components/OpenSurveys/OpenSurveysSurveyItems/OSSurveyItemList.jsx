import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';

class OSSurveyItemList extends Component{

    render(){

        const {surveyItems} = this.props;
        const {currentUser} = this.props;
        const {surveyListId} = this.props;
        const {loading} = this.props;

        const surveyItemsRatingScale = surveyItems.filter(surveyItem => surveyItem.surveyItemType ==='RatingScale');
        const surveyItemsOthers = surveyItems.filter(surveyItem => surveyItem.surveyItemType !=='RatingScale');
        const grouped = _.groupBy(surveyItemsRatingScale, 'matrixSurveyItemId');

        if(loading) {

            return <Components.Loading />

        } else {

            return(
                <div className="opensurveyitemspage">

                    {surveyItemsOthers.map((surveyItem, i) => 
                        <Components.OSSurveyItemsNode i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyItems={surveyItems} />    
                    )}

                    {Object.keys(grouped).map((group,i) => 
                        <Components.OSSurveyItemsRatingScale key={group} group={group} grouped={grouped} i={i} currentUser={currentUser} surveyListId={surveyListId} />
                    )}

                </div>
            )
        }
    }
}

OSSurveyItemList.displayName = "OSSurveyItemList";

registerComponent({
    name: 'OSSurveyItemList',
    component: OSSurveyItemList
});