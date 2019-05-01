

import { Components, registerComponent, withMulti, withCurrentUser, Loading, Utils, withUpdate } from 'meteor/vulcan:core';
import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
//import SurveyLists from '../../modules/Surveys/collection.js';
import { SurveyLists } from '../../modules/Surveys/index.js';
import { Button, ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';
/*
SurveyLists.getLink = function (surveyList, isAbsolute = false, isRedirected = true) {
  const url = isRedirected ? Utils.getOutgoingUrl(surveyList.url) : surveyList.url;
  return !!surveyList.url ? url : SurveyLists.getPageUrl(surveyList, isAbsolute);
}

SurveyLists.getLinkTarget = function(surveyList) {
  return !!surveyList.url ? '__blank':'';
}
*/
class Surveys extends Component{

  renderActions() {
    const {surveyList} = this.props;
    return(
      <div>
        <Container>
          <Row>
            <Col xs="3" sm="4">
              <Components.ModalTrigger label="Edit" title="Edit" component={<Button size="sm" color="primary">Edit</Button>}>
                <Components.SurveysEditForm surveyList={this.props.surveyList}/>
              </Components.ModalTrigger>
            </Col>
            <Col xs="3" sm="4" onClick={this.renderPublic.bind(this, surveyList._id)}>
              <Button color="primary" size="sm">Publish</Button>{'   '}
            </Col>
            <Col sm="3" onClick={this.renderClose.bind(this, surveyList._id)}>
              <Button color="primary" size="sm">Close</Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  renderPublic(id) {
    this.props
    .updateSurveyList({
      selector: {documentId: id},
      data: {status: 2}
    });
    swal({
      title: "Survey is now public",
      icon: "success"
    });
  }

  renderClose(id) {
    this.props
    .updateSurveyList({
      selector: {documentId: id},
      data: {status: 3}
    });
    swal({
      title: "Survey is now closed",
      icon: "success"
    });
  }

/*  renderActions() {
    return(
      <div>
        <Components.ModalTrigger label="Edit" title="Edit" component={<Button size="sm" color="primary">Edit</Button>}>
          <Components.SurveysEditForm surveyList={this.props.surveyList}/>
        </Components.ModalTrigger>
      </div>
    )
  }*/

  render(){

    const {surveyList} = this.props;

    return(

      <div>
        <ListGroup>
          <ListGroupItem>
            <Container>
              <Row>
                <Col xs="6">
                  <Link to={SurveyLists.getLinkCreated(surveyList)} target={SurveyLists.getLinkTarget(surveyList)}>
                    {surveyList.title}
                  </Link>
                </Col>
                <Col xs="6">
                  {SurveyLists.options.mutations.update.check(this.props.currentUser, surveyList) && this.renderActions()}
      
                </Col>
              </Row>
            </Container>
          </ListGroupItem>
        </ListGroup>
      </div>

    )
  }
}


Surveys.propTypes = {
  currentUser: PropTypes.object,
  surveyList: PropTypes.object.isRequired,
  terms: PropTypes.object
}

const updateOptions = {
  collectionName: 'SurveyLists'
}

  
registerComponent({
  name:'Surveys', 
  component: Surveys,
  hocs: [[withUpdate, updateOptions]]
});