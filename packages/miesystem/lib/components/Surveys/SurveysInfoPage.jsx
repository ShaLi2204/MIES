
import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router';
//import SurveyLists from '../../modules/Surveys/collection';
import { SurveyLists } from '../../modules/Surveys/index.js';
import moment from 'moment';
import { Button, Container, Row, Col, ListGroup, ListGroupItem, Table } from 'reactstrap';


class SurveysInfoPage extends PureComponent{

    renderActions(){
        return(
            <div>
                <Components.ModalTrigger label="Edit" title="Edit" component={<Button size="sm" color="primary">Edit</Button>}>
                <Components.SurveysEditForm surveyList={this.props.surveyList}/>
                </Components.ModalTrigger>            
             </div>
        )
    }

    GoBack(){
        window.history.back();
    }

    render(){

        const {surveyList} = this.props;

        return(
            <div>
                <Table bordered size="sm">
                <tbody>
                    <tr>
                    <th scope="row">Title</th>
                    <td>
                    {surveyList.title}
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">Creation time</th>
                    <td>
                        {surveyList.createdAt}
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">Description</th>
                    <td>{surveyList.description}</td>
                    </tr>
                    <tr>
                    <th scope="row">Survey Status</th>
                    <td>{SurveyLists.getStatusName(surveyList)}</td>
                    </tr>
                </tbody>
                </Table>
                <Container>
                    <Row>
                        <Col xs="6">
                            {SurveyLists.options.mutations.update.check(this.props.currentUser, surveyList) && this.renderActions()}
                        </Col>
                        <Col xs="6">
                            {/*<Link to="/surveyList">Back to Survey List</Link>*/}
                            <Button color="primary" size="sm" onClick={this.GoBack.bind(this)}>Go Back</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

SurveysInfoPage.displayName = "SurveysInfoPage";

SurveysInfoPage.propTypes = {
    currentUser: PropTypes.object,
    surveyList: PropTypes.object.isRequired,
    terms: PropTypes.object
}

registerComponent({name:'SurveysInfoPage', component: SurveysInfoPage});