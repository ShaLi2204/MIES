import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withCurrentUser, Components, registerComponent, Utils } from 'meteor/vulcan:core';

const SurveysQuestionsDisplayPage = (props) => {

    const { loading, surveyListId, results, totalCount, currentUser } = props;

    if(loading) {

        return <div><Components.Loading/></div>

    } else {

        const resultsClone = _.map(results, _.clone);

        return(

            <div>

            <Components.SurveyItemsList currentUser={currentUser} surveyItems={resultsClone} commentCount={totalCount}/>

            </div>

        )
    }
};

SurveysQuestionsDisplayPage.displayName = "SurveysQuestionsDisplayPage";

SurveysQuestionsDisplayPage.propTypes = {
    currentUser: PropTypes.object
};

const options = {
    collectionName: 'SurveyItems',
    queryName: 'surveyItemsListQuery',
    fragmentName: 'SurveyItemsList',
    limit: 0,    
};

registerComponent({name:'SurveysQuestionsDisplayPage', component:SurveysQuestionsDisplayPage, hocs:[[withList, options], withCurrentUser]});