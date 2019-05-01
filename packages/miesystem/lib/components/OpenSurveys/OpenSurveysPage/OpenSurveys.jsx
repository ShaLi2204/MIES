import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router';
import { SurveyLists } from '../../../modules/Surveys/index.js';
import { Button, ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';

class OpenSurveys extends PureComponent{

    render() {

        const {surveyList} = this.props;

        return(

            <div>
                <ListGroup>
                    <ListGroupItem>
                    <Container>
                        <Row>
                            <Col>
                            <Link to={SurveyLists.getLinkOpenSurveys(surveyList)} /*target={SurveyLists.getLinkTarget(surveyList)}*/>
                                {surveyList.title}
                            </Link>
                            </Col>
                        </Row>
                    </Container>
                    </ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}

OpenSurveys.propTypes = {
    currentUser: PropTypes.object,
    surveyList: PropTypes.object.isRequired,
    terms: PropTypes.object
}

registerComponent({ name:'OpenSurveys', component: OpenSurveys});