import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withCurrentUser, Components, registerComponent, withDocument, Utils } from 'meteor/vulcan:core';
import { 
    Alert,
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
import Chart from 'react-google-charts';
import { valueFromAST } from 'graphql';

class SASelfTracking extends Component {

    constructor(props){
        super(props);
        this.state = {
            dropdownOpen: false,
            dropdownValue: 'Please select a question',
            chosen: 0
        }
    }

    STDropdownFunc(value, i){
        this.setState({
            dropdownValue: value, 
            chosen: i
        })
    }

    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render(){

        const {loading} = this.props;

        if(loading) {
            
            return <Components.Loading />

        } else {

            const {surveyItemResponses} = this.props;
            const {surveyItem} = this.props;
            const data = [
                ['Type', 'Times'],
                ['A', 4],
                ['A', 5],
                ['A', 4],
                ['A', 6]
            ];


            const arr = [];
            for (var t=0; t<surveyItemResponses.length; t++){
                arr.push(JSON.parse(surveyItemResponses[t].surveyItemAnswers || ''));
            };

            const arr_data = [];
            for (var m=0; m<JSON.parse(surveyItem.surveyItemOptions || '').length; m++){
                arr_data.push([]);
            }

            for (var m=0; m<JSON.parse(surveyItem.surveyItemOptions || '').length; m++){
                arr_data[m].push(['Type', 'Times']);
            };

            for (var n=0; n<JSON.parse(surveyItem.surveyItemOptions || '').length; n++){
                for (var i=0; i<surveyItemResponses.length; i++){
                    arr_data[n].push([
                        JSON.parse(surveyItem.surveyItemOptions || '')[n],
                        JSON.parse(surveyItemResponses[i].surveyItemAnswers || '')[n]
                    ])
                }
            };

            const chartOptions = {
                title: "Self Tracking",
                //legend: {position: "none"}
            }

            console.log(arr_data);

            return(
                <div>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle.bind(this)}>
                        <DropdownToggle caret>
                            {this.state.dropdownValue}
                        </DropdownToggle>
                        <DropdownMenu>
                            {JSON.parse(surveyItem.surveyItemOptions || '').map((el, i) => 
                            <DropdownItem onClick={this.STDropdownFunc.bind(this, JSON.parse(surveyItem.surveyItemOptions || '')[i] , i)} key={i}>
                                {el}
                            </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    {this.state.dropdownValue=="Please select a question" ? null:
                    <Chart
                        chartType="Histogram"
                        width="100%"
                        height="400px"
                        data={arr_data[this.state.chosen]}
                        options={chartOptions}
                    />
                    }
                </div>
            )
                
        }

    }
}


registerComponent({
    name: 'SASelfTracking', 
    component: SASelfTracking
});