import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

const ParticipatedSurveysQuestionThread = (props) => {

    const { loading, results, totalCount, currentUser, terms, surveyList, /*surveyResponseId*/ } = props;

    if(loading) {

        return <Components.Loading/>

    } else {

        const resultsClone = _.map(results, _.clone);

        return(
            <div>
                {console.log(results)}
                <Components.PSSurveyItemList currentUser={currentUser} surveyItemResponses={resultsClone} /*surveyResponseId={surveyResponseId}*//>
            </div>
        )
    }
};

ParticipatedSurveysQuestionThread.displayName = "ParticipatedSurveysQuestionThread";

ParticipatedSurveysQuestionThread.propTypes = {
    currentUser: PropTypes.object
};

const options = {
    collectionName: 'SurveyItemResponses',
    queryName: 'ParticipatedSurveysQuestionThreadQuery',
    limit: 0
};

registerComponent({
    name: 'ParticipatedSurveysQuestionThread',
    component: ParticipatedSurveysQuestionThread,
    hocs:[[withList, options], withCurrentUser]
});