import React from 'react';
import { registerComponent, Components, withSingle, getFragment } from 'meteor/vulcan:core';
import { Link } from 'react-router';

const OpenSurveysSingle = (props, context, surveyList) => {

    return (
    <div>

        <Components.OpenSurveysPage documentId={props.params.id} />

    </div>

    )

};

OpenSurveysSingle.displayName = "OpenSurveysSingle";

registerComponent({ name: 'OpenSurveysSingle', component: OpenSurveysSingle});