import { Components, registerComponent, withDocument, withCurrentUser, getActions, withMutation, withUpdate } from 'meteor/vulcan:core';
import { SurveyLists } from '../../modules/SurveyLists/index.js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withRouter } from 'react-router';
import { 
    Button, 
    Container, 
    Dropdown, 
    DropdownItem, 
    DropdownToggle, 
    DropdownMenu, 
    Row, 
    Col, 
    ListGroup, 
    ListGroupItem, 
    Table
} from 'reactstrap';
import swal from 'sweetalert';


class SurveysNewPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            showStatus: true
        }
    }

    GoBack(){
        window.history.back();
    }

    PublishSurvey(id){
        this.props
        .updateSurveyList({
            selector: {documentId: id}, 
            data: {status: 2}
        });
        swal({
            title: "Survey published!",
            icon: "success"
        })
        .then(() => {
            this.props.router.push({pathname: '/'})
        })
        ;
        this.setState({showStatus: false});
    }

    render(){

        //console.log(this.props.document);
        console.log("SurveysNewPage runned");

        if (this.props.loading) {

            return (
                <div>
                    Loading
                    <Components.Loading />

                </div>
            )

        } else if (!this.props.document) {

            return <div><FormattedMessage id="app.404"/></div>

        } else {

            const surveyList = this.props.document;
            console.log(surveyList.status);

            return(
                <div className="page users-profile">
                
                    <Components.SurveysInfoPage surveyList={surveyList} currentUser={this.props.currentUser}/>

                    <div className="PageA4" style={{borderStyle:"solid", borderColor:'white', marginTop: "20px"}}>

                        <div style={{marginTop: "20px"}}>

                        <Components.SurveysQuestionsThread 
                            terms={{surveyListId:surveyList._id, view:'surveyListSurveyItems'}}
                            surveyList={surveyList}
                        />

                        {this.state.showStatus && 
                        <Components.SurveyItemsNewForm surveyList={surveyList}/>
                        }

                        <div style={{textAlign:"right", marginRight:"20px", marginBottom: "20px"}}>
                            {surveyList.status == 1 ? 
                             <Button color="primary" size="sm" style={{display: "inline-block", marginRight: "10px"}} onClick={this.PublishSurvey.bind(this, surveyList._id)}>Publish</Button> : null
                            }

                            <Button color="primary" size="sm" onClick={this.GoBack.bind(this)} style={{display: "inline-block"}}>Go Back</Button>

                        </div>

                        </div>

                    </div>



                </div>
            )
        }
    }
}

SurveysNewPage.displayName = "SurveysNewPage";

const queryOptions = {
    collection: SurveyLists,
    queryName: 'surveyListsSingleQuery',
}

const UpdateOption = {
    collectionName: 'SurveyLists'
}

SurveysNewPage.propTypes = {
    documentId: PropTypes.string,
    document: PropTypes.object,
}

registerComponent(

    'SurveysNewPage',
    // React component
    SurveysNewPage,
    // HOC to give access to the current user
    withCurrentUser,
    // HOC to load the data of the document, based on queryOptions & a documentId props
    [withDocument, queryOptions], 
    [withUpdate, UpdateOption],
    withRouter

);