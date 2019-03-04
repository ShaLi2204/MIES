

import { Components, registerComponent, withMulti, withCurrentUser, Loading, Utils  } from 'meteor/vulcan:core';
import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
//import SurveyLists from '../../modules/Surveys/collection.js';
import { SurveyLists } from '../../modules/Surveys/index.js';
import { Button, ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';

SurveyLists.getLink = function (surveyList, isAbsolute = false, isRedirected = true) {
  const url = isRedirected ? Utils.getOutgoingUrl(surveyList.url) : surveyList.url;
  return !!surveyList.url ? url : SurveyLists.getPageUrl(surveyList, isAbsolute);
}

SurveyLists.getLinkTarget = function(surveyList) {
  return !!surveyList.url ? '__blank':'';
}

class CreatedSurveysList extends Component{

  renderActions() {
    return(
      <div>
        <Components.ModalTrigger label="Edit" title="Edit" component={<Button size="sm" color="primary">Edit</Button>}>
          <Components.SurveysEditForm surveyList={this.props.surveyList}/>
        </Components.ModalTrigger>
      </div>
    )
  }

  render(){

    const {surveyList} = this.props;

    return(

      <div>
        <ListGroup>
          <ListGroupItem>
            <Container>
              <Row>
                <Col xs="6">
                  {/*<Link to={'./surveylist/'+surveyList._id}>*/}
                  <Link to={SurveyLists.getLink(surveyList)} target={SurveyLists.getLinkTarget(surveyList)}>
                    {surveyList.title}
                  </Link>
                </Col>
                <Col xs="6">
                  {SurveyLists.options.mutations.update.check(this.props.currentUser, surveyList) && this.renderActions()}
                  {/*{SurveyLists.options.mutations.update.check(this.props.currentUser, surveyList) ? (
                    <Components.ModalTrigger label="Edit" title="Edit" component={<Button size="sm" color="primary">Edit</Button>}>
                    <Components.SurveysEditForm currentUser={currentUser} surveyList={surveyList} documentId={surveyList._id} refetch={refetch}/>
                    </Components.ModalTrigger>
                  ) : null}      */}          
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

  
registerComponent({name:'Surveys', component: Surveys});