import React from 'react';
import { registerComponent, Components, withSingle, getFragment } from 'meteor/vulcan:core';
import { Link } from 'react-router';

const OpenSurveysSingle = (props, context, surveyList) => {

    return (
    <div>

        {console.log(props.params.id)}
        {/*console.log(props.location.state.surveyResponseId)*/}

        <Components.OpenSurveysPage documentId={props.params.id} /*surveyResponseId={props.location.state.surveyResponseId}*//>

    </div>

    )

};

OpenSurveysSingle.displayName = "OpenSurveysSingle";

registerComponent({ name: 'OpenSurveysSingle', component: OpenSurveysSingle});