import React, { Component } from 'react';
import { Components, registerComponent, withUpdate, withCreate, withDelete, newMutation, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import { Button, Input } from 'reactstrap';
import swal from 'sweetalert';

class TextBoxInput extends Component{

    TextBoxSave(id, qv, ir){
        if(!qv /*|| isNaN(qv) */){
            swal({
                title: "Please input a question!",
                icon: "warning"
            })
        } else {
        this.props
        .createSurveyItem({
            data: {
                surveyListId: id,
                label: qv,
                surveyItemType: 'TextBox',
                required: ir
            }
        });
        this.props.clearFunc();}
    }

    render(){

        const questionValue = this.props.questionValue;

        return(
            <div className="CommentBoxInputBtns">
                {/*<Input type="checkbox" onChange={this.CheckBoxFunc.bind(this)}/> {' '}Required */}
                <Button outline onClick={this.props.cancelFunc.bind(this)}>Cancel</Button>{'  '}
                <Button color="primary" onClick={this.TextBoxSave.bind(this, this.props.surveyListId, questionValue, this.props.isRequired)}>Save</Button>
                <br/><br/>
            </div>
        )
    }
}

const createOptions = {
    collectionName: 'SurveyItems'}

registerComponent({ name: 'TextBoxInput', component: TextBoxInput, hocs:[[withCreate, createOptions]]});