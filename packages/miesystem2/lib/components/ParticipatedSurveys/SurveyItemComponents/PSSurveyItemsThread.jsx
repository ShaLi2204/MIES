import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withDocument,  withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

const PSSurveyItemsThread = (props) => {

    const {loading, results, currentUser, terms, surveyList, surveyResponse} = props;

    if(loading) {

        return <Components.Loading  />

    } else {

        return (
            <div>
                <Components.PSSurveyItemList
                    terms={{surveyListId: surveyList._id, view: 'surveyListSurveyItems'}}
                    surveyResponse={surveyResponse}
                />
            </div>
        )
    }
}

PSSurveyItemsThread.displayName = "PSSurveyItemsThread";

PSSurveyItemsThread.propTypes = {
    currentUser: PropTypes.object
};

const option = {
    collectionName: 'SurveyLists',
    queryName: 'PSSurveyItemsQuery',
    limit: 0
};

registerComponent({
    name: 'PSSurveyItemsThread',
    component: PSSurveyItemsThread,
    hocs: [[withDocument, option], withCurrentUser]
});