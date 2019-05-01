import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withCurrentUser, Components, registerComponent, Utils } from 'meteor/vulcan:core';
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
    DropdownToggle,
    Table
} from 'reactstrap';

class AnalyzeGeneral extends Component {

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

            const {results} = this.props;
            const {surveyList} = this.props;
            const resultsClone = _.map(results, _.clone);

            return(
                <div style={{marginTop: '20px'}}>
                {console.log(resultsClone)}
                    <Table bordered>
                        <tbody>
                            <tr>
                                <th>
                                    Created At
                                </th>
                                <td>
                                    {surveyList.createdAt}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Published At
                                </th>
                                <td>
                                    {surveyList.postedAt}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Number of Responses
                                </th>
                                <td>
                                    {resultsClone.length}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )

        }

    }
}

const queryOption = {
    collectionName: 'SurveyResponses',
    queryName: 'AnalyzeSurveyItemsListQuery',
    limit: 0
}

registerComponent({
    name: 'AnalyzeGeneral',
    component: AnalyzeGeneral,
    hocs: [[withList, queryOption]]
});