import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withCurrentUser, Components, registerComponent, Utils } from 'meteor/vulcan:core';


const SurveysQuestionsThread = (props) => {

    const {loading, results, totalCount, surveyItemsCount, currentUser, terms, surveyList } = props;

    if (loading) {

        return <div><Components.Loading/></div>

    } else {
        
        const resultsClone = _.map(results, _.clone);
        //const nestedSurveyItems = Utils.unflatten(resultsClone, {idProperty: '_id'});

        return(
            <div>
                <div>
                    <Components.SurveyItemsList currentUser={currentUser} surveyItems={resultsClone} surveyItemCount={totalCount} /*surveyListId={surveyListId}*//>
                </div>
            </div>
        );
    }
};

SurveysQuestionsThread.displayName = "SurveysQuestionsThread";

SurveysQuestionsThread.propTypes = {
    currentUser: PropTypes.object
};

const options = {
    collectionName: 'SurveyItems',
    queryName: 'surveyItemsListQuery',
    fragmentName: 'SurveyItemsList',
    limit: 0,
};

registerComponent({name:'SurveysQuestionsThread', component:SurveysQuestionsThread, hocs:[[withList, options], withCurrentUser]});