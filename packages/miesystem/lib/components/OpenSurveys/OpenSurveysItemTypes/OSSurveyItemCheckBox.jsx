import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withList, withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';
import {
    Button,
    Container,
    Row,
    Col,
    Modal,
    ModalFooter,
    ModalBody,
    Input,
    Form,
    FormGroup,
    Label
} from 'reactstrap';

/* ---------------------------------------------- OpenSurveys OSSurveyItemOptionsThreadCheckBox Component -----------------------------------------------*/

const OSSurveyItemOptionsThreadCheckBox = (props) => {

    const { results, currentUser, terms } = props;
    const resultsClone = _.map(results, _.clone);

    return(
        <div>
            <Components.OSSurveyItemOptionsListCheckBox currentUser={currentUser} surveyItemOptions={resultsClone}/>
        </div>
    )
}

OSSurveyItemOptionsThreadCheckBox.displayName = "OSSurveyItemOptionsThreadCheckBox";

OSSurveyItemOptionsThreadCheckBox.propTypes = {
    currentUser: PropTypes.object
};

const options = {
    collectionName: 'SurveyItemOptions',
    queryName: 'osSurveyItemOptionsQuery',
    limit: 0
};

registerComponent({
    name: 'OSSurveyItemOptionsThreadCheckBox',
    component: OSSurveyItemOptionsThreadCheckBox,
    hocs: [[withList, options], withCurrentUser]
});

/* ---------------------------------------------- OpenSurveys OSSurveyItemOptionsListCheckBox Component -----------------------------------------------*/
const OSSurveyItemOptionsListCheckBox = ({surveyItemOptions, currentUser}) => {

    return(
        <div>
            {surveyItemOptions.map((surveyItemOption,i) => 
                <Components.OSSurveyItemOptionsNodeCheckBox i={i} currentUser={currentUser} surveyItemOption={surveyItemOption} key={surveyItemOption._id} />
            )}
        </div>
    )
}

OSSurveyItemOptionsListCheckBox.displayName = "OSSurveyItemOptionsListCheckBox";

registerComponent({
    name: 'OSSurveyItemOptionsListCheckBox',
    component: OSSurveyItemOptionsListCheckBox
});

/* ---------------------------------------------- OpenSurveys OSSurveyItemOptionsNodeCheckBox Component -----------------------------------------------*/

class OSSurveyItemOptionsNodeCheckBox extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){

        const {surveyItemOption} = this.props;
        const {loading} = this.props;

        if(loading) {
            return <Components.Loading />
        } else {
            return(
                <div>
                        <FormGroup>
                            <Label>
                                <Input type="checkbox" />
                                {surveyItemOption.options}
                            </Label>
                        </FormGroup>
                </div>
            )
        }
    }
}

OSSurveyItemOptionsNodeCheckBox.displayName = "OSSurveyItemOptionsNodeCheckBox";

OSSurveyItemOptionsNodeCheckBox.propTypes = {
    surveyItemOption: PropTypes.object.isRequired,
    currentUser: PropTypes.object
};

registerComponent({
    name: 'OSSurveyItemOptionsNodeCheckBox',
    component: OSSurveyItemOptionsNodeCheckBox
});


/* ---------------------------------------------- OpenSurveys SurveyItemCheckBox Component -----------------------------------------------*/

class OSSurveyItemCheckBox extends Component{

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
                        <Components.OSSurveyItemOptionsThreadCheckBox terms={{surveyItemId: surveyItem._id, view: 'surveyItemSurveyItemOptions'}} />
                    </FormGroup>
                </Form>
            </div>
            )
        }
    }
}

registerComponent({
    name: 'OSSurveyItemCheckBox',
    component: OSSurveyItemCheckBox
});