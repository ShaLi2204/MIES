import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const OpenSurveysHome = (props, context) => {
    const terms = _.isEmpty(props.location && props.location.query) ? {view: 'public'}: props.location.query;
    return <Components.OpenSurveysList terms={terms} />
};

OpenSurveysHome.displayName = "OpenSurveysHome";

registerComponent({ name: 'OpenSurveysHome', component: OpenSurveysHome});