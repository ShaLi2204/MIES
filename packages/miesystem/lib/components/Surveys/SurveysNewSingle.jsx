
import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const SurveysNewSingle = (props, context) => {
    return <Components.SurveysNewPage documentId={props.params._id} />
};

SurveysNewSingle.displayName = "SurveysNewSingle";

registerComponent({ name: "SurveysNewSingle", component: SurveysNewSingle});