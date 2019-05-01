import React from 'react';
import { registerComponent, Components, withSingle, getFragment } from 'meteor/vulcan:core';
import { Link } from 'react-router';

const ParticipatedSurveysSingle = (props, context, surveyList) => {

    return (
    <div>
        {/*console.log(props.location.state.surveyResponseId)*/}

        <Components.ParticipatedSurveysPage documentId={props.params._id} /*surveyResponseId={props.location.state.surveyResponseId}*//>

    </div>

    )

};

ParticipatedSurveysSingle.displayName = "ParticipatedSurveysSingle";

registerComponent({ 
    name: 'ParticipatedSurveysSingle', 
    component: ParticipatedSurveysSingle
});