import React, { Component } from 'react';
import { Components, registerComponent, withMulti, withCurrentUser, withList, Loading, getFragment } from 'meteor/vulcan:core';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { SurveyResponses } from '../../../modules/index.js';

const ParticipatedSurveysList = ({ results, currentUser, loading, loadMore, count, totalCount, terms, refetch}) => (
    <div style={{ maxWidth: '500px', margin: '20px auto'}}>
        {loading ? (
            <Loading />
        ) : (
            <div>
                {results.map(surveyResponse => {
                    return <Components.ParticipatedSurveysTitleList key={surveyResponse._id} surveyResponse={surveyResponse} currentUser={currentUser} terms={terms} />
                })}

                { totalCount > results.length ?
                    <a href="#" onClick={e => {e.preventDefault(); loadMore();}}>Load More ({count}/{totalCount})</a> : 
                    <p>No more items.</p>
                }
            </div>
        )}
    </div>
);

ParticipatedSurveysList.displayName = "ParticipatedSurveysList";

ParticipatedSurveysList.propTypes = {
    results: PropTypes.array,
    terms: PropTypes.object,
    totalCount: PropTypes.number
}

const options = {
    collectionName: 'SurveyResponses',
    limit: 5
};

registerComponent({
    name: 'ParticipatedSurveysList',
    component: ParticipatedSurveysList,
    hocs: [withCurrentUser, [withList, options]]
});