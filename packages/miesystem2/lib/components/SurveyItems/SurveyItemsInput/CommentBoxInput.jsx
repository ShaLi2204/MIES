import React, { Component } from 'react';
import { Components, registerComponent, withCreate } from 'meteor/vulcan:core';
import { Button, Input } from 'reactstrap';
import swal from 'sweetalert';

class CommentBoxInput extends Component {

    CommentBoxInputSave(id, qv, ir){
        if (!qv) {
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
                    surveyItemType: 'CommentBox',
                    required: ir
                }
            });
            this.props.clearFunc();
        }
    }

    render(){

        const questionValue = this.props.questionValue;
        const surveyListId = this.props.surveyListId;
        const isRequired = this.props.isRequired;

        return(
            <div className="CommentBoxInputBtns">
                <Button outline onClick={this.props.cancelFunc.bind(this)}>Cancel</Button>{'   '}
                <Button color="primary" onClick={this.CommentBoxInputSave.bind(this, surveyListId, questionValue, isRequired)}>Save</Button>
                <br/><br/>
            </div>
        )
    }
}

const createOptions = {
    collectionName: 'SurveyItems'
};

registerComponent({
    name: 'CommentBoxInput',
    component: CommentBoxInput,
    hocs: [[withCreate, createOptions]]
});