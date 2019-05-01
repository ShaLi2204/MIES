import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import Users from 'meteor/vulcan:users';
import { Container, Row, Col } from 'reactstrap';

const OpenSurveysListHeader = (props) => {

    const {currentUser} = props;

    return(
        <div className="OpenSurveysListHeaderPage">
            <Container>
                <Row>
                    <Col xs="6">
                    { Users.isAdmin(currentUser) ? <Components.OpenSurveysViews />: null}
                    </Col>
                    <Col xs="6">
                    <Components.SearchForm />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

OpenSurveysListHeader.displayName = "OpenSurveysListHeader";

registerComponent({ name:'OpenSurveysListHeader', component: OpenSurveysListHeader});