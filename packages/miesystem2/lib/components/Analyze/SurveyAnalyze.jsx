import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withCurrentUser, Components, registerComponent, Utils, withDocument } from 'meteor/vulcan:core';
import { 
    Button, 
    ListGroup, 
    ListGroupItem, 
    Container, 
    Row, 
    Col, 
    Modal, 
    ModalHeader, 
    ModalFooter,
    ModalBody,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
  } from 'reactstrap';

class SurveyAnalyze extends Component {

    constructor(props){
        super(props);
        this.state = {
            dropdownOpen: false,
            itemArray: [],
            dropdownValue: 'General',
            generalShow: true
        }
    }

    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    DropdownGeneral(itemArray, length){
        for (var m=0; m<length; m++) {
            itemArray[m] = false;
        };
        this.setState({
            generalShow: true,
            dropdownValue: "General", 
            itemArray: itemArray
        });
        console.log(itemArray);
    }

    DropdownItemFunc(itemArray, surveyItemTitle, i){
        itemArray[i] = true;
        this.setState({
            generalShow: false, 
            dropdownValue: surveyItemTitle,
            itemArray: itemArray
        })
        console.log(itemArray);
    }

    render(){

        const {loading} = this.props;

        
        if(loading) {

            return <Components.Loading />

        } else {

            const {results} = this.props;
            const resultsClone = _.map(results, _.clone);
            const {surveyList} = this.props;
            var itemArray = [...Array(resultsClone.length).map((e, l) => false)];
            for (var m=0; m<resultsClone.length; m++) {
                itemArray[m] = false;
            }

            return(
                <div>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle.bind(this)}>
                        <DropdownToggle caret>
                            {this.state.dropdownValue}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={this.DropdownGeneral.bind(this, itemArray, resultsClone.length)}>General</DropdownItem>
                            <DropdownItem divider />
                            {resultsClone.map((surveyItem, i) => 
                                <DropdownItem key={i} onClick={this.DropdownItemFunc.bind(this, itemArray, surveyItem.surveyItemQuestion, i)}>{surveyItem.surveyItemQuestion}</DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    {this.state.generalShow && <Components.AnalyzeGeneral
                        terms={{surveyListId: surveyList._id, view: 'SurveyList2SurveyResponses'}} 
                        surveyList={surveyList}
                    />}
                    {itemArray.map((el, i) =>
                    <div key={i}>
                        {this.state.itemArray[i] && <Components.AnalyzeSurveyItemsList 
                            surveyItem={resultsClone[i]}
                            surveyList={surveyList}
                        />}
                    </div>
                    )}
                </div>
            )
        }

    }

}

const options = {
    collectionName: 'SurveyItems',
    queryName: 'SurveyAnalyzeQuery',
    limit: 0
}

SurveyAnalyze.propTypes = {
    results: PropTypes.array,
}

const queryOptions = {
    collectionName: 'SurveyLists'
}

registerComponent({
    name: 'SurveyAnalyze',
    component: SurveyAnalyze,
    hocs: [[withList, options], [withDocument, queryOptions], withCurrentUser]
});