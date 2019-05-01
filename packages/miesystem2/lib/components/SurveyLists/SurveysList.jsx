
import React, { Component } from 'react';
import { Components, registerComponent, withMulti, withCurrentUser, withList, Loading, getFragment } from 'meteor/vulcan:core';
import { SurveyLists } from '../../modules/SurveyLists/index.js';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

//const SurveysList = ({ results, currentUser, loading, loadMore, count, totalCount, terms, refetch }) => (

class SurveysList extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){

    const {currentUser} = this.props;
    const {loading} = this.props;

    console.log(loading);

    if(loading) {

      return <Components.Loading />

    } else {

      const {results} = this.props;
      const {currentUser} = this.props;
      const {loadMore} = this.props;
      const {count} = this.props;
      const {totalCount} = this.props;
      const {terms} = this.props;

      const resultsClone = _.map(results, _.clone);

      return (
        <div style={{ maxWidth: '500px', margin: '20px auto' }}>  

          <div>
            {console.log(resultsClone)}
            {resultsClone.map(surveyList => {
              return <Components.Surveys key={surveyList._id} surveyList={surveyList} currentUser={currentUser} terms={terms}/>;
            })}
    
            { totalCount > resultsClone.length ?
              <a href="#" onClick={e => {e.preventDefault(); loadMore();}}>Load More ({count}/{totalCount})</a> : 
              <p>No more items.</p>
           }
          </div>
      </div>
      )
    }
  }
}

SurveysList.displayName = "SurveysList";

SurveysList.propTypes = {
  results: PropTypes.array,
  terms: PropTypes.object,
  totalCount: PropTypes.number,
  loading: PropTypes.bool

}

const options = {
  collection: SurveyLists,
  //fragmentName: 'SurveysItemFragment',
};

registerComponent({ name: 'SurveysList', component: SurveysList, hocs: [withCurrentUser, [withList, options]]});