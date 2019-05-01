
import { Components, registerComponent, withMulti, withCurrentUser, Loading, Utils, withUpdate } from 'meteor/vulcan:core';
import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { 
    Button, 
    ListGroup, 
    ListGroupItem, 
    Container, 
    Row, 
    Col, 
    Modal 
} from 'reactstrap';
import { SurveyResponses } from '../../../modules/SurveyResponses/index.js';
import swal from 'sweetalert';

class ParticipatedSurveysTitleList extends Component{

    constructor(props){
        super(props);
        this.state = {
            submitted: props.surveyResponse.status
        }
    }

    PSSubmit(){
        const {surveyResponse} = this.props;
        this.setState({
            submitted: 2
        });
        this.props
        .updateSurveyResponse({
            selector: {documentId: surveyResponse._id},
            data: {status: 2}
        });
        swal({
            title: "Survey Response Submitted!",
            icon: "success"
        });
    }

    PSDelete(){
        const {surveyResponse} = this.props;
        this.props
        .updateSurveyResponse({
            selector: {documentId: surveyResponse._id},
            data: {status: 3}
        });
        swal({
            title: "Survey response deleted",
            icon: "success"
        });
    }

    renderActions(){
        const {surveyResponse} = this.props;
        return(
            <div>
                <div style={{textAlign: 'right', width: '100%'}}>
                    <div style={{display: 'inline-block', marginRight: '5px'}}>
                        <Button size="sm" color="primary" onClick={this.PSSubmit.bind(this)}>Submit</Button>
                    </div>
                    <div style={{display: 'inline-block', marginRight: '5px'}}>
                        <Button size="sm" color="secondary" outline onClick={this.PSDelete.bind(this)}>Delete</Button>
                    </div>
                </div>
            </div>
        )
    }

    render(){

        const {surveyResponse} = this.props;

        return(
            <div>
                <ListGroup>
                    <ListGroupItem>
                        <Row>
                            <Col xs="7">
                                <Link to={SurveyResponses.getLinkParticipated(surveyResponse)} /*target={SurveyResponses.getLinkTarget(surveyResponse)}*/>
                                    {surveyResponse.surveyListTitle}
                                    {surveyResponse.createdAt}
                                </Link>
                            </Col>
                            {/*this.state.submitted==1 ? 
                            <Col xs="5">
                                {SurveyResponses.options.mutations.update.check(this.props.currentUser, surveyResponse) && this.renderActions()}
                            </Col> : null
                            */}

                        </Row>
                    </ListGroupItem>
                </ListGroup>
            </div>
        )

    }

}

const updateOption = {
    collectionName: 'SurveyResponses'
}

ParticipatedSurveysTitleList.propTypes = {
    currentUser: PropTypes.object,
    surveyResponse: PropTypes.object.isRequired,
    terms: PropTypes.object
}

registerComponent({
    name: 'ParticipatedSurveysTitleList',
    component: ParticipatedSurveysTitleList,
    hocs: [[withUpdate, updateOption]]
});