/*

Created Surveys Page

*/

import { Components, registerComponent, withUpdate, withCreate, withDelete, newMutation, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import { SurveyLists } from '../../modules/Surveys/index.js';
import { SurveyItems } from '../../modules/SurveyItem/index.js';
import { Promise } from 'meteor/promise';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class SurveyItemsNewTest extends Component{
    constructor(){
        super();
        this.state = {
            seedData: {/*_id:'1',*/label: 'a'},
            questionValue: ''
        }
    }

    createfunc(){
        const seedData = this.state.seedData;
        this.props
        .createSurveyItem({
            data: seedData
        })
        .then(console.log("works!"))
    }

    updatefunc(){
        const surveyItemId = '3RuPMCRdJ65GTBMie';
        this.props
        .updateSurveyItem({
            selector: { documentId: surveyItemId },
            data: {label: "works???"}
        })
        .then(console.log('works!'))
        .catch(console.log('error!'))
    }

    deletefun(){
        const surveyItemId = '3RuPMCRdJ65GTBMie';
        this.props
        .deleteSurveyItem({
            selector: {documentId: surveyItemId}
        })
        .then(console.log("deleted"));
    }

    updateValue(event){
        this.setState({
            questionValue: event.target.value
        })
    }

    Submitfunc(t){
        this.props
        .createSurveyItem({
            data: {
                surveyListId: t,
                label: this.state.questionValue
            }
        });
        alert('saved!');
    }

    render(){
        const seedData = this.state.seedData;
        const {surveyList} = this.props;
        //const { SurveyLists } = this.props.SurveyLists;
        return(
            <div>
                <div>
                    <Form>
                        <FormGroup>
                            <Label>question</Label>
                            <Input placeholder="Please input a question" onChange={this.updateValue.bind(this)}>
                            </Input>
                        </FormGroup>
                    </Form>
                    <Button onClick={this.Submitfunc.bind(this, surveyList._id)}>Submit</Button>
                </div>
                test
                {surveyList._id}
                <div>
                <button onClick={this.createfunc.bind(this)}>Create</button>
                <button onClick={this.updatefunc.bind(this)}>Update</button>
                <button onClick={this.deletefun.bind(this)}>Delete</button>
                </div>
            </div>

        )
    }
}

const createOptions = {
    collectionName: 'SurveyItems',
    fragmentName: 'SurveyItemsList'
}

const deleteOptions = {
    collectionName: 'SurveyItems'
}

const updateOptions = {
    collectionName: 'SurveyItems'
}

registerComponent({
    name: 'SurveyItemsNewTest', 
    component: SurveyItemsNewTest, 
    hocs: [[withCreate,createOptions],
        [withDelete, deleteOptions], 
        [withUpdate, updateOptions]] 
    });
