
import React, { PropTypes, Component } from 'react';
import { registerComponent, Components } from 'meteor/vulcan:core';

const SurveysDisplay = ({survey, currentUser}) =>

  <div style={ { paddingBottom: "15px",marginBottom: "15px", borderBottom: "1px solid #ccc" } }>

    <h4>{survey._id} ({survey.title})</h4>

  </div>

registerComponent({name: 'SurveysDisplay', component: SurveysDisplay});