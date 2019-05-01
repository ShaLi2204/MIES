import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

const OpenSurveysQuestionThread = (props) => {

    const { loading, results, totalCount, currentUser, terms, surveyList } = props;

    if(loading) {

        return <Components.Loading/>

    } else {

        const resultsClone = _.map(results, _.clone);

        return(
            <div>
                <Components.OSSurveyItemList currentUser={currentUser} surveyItems={resultsClone} surveyItemCount={totalCount} />
            </div>
        )
    }
};

OpenSurveysQuestionThread.displayName = "OpenSurveysQuestionThread";

OpenSurveysQuestionThread.propTypes = {
    currentUser: PropTypes.object
};

const options = {
    collectionName: 'SurveyItems',
    queryName: 'openSurveysSurveyItemQuery',
    limit: 0
};

registerComponent({
    name: 'OpenSurveysQuestionThread',
    component: OpenSurveysQuestionThread,
    hocs:[[withList, options], withCurrentUser]
});