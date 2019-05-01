import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withCurrentUser, Components, registerComponent, Utils } from 'meteor/vulcan:core';
import { Spinner } from 'reactstrap';


const SurveysQuestionsThread = (props) => {

    const {loading, results, totalCount, currentUser, terms: {surveyListId}, surveyList } = props;

    console.log(loading);
    console.log(totalCount);

    if (loading) {

        return (
            <div>
                <Components.Loading />
            </div>
        )

    } else {
        
        const resultsClone = _.map(results, _.clone);
        //const resultsClone = Utils.unflatten(resultsClonetemp);

        console.log(resultsClone);

        return(
            <div>
                <div>
                    <Components.SurveyItemsList currentUser={currentUser} loading={loading} surveyItems={resultsClone} surveyItemCount={totalCount} surveyList={surveyList} /*surveyListId={surveyListId}*//>
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

registerComponent({
    name:'SurveysQuestionsThread', 
    component:SurveysQuestionsThread, 
    hocs:[[withList, options], withCurrentUser]});