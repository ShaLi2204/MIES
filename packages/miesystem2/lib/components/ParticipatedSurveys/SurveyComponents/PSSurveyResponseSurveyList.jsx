import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withDocument, withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

const PSSurveyResponseSurveyList = (props) => {

    const { loading, results, currentUser, terms, surveyResponse } = props;

    if(loading) {

        return <Components.Loading />

    } else {

        const resultsClone = _.map(results, _.clone);
        const surveyList = resultsClone[0];

        return(            
            <div>
                
                <Components.PSSurveyItemsThread
                    surveyList={surveyList}
                    surveyResponse={surveyResponse}
                />
                
                
            </div>
        )
    }
}

PSSurveyResponseSurveyList.displayName = "PSSurveyResponseSurveyList";

PSSurveyResponseSurveyList.propTypes = {
    currentUser: PropTypes.object
}

const resultsOptions = {
    collectionName: 'SurveyLists',
    queryName: 'ResultsSurveyResponse2SurveyListQuery'
}

registerComponent({
    name: 'PSSurveyResponseSurveyList',
    component: PSSurveyResponseSurveyList,
    hocs: [[withList, resultsOptions], withCurrentUser]
})
;