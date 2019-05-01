
import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
//import SurveyItems from '../../modules/SurveyItem/collection';
import { FormattedMessage } from 'meteor/vulcan:i18n';

class SurveyItemsList extends Component {

    renderConsole(t){
        console.log(t)
        return(
            <div>Function called</div>
        )
    }

    render(){
        const {surveyItems} = this.props;
        const {currentUser} = this.props;
        const {surveyListId} = this.props;
        const {loading} = this.props;

        //const newsurveyItems = surveyItems.filter(obj => obj.culture.find(o => o.surveyItemType ==="RatingScale"));
        const surveyItemsRatingScale = surveyItems.filter(surveyItem => surveyItem.surveyItemType ==='RatingScale');
        const surveyItemsOthers = surveyItems.filter(surveyItem => surveyItem.surveyItemType !=='RatingScale');
        const grouped = _.groupBy(surveyItemsRatingScale, 'matrixSurveyItemId');
        

        if(loading) {

            return <Components.Loading />
            
        } else {

        return(
            <div>

                {surveyItemsOthers.map((surveyItem, i) => 
                <Components.SurveyItemsNode i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyItems={surveyItems} />
                )}

                {Object.keys(grouped).map((group, i) => 
                <Components.SurveyItemRatingScale key={group} group={group} grouped={grouped} i={i} currentUser={currentUser} surveyListId={surveyListId} />
                )}

            </div>
        )}
    }
}

SurveyItemsList.displayName = "SurveyItemsList";

registerComponent({ name: 'SurveyItemsList', component: SurveyItemsList});