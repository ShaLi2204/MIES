import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withList, withCurrentUser, Components, registerComponent, Utils, withCreate, withUpdate, withDelete } from 'meteor/vulcan:core';
import {
    Button, 
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

/* ---------------------------------------------- OpenSurveys OSSurveyItemOptionsThreadCheckBox Component -----------------------------------------------*/

const OSSurveyItemOptionsThreadMultipleChoice = (props) => {

    const {results, currentUser, terms } = props;
    const resultsClone = _.map(results, _.clone);

    return(
        <div>
            <Components.OSSurveyItemOptionsListMultipleChoice currentUser={currentUser} surveyItemOptions={resultsClone}/>
        </div>
    )
}

OSSurveyItemOptionsThreadMultipleChoice.displayName = "OSSurveyItemOptionsThreadMultipleChoice";

OSSurveyItemOptionsThreadMultipleChoice.propTypes = {
    currentUser: PropTypes.object
};

const options = {
    collectionName: 'SurveyItemOptions',
    queryName: 'osSurveyItemOptionsQuery',
    limit: 0    
};

registerComponent({
    name: 'OSSurveyItemOptionsThreadMultipleChoice',
    component: OSSurveyItemOptionsThreadMultipleChoice,
    hocs: [[withList, options], withCurrentUser]
});

/* ---------------------------------------------- OpenSurveys OSSurveyItemOptionsListMultipleChoice Component -----------------------------------------------*/

const OSSurveyItemOptionsListMultipleChoice = ({surveyItemOptions, currentUser}) => {

    return(
        <div>
            {surveyItemOptions.map((surveyItemOption,i) => 
                <Components.OSSurveyItemOptionsNodeMultipleChoice i={i} currentUser={currentUser} surveyItemOption={surveyItemOption} key={surveyItemOption._id} />
            )}            
        </div>
    )
}

OSSurveyItemOptionsListMultipleChoice.displayName = "OSSurveyItemOptionsListMultipleChoice";

registerComponent({
    name: 'OSSurveyItemOptionsListMultipleChoice',
    component: OSSurveyItemOptionsListMultipleChoice
});

/* ---------------------------------------------- OpenSurveys OSSurveyItemOptionsNodeMultipleChoice Component -----------------------------------------------*/

class OSSurveyItemOptionsNodeMultipleChoice extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const {surveyItemOption} = this.props;
        const {loading} = this.props;

        if(loading) {
            return <Components.Loading />
        } else {
            return(
                <div>
                        <FormGroup>
                        <Label check>
                        <Input type="radio" />
                        {surveyItemOption.options}
                        </Label>
                        </FormGroup>
                </div>
            )
        }
    }
}

OSSurveyItemOptionsNodeMultipleChoice.propType = {
    surveyItemOption: PropTypes.object.isRequired,
    currentUser: PropTypes.object
};

registerComponent({
    name: 'OSSurveyItemOptionsNodeMultipleChoice',
    component: OSSurveyItemOptionsNodeMultipleChoice
});



/* ---------------------------------------------- Open Surveys SurveyItemMultipleChoice Component -----------------------------------------------*/

class OSSurveyItemMultipleChoice extends Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        const {surveyItem} = this.props;
        const {i} = this.props;
        const {loading} = this.props;

        if(loading) {

            return <Components.Loading />

        } else {
            return(
            <div>
                <Form>
                    <FormGroup>
                        <Label>
                            Q{i+1}: {surveyItem.label}
                        </Label>
                        <Components.OSSurveyItemOptionsThreadMultipleChoice terms={{surveyItemId: surveyItem._id, view: 'surveyItemSurveyItemOptions'}} />
                    </FormGroup>
                </Form>
            </div>
            )
        }
    }
}

registerComponent({
    name: 'OSSurveyItemMultipleChoice',
    component: OSSurveyItemMultipleChoice
});