
import React, { Component } from 'react';
import { Components, registerComponent, withMulti, withCurrentUser, withList, Loading, getFragment } from 'meteor/vulcan:core';
//import SurveyLists from '../../modules/Surveys/collection.js';
import { SurveyLists } from '../../modules/Surveys/index.js';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const SurveysList = ({ results, currentUser, loading, loadMore, count, totalCount, terms, refetch }) => (
    <div style={{ maxWidth: '500px', margin: '20px auto' }}>  
      {loading ? (
        <Loading />
      ) : (
        <div>
          {results.map(surveyList => {
            return <Components.Surveys key={surveyList._id} surveyList={surveyList} currentUser={currentUser} terms={terms}/>;
          })}
  
          { totalCount > results.length ?
            <a href="#" onClick={e => {e.preventDefault(); loadMore();}}>Load More ({count}/{totalCount})</a> : 
            <p>No more items.</p>
         }
        </div>
      )}
    </div>
);

SurveysList.displayName = "SurveysList";

SurveysList.propTypes = {
  results: PropTypes.array,
  terms: PropTypes.object,
  totalCount: PropTypes.number

}

const options = {
  collection: SurveyLists,
  //fragmentName: 'SurveysItemFragment',
  limit: 5
};

registerComponent({ name: 'SurveysList', component: SurveysList, hocs: [withCurrentUser, [withList, options]]});