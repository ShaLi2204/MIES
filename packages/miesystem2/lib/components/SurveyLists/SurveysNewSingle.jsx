import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

const SurveysNewSingle = (props, context) => {


    return <Components.SurveysNewPage documentId={props.params._id} />

};

SurveysNewSingle.displayName = "SurveysNewSingle";


registerComponent({ name: "SurveysNewSingle", component: SurveysNewSingle});