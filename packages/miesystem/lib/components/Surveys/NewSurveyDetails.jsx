

import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import { registerComponent, Components, withSingle, getFragment } from 'meteor/vulcan:core';
//import SurveyLists from '../../modules/Surveys/collection';
import { SurveyLists } from '../../modules/Surveys/index.js';
import { Link } from 'react-router';
import { Button, Container, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Row, Col, ListGroup, ListGroupItem, Table } from 'reactstrap';
import SurveyItems from '../../modules/SurveyItem/collection';
import PropTypes from 'prop-types';

/**
 * SurveysSingle - Top level component at the route /movie/:id
 *  It just passes the param id (passed by the router, from the url) to SurveysSingleInner that is wrapped with withSingle to fetch the data
 * @param  {object} props
 */


class NewSurveyQuestions extends Component{
    constructor(props) {
        super(props);
        this.state= {
            visible: false,
            dropdownOpen: false,
            DropdownValue: "Item Type"
        }
    }

    openModal() {
        this.setState({
            visible : true
        });
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
 
    closeModal() {
        this.setState({
            visible : false
        });
    }

    ClickTextBox() {
        this.setState({DropdownValue: "Text Box"});
    }

    ClickFreeText(){
        this.setState({DropdownValue: "Free Text Question"})
    }

    ClickSingleChoice(){
        this.setState({DropdownValue: "Single Choice Question"})
    }

    ClickMultipleChoice(){
        this.setState({DropdownValue: "Multiple Choice Question"})
    }

    ClickRatingScala(){
        this.setState({DropdownValue: "Rating Scala"})
    }

    render(){
        return(
            <div>
                <div>
                    <Button onClick={this.openModal.bind(this)}>New Question</Button>
                </div>
                <div>
                    <Modal visible={this.state.visible}>
                    <Button onClick={()=> this.closeModal()}>x</Button>
                    <h2>Please select the item type</h2>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle.bind(this)}>
                        <DropdownToggle caret>{this.state.DropdownValue}</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={this.ClickTextBox.bind(this)}>Text Box</DropdownItem>
                            <DropdownItem onClick={this.ClickFreeText.bind(this)}>Free Text Question</DropdownItem>
                            <DropdownItem onClick={this.ClickSingleChoice.bind(this)}>Single Choice Question</DropdownItem>
                            <DropdownItem onClick={this.ClickMultipleChoice.bind(this)}>Multiple Choice Question</DropdownItem>
                            <DropdownItem onClick={this.ClickRatingScala.bind(this)}>Rating Scala</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Button>Next</Button>
                    </Modal>
                </div>


                <Components.SmartForm
                    collection={SurveyItems}
                    //mutationFragment={getFragment('SurveysQuestionFragment')}
                    successCallback={props.successCallback}
                />
                
            </div>
        )
    }
}

NewSurveyDetails.propTypes = {
  surveyListId: PropTypes.string.isRequired
};

const singleOptionsItem = {
    collection: SurveyItems,
    fragmentName: 'SurveysQuestionFragment',
 };

registerComponent({name:'NewSurveyQuestions', component: NewSurveyQuestions, hocs: [[withSingle, singleOptionsItem]]});


function NewSurveyDetails(props) {
    return (
      <div style={{ maxWidth: '500px', margin: '20px auto' }}>
        <Components.NewSurveyDetailsInner documentId={props.params.id} />
        <Components.NewSurveyQuestions/>
      </div>
    );
}

registerComponent({name:'NewSurveyDetails', component: NewSurveyDetails});
    
  /**
   * SurveysSingleInner - wrapped with withSingle, it displays a survey page
   *
   * @param  {type} props description
   * @return {type}       description
   */
  
function NewSurveyDetailsInner(props) {
    if (props.loading) {
      return <Components.Loading />;
    } else {
      return (
        <div>
          <div /*className="jumbotron"*/ style={{ border: '1px solid #ccc' }}>
          <Table bordered size="sm">
            <tbody>
              <tr>
                <th scope="row">Title</th>
                <td>
                {props.document.title}
                </td>
              </tr>
              <tr>
                <th scope="row">Creation time</th>
                <td>
                  {props.document.createdAt}
                </td>
              </tr>
              <tr>
                <th scope="row">Description</th>
                <td>{props.document.description}</td>
              </tr>
              <tr>
                <th scope="row">Author</th>
                <td>{props.document.user.username}</td>
              </tr>
              <tr>
                <th scope="row">User ID</th>
                <td>{props.document.userId}</td>
              </tr>
            </tbody>
          </Table>
          <Components.Datatable
            collection={SurveyItems}
            columns={['_id', 'surveyListId','label','surveyItemType']}
            />
          </div>
        </div>
      );
    }
} 

const singleOptions = {
   collection: SurveyLists,
   //fragmentName: 'SurveysItemFragment',
};

registerComponent({ name: 'NewSurveyDetailsInner', component: NewSurveyDetailsInner, hocs: [[withSingle, singleOptions]]});


