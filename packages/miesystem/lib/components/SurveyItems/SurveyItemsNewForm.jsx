import { Components, registerComponent, withMessages, withCurrentUser } from 'meteor/vulcan:core';
import React, {Component} from 'react';
import { getFragment } from 'meteor/vulcan:lib';
import PropTypes from 'prop-types';
//import SurveyItems from '../../modules/SurveyItem/collection.js';
import { SurveyItems } from '../../modules/SurveyItem/index.js';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Button, Container, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import Modal from 'react-awesome-modal';

class SurveyItemsNewForm extends Component{
    constructor(props){
        super(props);
        this.state= {
            value:props.surveyListId,
            visible: false,
            dropdownOpen: false,
            DropdownValue: "Item Type",
            visibleII: false,
        }
    }

    componentWillReceiveProps(){
        this.setState({
            value: this.props.surveyListId
        })
    }

    openModal() {
        this.setState({
            visible: true
        })
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    closeModal() {
        this.setState({
            visible: false,
            DropdownValue: "Item Type"
        })
    }

    closeModalII() {
        this.setState({
            visibleII: false,
            DropdownValue: "Item Type"
        })
    }

    ClickTextBox(){
        this.setState({DropdownValue:"Text Box"});
    }

    ClickFreeText(){
        this.setState({DropdownValue: "Freetext Question"})
    }

    ClickSingleChoice(){
        this.setState({DropdownValue: "Single Choice"})
    }

    ClickMultipleChoice(){
        this.setState({DropdownValue: "Multiple Choice"})
    }

    ClickRatingScala(){
        this.setState({DropdownValue: "Rating Scala"})
    }  

    ClickNext() {
        this.setState({
            visible: false,
            visibleII: true,
        })
    }
    
    SmartFormModal(){
        let prefilledProps = {surveyItemType:this.state.DropdownValue, surveyListId:this.state.value};
        if (this.state.DropdownValue=="Text Box"){
            return(
                <div>
                    <Components.SmartForm
                        collection={SurveyItems}
                        queryFragment={getFragment('SurveyItemsTextBox')}
                        prefilledProps={prefilledProps}
                        successCallback={() => {
                            //this.props.successCallback();
                            this.closeModalII();
                        }}
                    />
                </div>
            )           
        } else if (this.state.DropdownValue=="Freetext Question") {
            return(
                <div>
                    <Components.SmartForm
                        collection={SurveyItems}
                        mutationFragment={getFragment('SurveyItemsTextBox')}
                        prefilledProps={prefilledProps}
                        successCallback={() => {
                            //this.props.successCallback();
                            this.closeModalII();
                        }}                    />
                </div>
            )
        } else if (this.state.DropdownValue=="Single Choice") {
            return(
                <div>
                    <Components.SmartForm
                        collection={SurveyItems}
                        mutationFragment={getFragment('SurveyItemsChoice')}
                        prefilledProps={prefilledProps}
                        successCallback={() => {
                            //this.props.successCallback();
                            this.closeModalII();
                        }}                    />
                </div>
            )
        } else if (this.state.DropdownValue=="Multiple Choice") {
            return(
                <div>
                    <Components.SmartForm
                        collection={SurveyItems}
                        mutationFragment={getFragment('SurveyItemsChoice')}
                        prefilledProps={prefilledProps}
                        successCallback={() => {
                            //this.props.successCallback();
                            this.closeModalII();
                        }}                    />
                </div>
            )
        }
    }

    render(){

        return(
        <div>
            <div>
                <Button onClick={this.openModal.bind(this)}>New Item</Button>
            </div>
            <div className="SINF_Modal">
                <Modal visible={this.state.visible} width={"30%"} height={"50%"}>
                    <Button className="SINF_ModalCloseBtn" onClick={()=>this.closeModal()}>x</Button>
                    <br/><br/><br/>
                    <p>Please choose item type</p>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle.bind(this)}>
                        <DropdownToggle caret>{this.state.DropdownValue}</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={this.ClickTextBox.bind(this)}>Text Box</DropdownItem>
                            <DropdownItem onClick={this.ClickFreeText.bind(this)}>Freetext Question</DropdownItem>
                            <DropdownItem onClick={this.ClickSingleChoice.bind(this)}>Single Choice</DropdownItem>
                            <DropdownItem onClick={this.ClickMultipleChoice.bind(this)}>Multiple Choice</DropdownItem>
                            <DropdownItem onClick={this.ClickRatingScala.bind(this)}>Rating Scala</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    {/*<Components.ModalTrigger title="New Survey" component={<Button size="sm" color="primary">New Item</Button>}>
                        <Components.SmartForm
                            collection={SurveyItems}
                            mutationFragment={getFragment('SurveyItemsList')}
                            successCallback={this.props.successCallback}
                            prefilledProps={{surveyListId:this.state.value}}
                        />            
        </Components.ModalTrigger>*/}
                    <Button className="SINF_NextBtn" onClick={this.ClickNext.bind(this)}>Next</Button>
                </Modal>
            </div>

            <Modal visible={this.state.visibleII} width={"80%"} height={"80%"}>
                <div className="SINF_ModalII">
                    <div>
                        <Button className="SINF_ModalCloseBtn" onClick={()=>this.closeModalII()}>x</Button>
                    </div>
                    <div className="SINF_SmartFormModal">
                        {this.SmartFormModal()}
                    </div>
                </div>
            </Modal>
            <Components.SmartForm
                collection={SurveyItems}
                mutationFragment={getFragment('SurveyItemsList')}
                successCallback={this.props.successCallback}
                prefilledProps={{surveyListId:this.state.value}}
            />
        </div>
        )
    }
} ;

SurveyItemsNewForm.propTypes = {
    surveyListId: PropTypes.string.isRequired,
    type: PropTypes.string,
    successCallback: PropTypes.func
};

registerComponent({name:'SurveyItemsNewForm', component: SurveyItemsNewForm, hocs:[withMessages, withCurrentUser]});