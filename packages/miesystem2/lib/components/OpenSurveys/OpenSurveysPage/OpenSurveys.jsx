import { Components, registerComponent, withCreate } from 'meteor/vulcan:core';
import React, { PureComponent, Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router';
import { SurveyLists } from '../../../modules/SurveyLists/index.js';
import { 
    Button, 
    ListGroup, 
    ListGroupItem, 
    Container, 
    Row, 
    Col, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import swal from 'sweetalert';

class OpenSurveys extends Component{

    constructor(props){
        super(props);
        this.state = {
            isOpenInfo: false,
            isOpenAnswer: false,
            PWInput: '',
            surveyResponseId: ''
        }
    }

    InfoClick(){
        this.setState({
            isOpenInfo: true,
            isOpenAnswer: false
        })
    }

    CloseInfoModal(){
        this.setState({
            isOpenInfo: false,
            isOpenAnswer: false
        })
    }

    AnswerClick(){
        const {surveyList} = this.props;
        this.setState({
            isOpenInfo: false,
            isOpenAnswer: true,
        });
    }

    CloseAnswerModal(){
        this.setState({
            isOpenInfo: false,
            isOpenAnswer: false,
        })
    }

    PWInputFunc(e) {
        this.setState({
            PWInput: event.target.value
        })
    }
/*
    GoToSurvey(){
        const {surveyList} = this.props;
        this.props
        .createSurveyResponse({
            data: {
                surveyListId: surveyList._id,
                surveyListTitle: surveyList.title,
            }
        })
        .then(result => {
            this.setState({
                surveyResponseId: result.data.createSurveyResponse.data._id
            })
        }
        );
    }
*/
    GoToSurvey(){
        const {surveyList} = this.props;
        this.props.router.push({pathname: SurveyLists.getLinkOpenSurveys(surveyList)});
    }

    render() {

        const {surveyList} = this.props;
        console.log(surveyList.surveyItems);

        return(

            <div style={{maxWidth: '500px', margin: '20px auto'}}>
                <ListGroup>
                    <ListGroupItem>
                    <Container>
                        <Row>
                            <Col xs="8">
                                {surveyList.title}
                            </Col>
                            <Col xs="auto">
                            <div style={{textAlign: 'right', width: '100%'}}>
                                <div style={{display: 'inline-block', marginRight: '5px'}}>
                                    <Button size="sm" color="primary" onClick={this.InfoClick.bind(this)}>Info</Button>
                                </div>
                                <div style={{display: 'inline-block', marginRight: '5px'}}>
                                    <Button size="sm" color="primary" onClick={this.AnswerClick.bind(this)}>Answer</Button>
                                </div>
                            </div>
                            </Col>
                        </Row>
                    </Container>
                    </ListGroupItem>
                </ListGroup>

                {/*-------------------------------------------------------- Modal for survey info --------------------------------------------------------------------------*/}
                <Modal isOpen={this.state.isOpenInfo}>
                    <ModalHeader>
                        {surveyList.title}
                    </ModalHeader>
                    <ModalBody>
                        {surveyList.description}
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" outline onClick={this.CloseInfoModal.bind(this)}>Cancel</Button>
                        <Button size="sm" color="primary" onClick={this.AnswerClick.bind(this)}>Answer</Button>
                    </ModalFooter>
                </Modal>

                {/*-------------------------------------------------------- Modal for survey Answer Password if needed --------------------------------------------------------------------------*/}
                <Modal isOpen={this.state.isOpenAnswer}>
                    <ModalHeader>
                        {surveyList.title}
                    </ModalHeader>
                    {surveyList.password ? 
                    <div>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label>Please input the right password</Label>
                                    <Input placeholder="password" onChange={this.PWInputFunc.bind(this)} />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button size="sm" outline onClick={this.CloseAnswerModal.bind(this)}>Cancel</Button>
                            {surveyList.password===this.state.PWInput ? 
                                <Button size="sm" color="primary" onClick={this.GoToSurvey.bind(this)}>Go!</Button>
                             : null
                            }
                        </ModalFooter>
                    </div> : 
                    <div>
                    <ModalBody>
                        This is a public survey. Please click Go! to fill out the survey!
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" outline onClick={this.CloseAnswerModal.bind(this)}>Cancel</Button>
                        <Button size="sm" color="primary" onClick={this.GoToSurvey.bind(this)}>Go!</Button>
                    </ModalFooter>
                    </div>
                    }
                </Modal>
            </div>
        )
    }
}

const createOption = {
    collectionName: 'SurveyResponses'
}

OpenSurveys.propTypes = {
    currentUser: PropTypes.object,
    surveyList: PropTypes.object.isRequired,
    terms: PropTypes.object,
}

registerComponent({ 
    name:'OpenSurveys', 
    component: OpenSurveys,
    hocs: [withRouter, [withCreate, createOption]]
});