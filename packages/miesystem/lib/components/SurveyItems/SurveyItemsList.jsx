
import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
//import SurveyItems from '../../modules/SurveyItem/collection';
import { FormattedMessage } from 'meteor/vulcan:i18n';
//import { defaultProps } from 'recompose';


const SurveyItemsList = ({surveyItems, surveyItemCount, currentUser}) => {

    if(surveyItemCount > 0) {
        return(

            <div>
    
                {surveyItems.map(surveyItem => <Components.SurveyItemsNode currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} />)}
    
            </div>

        )
    } else {
        return (
            <div>
                <p>
                    <FormattedMessage id="comments.no_comments"/>
                </p>
            </div>
        )
    }


};

SurveyItemsList.displayName = "SurveyItemsList";

registerComponent({ name: 'SurveyItemsList', component: SurveyItemsList});