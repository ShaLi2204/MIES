import { Components, registerComponent, withDocument, withCurrentUser, getActions, withCreate, withUpdate } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import swal from 'sweetalert';
import {withRouter} from 'react-router';


class OSSurveyItemList extends Component {

    constructor(props){
        super(props);
        this.state = {
            surveyItemAnswers: [],
            surveyResponseId: '',
            statusShow: true,
            statusCheck: props.surveyItems.map((el, i) => "right")
        }
    }

    GoBack() {
        window.history.back();
    }

    /*surveyItemCheck(){
        const {surveyItems} = this.props;
        var statusCheck = this.state.statusCheck;
        console.log(statusCheck);
        surveyItems.map((surveyItem, i) => 
            surveyItem.required==true && (this.state.surveyItemAnswers.length == 0 || this.state.surveyItemAnswers.filter(e => e.surveyItemId === surveyItem._id).length === 0 )? 
            statusCheck[i] = "wrong" : statusCheck[i] = "right"
        );
        this.setState({statusCheck});
    }*/

    SurveyResponsesSave(){
        const {surveyList} = this.props;
        this.props
        .createSurveyResponse({
            data: {
                surveyListId: surveyList._id,
                surveyListTitle: surveyList.title
            }
        })
        .then(result => {
            this.setState({surveyResponseId: result.data.createSurveyResponse.data._id});
            this.state.surveyItemAnswers.map((el, i) => {
                console.log(el);
                this.props
                .createSurveyItemResponse({
                    data: {
                        surveyItemId: el.surveyItemId,
                        surveyItemType: el.surveyItemType,
                        surveyResponseId: result.data.createSurveyResponse.data._id,
                        surveyItemAnswers: el.surveyItemAnswers
                    }
                })
            })
        })
        ;
        swal({
            title: "Survey Response Saved, do you want submit now",
            icon: "success",
            buttons: {
                catch: {
                    text: "Submit",
                    value: "Submit"
                },
                cancel: "Later",
            },
        })
        .then((value) => {
            switch(value) {
                case "Submit":
                    const {surveyItems} = this.props;
                    var statusCheck = this.state.statusCheck;
                    surveyItems.map((surveyItem, i) => 
                        surveyItem.required==true && (this.state.surveyItemAnswers.length == 0 || this.state.surveyItemAnswers.filter(e => e.surveyItemId === surveyItem._id).length === 0 )? 
                        statusCheck[i] = "wrong" : statusCheck[i] = "right"
                    );
                    console.log(statusCheck);
                    if(statusCheck.includes("wrong")) {
                        swal({
                            title: "Please fill in all the required questions!",
                            icon: "warning"
                        })
                    } else {
                        this.setState({statusShow: false});
                        this.props
                        .updateSurveyResponse({
                            selector: {documentId: this.state.surveyResponseId},
                            data: {status: 2}
                        });
                        swal({
                            title: "Survey Response Published!", 
                            icon: "success"
                        })
                        .then(() => {
                            this.props.router.push({pathname: '/'});
                        })
                        ;
                        break; 
                    }
            }
        })
        ;
        console.log("saved");
    }

    surveyItemAnswersUpdate(surveyItemId, surveyItemType, Answers){
        var surveyItemAnswers = this.state.surveyItemAnswers.slice();
        var surveyItemAnswers = surveyItemAnswers.filter(a => a.surveyItemId !== surveyItemId);
        surveyItemAnswers.push(
            {
                surveyItemId: surveyItemId,
                surveyItemType: surveyItemType,
                surveyItemAnswers: JSON.stringify(Answers)
            }
        );
        this.setState({ surveyItemAnswers });
    }

    render(){
        const {surveyItems} = this.props;
        const {currentUser} = this.props;
        const {surveyListId} = this.props;
        const {loading} = this.props;        

        if(loading) {

            return <Components.Loading />
            
        } else {

        return(
            <div>

                {surveyItems.map((surveyItem, i) => 
                <Components.OSSurveyItemsNode 
                    i={i} 
                    currentUser={currentUser} 
                    surveyItem={surveyItem} 
                    key={surveyItem._id} 
                    surveyItems={surveyItems} 
                    loading={loading} 
                    surveyItemAnswersUpdate={this.surveyItemAnswersUpdate.bind(this)}
                    />
                )}

                <div style={{textAlign: 'right', marginTop:'30px'}}>
                {this.state.statusShow && 
                    <div style={{display: 'inline-block', marginRight:'5px'}}>
                        <Button color="primary" onClick={this.SurveyResponsesSave.bind(this)}>Save</Button>
                    </div>
                }
                    <div style={{display: 'inline-block', marginRight:'5px'}}>
                        <Button color="secondary" outline onClick={this.GoBack.bind(this)}>Back</Button>
                    </div>
                    {/*<div style={{display: 'inline-block', marginRight:'5px'}}>
                        <Button color="primary" onClick={this.SurveyResponseSubmit.bind(this)}>Submit</Button>
                    </div>*/}
                </div>
            </div>
        )}
    }
}

const createOptions = {
    collectionName: 'SurveyResponses'
}

const createOptionsItem = {
    collectionName: 'SurveyItemResponses'
}

const updateOption = {
    collectionName: 'SurveyResponses'
}

OSSurveyItemList.displayName = "OSSurveyItemList";

registerComponent({ 
    name: 'OSSurveyItemList', 
    component: OSSurveyItemList,
    hocs: [[withCreate, createOptions], [withCreate, createOptionsItem], [withUpdate, updateOption], withRouter]
});