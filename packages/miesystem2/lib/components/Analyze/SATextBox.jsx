import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withCurrentUser, Components, registerComponent, withDocument, Utils } from 'meteor/vulcan:core';
import {
    Alert, 
    Button, 
    Container, 
    Row, 
    Col, 
    Form, 
    FormGroup,
    Input, 
    ListGroup,
    ListGroupItem,
    Label,
    Modal, 
    ModalHeader, 
    ModalFooter,
    ModalBody,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from 'reactstrap';

class SATextBox extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        const {loading} = this.props;

        if(loading) {
            
            return <Components.Loading />

        } else {

            const {surveyItemResponses} = this.props;

            return(
                <div>
                    <ListGroup flush style={{marginTop: '20px'}}> 
                    {surveyItemResponses.map((surveyItemResponse, i) => 
                        <ListGroupItem key={i}>
                            {JSON.parse(surveyItemResponse.surveyItemAnswers)}
                        </ListGroupItem>
                    )}
                    </ListGroup>
                </div>
            )
                
        }

    }
}


registerComponent({
    name: 'SATextBox', 
    component: SATextBox
});