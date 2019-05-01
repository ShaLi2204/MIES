import React, { Component } from 'react';
import { Components, registerComponent, withMessages, withUpdate, withCreate, withDelete, newMutation, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import { Button, Input } from 'reactstrap';
import swal from 'sweetalert';
import PropTypes from 'prop-types';

class TextBoxInput extends Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    TextBoxSave(id, qv, ir){
        if(!qv ){
            swal({
                title: "Please input a question!",
                icon: "warning"
            })
        } else {
        this.props
        .createSurveyItem({
            data: {
                surveyListId: id,
                surveyItemQuestion: qv,
                surveyItemType: 'TextBox',
                required: ir
            }
        });
        this.props.clearFunc();
        }
    }

    render(){

        const questionValue = this.props.questionValue;
        const surveyListId = this.props.surveyListId;
        //const {surveyList} = this.props;
        const isRequired = this.props.isRequired;

        return(
            <div className="CommentBoxInputBtns">
                <Button outline onClick={this.props.cancelFunc.bind(this)}>Cancel</Button>{'  '}
                <Button color="primary" onClick={this.TextBoxSave.bind(this, surveyListId, questionValue, isRequired)}>Save</Button>
                <br/><br/>
            </div>
        )
    }
}

const createOptions = {
    collectionName: 'SurveyItems'
}

TextBoxInput.propTypes = {
    surveyListId: PropTypes.string.isRequired,
    successCallback: PropTypes.func,
    cancelCallback: PropTypes.func,
}

registerComponent({ 
    name: 'TextBoxInput', 
    component: TextBoxInput, 
    hocs:[withMessages, [withCreate, createOptions]]
});