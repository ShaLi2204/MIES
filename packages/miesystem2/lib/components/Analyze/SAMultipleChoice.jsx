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

class SAMultipleChoice extends Component {

    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){

        const {loading} = this.props;

        if(loading) {
            
            return <Components.Loading />

        } else {

            const {surveyItemResponses} = this.props;
            const {surveyItem} = this.props;

            const arr = [];
            for (var t=0; t < surveyItemResponses.length; t++) {
                arr.push(JSON.parse(surveyItemResponses[t].surveyItemAnswers || ''))
            };

            countObj = _.countBy(arr);
            console.log(countObj);
            

            /*var countResult = surveyItemResponses.reduce((acc, o) => (acc[o.surveyItemAnswers] = (acc[o.surveyItemAnswers] || 0)+1, acc), {});
            console.log(countResult);
            const arr = [];

            object = Object.assign.apply(null, JSON.parse(surveyItem.surveyItemOptions || '').map(x => ({[x]: countResult[x]})));*/

            const arrXY = [];
            for (var t =0; t < JSON.parse(surveyItem.surveyItemOptions || '').length; t++) {
                arrXY.push({
                    "x": JSON.parse(surveyItem.surveyItemOptions || ' ')[t], 
                    "y": countObj[JSON.parse(surveyItem.surveyItemOptions || ' ')[t]]==undefined ? 0: countObj[JSON.parse(surveyItem.surveyItemOptions || ' ')[t]]
                })
            };

            return(
                <div>
                    {console.log(arr)}

                    <BarChart
                        width={500}
                        height={300}
                        data={arrXY}
                        margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="x" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="y" fill="#4682B4" />
                    </BarChart>
                </div>
            )
                
        }

    }
}


registerComponent({
    name: 'SAMultipleChoice', 
    component: SAMultipleChoice
});