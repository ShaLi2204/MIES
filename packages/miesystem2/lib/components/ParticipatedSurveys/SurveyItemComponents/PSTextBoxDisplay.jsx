import React, { Component } from 'react';
import { Components, registerComponent, withList, withCurrentUser, withUpdate, withDelete, withDocument } from 'meteor/vulcan:core';
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
    Label,
    FormText
} from 'reactstrap';
import { width } from 'window-size';

/* -------------------------------------------------- PSTextBoxDisplay ------------------------------------------------------*/

class PSTextBoxDisplay extends Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        const {surveyItem} = this.props;
        const {surveyResponse} = this.props;
        const {i} = this.props;
        const {loading} = this.props;
        const {PSSurveyItemUpdateSave} = this.props;

        if(loading) {

            return <Components.Loading />

        } else {

            return(
                <div>
                    <Components.PSTextBoxSurveyItem
                        terms={{surveyItemId: surveyItem._id, surveyResponseId: surveyResponse._id, view: 'surveyItem2SurveyItemResponses'}}
                        loading={loading}
                        surveyResponse={surveyResponse}
                        i={i}
                        surveyItem={surveyItem}
                        PSSurveyItemUpdateSave={PSSurveyItemUpdateSave}
                    />
                </div>
            )
        }

    }
}

const queryOption = {
    collectionName: 'SurveyItems',
    queryName: 'SurveyItemResponsesQuery'
}

registerComponent({
    name: 'PSTextBoxDisplay',
    component: PSTextBoxDisplay,
    hocs: [[withDocument, queryOption], withCurrentUser]
})
;



/* -------------------------------------------------- PSTextBoxSurveyItem ------------------------------------------------------*/


class PSTextBoxSurveyItem extends Component {

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
            const {PSSurveyItemUpdateSave} = this.props;
            const {surveyItem} = this.props;
            const {i} = this.props;
            const {surveyResponse} = this.props;

            const results_temp = _.map(results, _.clone);

            if(Object.keys(results_temp).length === 0) {

                const surveyItemResponse = {_id: 'NONE', surveyItemAnswers: JSON.stringify("")};

                return(
                    <div>
                    <Components.PSTextBoxSurveyItemThread
                        surveyResponse={surveyResponse}
                        PSSurveyItemUpdateSave={PSSurveyItemUpdateSave}
                        loading={loading}
                        surveyItemResponse={surveyItemResponse}
                        surveyItem={surveyItem}
                        i={i}
                    />
                    </div>
                )

            } else {

                console.log(results);

                const resultsClone = _.map(results, _.clone);
    
                return(
                    <div>
                        {console.log(resultsClone)}
                        {resultsClone.map((surveyItemResponse, t) => 
                        <div key={t}>
                        <Components.PSTextBoxSurveyItemThread
                            surveyResponse={surveyResponse}
                            PSSurveyItemUpdateSave={PSSurveyItemUpdateSave}
                            loading={loading}
                            surveyItemResponse={surveyItemResponse}
                            surveyItem={surveyItem}
                            i={i}
                        />                        
                        </div>
                        )}
    
                    </div>
                )
            }
        }
    }
}

const PSTextBoxSurveyItemOption = {
    collectionName: 'SurveyItemResponses',
    queryName: 'PSTextBoxSurveyItemQuery'
}

registerComponent({
    name: 'PSTextBoxSurveyItem',
    component: PSTextBoxSurveyItem,
    hocs: [[withList, PSTextBoxSurveyItemOption], withCurrentUser]
})
;


/* -------------------------------------------------- PSTextBoxSurveyItemThread ------------------------------------------------------*/

class PSTextBoxSurveyItemThread extends Component {

    constructor(props) {
        super(props);
        this.state = {
            TextBoxUpdate: JSON.parse(props.surveyItemResponse.surveyItemAnswers || '')
        }
    }

    componentWillMount(){
        const {surveyItem} = this.props;
        const {surveyItemResponse} = this.props;
        if(surveyItemResponse._id !== 'NONE') {
            console.log("Answer Exists");
            console.log(surveyItemResponse._id);
            this.props.PSSurveyItemUpdateSave(surveyItem._id, surveyItem.surveyItemType, surveyItemResponse._id, this.state.TextBoxUpdate);
        } else {
            console.log("No Value");
        };
    }

    PSTextBox(event){
        const {surveyItemResponse} = this.props;
        const {surveyItem} = this.props;
        var TextBoxUpdate = this.state.TextBoxUpdate;
        this.setState({
            TextBoxUpdate: event.target.value
        });
        this.props.PSSurveyItemUpdateSave(surveyItem._id, surveyItem.surveyItemType, surveyItemResponse._id, event.target.value);
    }

    render(){

        const {loading} = this.props;

        if(loading) {

            return <Components.Loading />
        
        } else {

            const {surveyItem} = this.props;
            const {i} = this.props;
            const {surveyItemResponse} = this.props;
            console.log(surveyItemResponse);

            return(
                <div>
                    <Form>
                        <FormGroup>
                            <Label>
                                Q{i+1}{surveyItem.required ? "*": null} : {surveyItem.surveyItemQuestion}
                            </Label>
                            <Input type="textarea" value={this.state.TextBoxUpdate} onChange={this.PSTextBox.bind(this)} />
                        </FormGroup>
                    </Form>
                </div>
            )

        }
    }
};

registerComponent({
    name: 'PSTextBoxSurveyItemThread',
    component: PSTextBoxSurveyItemThread
});