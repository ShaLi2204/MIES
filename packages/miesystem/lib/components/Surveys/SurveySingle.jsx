import React from 'react';
import { registerComponent, Components, withSingle, getFragment } from 'meteor/vulcan:core';
//import SurveyLists from '../../modules/Surveys/collection';
import { Link } from 'react-router';
import { Container, Row, Col, ListGroup, ListGroupItem, Table } from 'reactstrap';

const SurveySingle = (props, context) => {

  return <Components.SurveysPage documentId={props.params._id} />

};

SurveySingle.displayName = "SurveySingle";

registerComponent({ name: 'SurveySingle', component: SurveySingle});