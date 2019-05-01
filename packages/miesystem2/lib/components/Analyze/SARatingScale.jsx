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
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class SARatingScale extends Component {

    constructor(props){
        super(props);
        this.state = {
            dropdownOpen: false,
            dropdownValue: 'Please select a question',
            chosen: 0
        }
    }

    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    RSDropdownFunc(value, i){
        this.setState({
            dropdownValue: value,
            chosen: i
        })
    }

    render(){

        const {loading} = this.props;

        if(loading) {
            
            return <Components.Loading />

        } else {

            const {surveyItemResponses} = this.props;
            const {surveyItem} = this.props;

            const arr = [];
            const arr_all = [];
            const countObj = [];
            const arrXY = [];

            for (var t=0; t<surveyItemResponses.length; t++) {
                arr.push(JSON.parse(surveyItemResponses[t].surveyItemAnswers || ''));
            };

            for (var r=0; r<JSON.parse(surveyItem.surveyItemOptions || '')["Row"].length; r++) {
                arr_all.push([]);
                arrXY.push([]);
                for (var ans=0; ans<surveyItemResponses.length; ans++){
                    arr_all[r].push(arr[ans][r]);
                };
                countObj.push(_.countBy(arr_all[r]));
            }

            for (var r=0; r<JSON.parse(surveyItem.surveyItemOptions || '')["Row"].length; r++) {
                for (var x=0; x<JSON.parse(surveyItem.surveyItemOptions || '')["Col"].length; x++) {
                    arrXY[r].push({
                        "x": JSON.parse(surveyItem.surveyItemOptions ||'')["Col"][x],
                        "y": countObj[r][JSON.parse(surveyItem.surveyItemOptions ||'')["Col"][x]] != undefined ? countObj[r][JSON.parse(surveyItem.surveyItemOptions ||'')["Col"][x]] : 0
                    })
                }
            }
            
            console.log(arr);
            console.log(arr_all);
            console.log(countObj);
            console.log(arrXY);

            return(
                <div>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle.bind(this)}>
                        <DropdownToggle caret>
                            {this.state.dropdownValue}
                        </DropdownToggle>
                        <DropdownMenu>
                            {JSON.parse(surveyItem.surveyItemOptions || '')["Row"].map((el, i) => 
                            <DropdownItem onClick={this.RSDropdownFunc.bind(this, JSON.parse(surveyItem.surveyItemOptions || '')["Row"][i], i)} key={i}>{el}</DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    {this.state.dropdownValue=="Please select a question" ? 
                    null : 
                    <BarChart
                        width={500}
                        height={300}
                        data={arrXY[this.state.chosen]}
                        margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                    {console.log(arrXY[this.state.chosen])}
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="x" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="y" fill="#4682B4" />
                    </BarChart>
                    }
                </div>
            )
                
        }

    }

}


registerComponent({
    name: 'SARatingScale', 
    component: SARatingScale
});