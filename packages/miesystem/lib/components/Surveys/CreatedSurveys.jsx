import {
    Components,
    Loading,
    registerComponent,
    getRawComponent,
    getFragment,
    withCurrentUser,
    withMessages,
    withList,
    withMulti
} from 'meteor/vulcan:core';
import React, { Component } from 'react';
//import SurveyLists from '../../modules/Surveys/collection.js';
import PropTypes from 'prop-types';


const CreatedSurveys = (props, context, currentUser) => {

    return(
        <div>
            {props.currentUser._id}
        {!!props.currentUser? 
        <div>
            <Components.SurveysUsersProfile userId={props.currentUser._id} /*slug={props.params.slug}*//>
        </div> : null}
        </div>
    )
};

CreatedSurveys.displayName = "CreatedSurveys";
/*
CreatedSurveys.propTypes = {
    results: PropTypes.array,
    term: PropTypes.object,
    totalCount: PropTypes.number
};

const options = {
    collection: SurveyLists
};
*/
registerComponent({ name: 'CreatedSurveys', component: CreatedSurveys, hocs:[withCurrentUser] });