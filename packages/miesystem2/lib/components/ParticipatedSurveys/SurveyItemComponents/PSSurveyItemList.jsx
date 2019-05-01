import { Components, registerComponent, withList, withUpdate, withDocument, withCurrentUser, getActions, withCreate } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import { 
    Button, 
    Container, 
    Row, 
    Col 
} from 'reactstrap';
import { withRouter } from 'react-router';
import swal from 'sweetalert';
import { SurveyItemResponses } from '../../../modules/SurveyItemResponses/index.js';


class PSSurveyItemList extends Component{

    constructor(props){
        super(props);
        this.state = {
            surveyItemAnswersUpdate: [],
            statusShow: props.surveyResponse.status
            }
    }

    GoBack() {
        window.history.back();
    }

    PSSurveyItemUpdateSave(surveyItemId, surveyItemType, surveyItemResponseId, Updates){
        var surveyItemAnswersUpdate = this.state.surveyItemAnswersUpdate.slice();
        var surveyItemAnswersUpdate = surveyItemAnswersUpdate.filter(a => a.surveyItemResponseId !== surveyItemResponseId);
        surveyItemAnswersUpdate.push(
            {  
                surveyItemId: surveyItemId,
                surveyItemType: surveyItemType,
                surveyItemResponseId: surveyItemResponseId,
                surveyItemResponseUpdate: JSON.stringify(Updates)
            }
        );
        this.setState({ surveyItemAnswersUpdate });
        console.log(surveyItemAnswersUpdate);
    }

    PSSurveyItemUpdateSaveDB(){
        const {surveyResponse} = this.props;
        const {results} = this.props;
        console.log(this.state.surveyItemAnswersUpdate);
        this.state.surveyItemAnswersUpdate.map((el, i) => {
            if(el.surveyItemResponseId==="NONE"){
                this.props
                .createSurveyItemResponse({
                    data: {
                        surveyItemId: el.surveyItemId, 
                        surveyItemType: el.surveyItemType, 
                        surveyResponseId: surveyResponse._id,
                        surveyItemAnswers: el.surveyItemResponseUpdate
                    }
                })
            } else {
                this.props
                .updateSurveyItemResponse({
                    selector: {documentId: el.surveyItemResponseId},
                    data: {surveyItemAnswers: el.surveyItemResponseUpdate}
                })
            }
        });
        swal({
            title: "Changes saved, do you want to submit now?",
            icon: "success",
            buttons:{
                catch: {
                    text: "Submit",
                    value: "Submit"
                },
                cancel: "Later",
            }
        })
        .then((value) => {
            switch(value) {
                case "Submit":
                    const statusCheck = this.props.results.map((el, i) => "right");
                    results.map((surveyItem, i) => 
                    surveyItem.required==true && (this.state.surveyItemAnswersUpdate.length == 0 || this.state.surveyItemAnswersUpdate.filter(e => e.surveyItemId === surveyItem._id).filter(e => e.surveyItemResponseUpdate !== JSON.stringify("")).length === 0 )? 
                    statusCheck[i] = "wrong" : statusCheck[i] = "right"                        
                    );
                    console.log(statusCheck);
                    if(statusCheck.includes("wrong")) {
                        swal({
                            title: "Please fill in all the required questions!",
                            icon: "warning"
                        })              
                    } else {
                        this.setState({statusShow: 2});
                        this.props
                        .updateSurveyResponse({
                            selector: {documentId: surveyResponse._id},
                            data: {status: 2}
                        });
                        swal({
                            title: "Survey Response Submitted!",
                            icon: "success"
                        })
                        .then(() => {
                            // Go to the homepage
                            this.props.router.push({pathname: '/'})
                        })
                        ;
                    };
                    break;
                default:
                    window.location.reload();
                    break;
            }
        })
        ;
    }

    PSSubmitSurvey(){
        const {surveyResponse} = this.props;
        this.state.surveyItemAnswersUpdate.map((el, i) => {
            this.props
            .updateSurveyItemResponse({
                selector: {documentId: el.surveyItemResponseId},
                data: {surveyItemAnswers: el.surveyItemResponseUpdate}
            })
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

    PSDeleteSurveyResponse(id){
        swal({
            title: 'Are you sure you want to delete this survey response?',
            text: 'Once deleted, you will not be able to recove this file!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if(willDelete) {
                this.props
                .updateSurveyResponse({
                    selector: {documentId: id},
                    data: {status: 3}
                });
                swal({
                    title: 'Survey Response Deleted!',
                    icon: 'success'
                })
                .then(()=> {
                    this.props.router.push({pathname: '/'}); 
                })

            }
            else {

            }
        })
    }



    render(){

        const {results} = this.props;
        const {surveyResponse} = this.props;
        const {loading} = this.props;
        const {currentUser} = this.props;

        if(loading) {
            
            return <Components.Loading />
       
        } else {

            return(
                <div>
                    {results.map((surveyItem, i) => 
                        <Components.PSSurveyItemsNode
                            surveyItem={surveyItem}
                            surveyResponse={surveyResponse}
                            i={i}
                            loading={loading}
                            key={surveyItem._id}
                            currentUser={currentUser}
                            PSSurveyItemUpdateSave={this.PSSurveyItemUpdateSave.bind(this)}
                        />
                    )}


                    {this.state.statusShow==1 ?
                    <div style={{textAlign: 'right', marginTop:'30px'}}>
                        <div style={{display: 'inline-block', marginRight:'5px'}}>
                            <Button color="primary" onClick={this.PSSurveyItemUpdateSaveDB.bind(this)}>Save</Button>
                        </div>
                        <div style={{display: 'inline-block', marginRight:'5px'}}>
                            <Button color="secondary" outline onClick={this.GoBack.bind(this)}>Back</Button>
                        </div>                        
                        <div style={{display: 'inline-block', marginRight:'5px'}}>
                            <Button color="danger" onClick={this.PSDeleteSurveyResponse.bind(this, surveyResponse._id)}>Delete</Button>
                        </div>
                    </div> : 
                    <div style={{textAlign: 'right', marginTop:'30px'}}>
                        <div style={{display: 'inline-block', marginRight:'5px'}}>
                            <Button color="secondary" outline onClick={this.GoBack.bind(this)}>Back</Button>
                        </div>
                    </div>
                    }

                </div>
            )
        }


    }
}

const options = {
    collectionName: 'SurveyItems',
    queryName: 'PSSurveyLists2SurveyItemsQuery'
};

const UpdateOption = {
    collectionName: 'SurveyItemResponses'
}

const CreateOption = {
    collectionName: 'SurveyItemResponses'
}

const SurveyResponseUpdateOption = {
    collectionName: 'SurveyResponses'
}

registerComponent({
    name: 'PSSurveyItemList',
    component: PSSurveyItemList,
    hocs: [[withList, options], [withUpdate, UpdateOption], [withUpdate, SurveyResponseUpdateOption], [withCreate, CreateOption], withCurrentUser, withRouter]
});

