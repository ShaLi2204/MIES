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

/* -------------------------------------------------- PSCheckBoxDisplay ------------------------------------------------------*/

class PSCheckBoxDisplay extends Component{

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
                    <Components.PSCheckBoxSurveyItem
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
    name: 'PSCheckBoxDisplay',
    component: PSCheckBoxDisplay,
    hocs: [[withDocument, queryOption]]
})
;



/* -------------------------------------------------- PSCheckBoxSurveyItem ------------------------------------------------------*/


class PSCheckBoxSurveyItem extends Component {

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

                const {surveyItem} = this.props;
                const surveyItemResponse = {_id: 'NONE', surveyItemAnswers: JSON.stringify(JSON.parse(surveyItem.surveyItemOptions).map((el, i) => ""))}

                return (
                    <div>
                    <Components.PSCheckBoxSurveyItemThread
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
                
                const resultsClone = _.map(results, _.clone)

                return(
                    <div>
                        {resultsClone.map((surveyItemResponse, t) => 
                        <div key={t}>
                        <Components.PSCheckBoxSurveyItemThread
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

const PSCheckBoxSurveyItemOption = {
    collectionName: 'SurveyItemResponses',
    queryName: 'PSCheckBoxSurveyItemQuery'
}

registerComponent({
    name: 'PSCheckBoxSurveyItem',
    component: PSCheckBoxSurveyItem,
    hocs: [[withList, PSCheckBoxSurveyItemOption], withCurrentUser]
})
;


/* -------------------------------------------------- PSCheckBoxSurveyItemThread ------------------------------------------------------*/

class PSCheckBoxSurveyItemThread extends Component {

    constructor(props) {
        super(props);
        this.state = {
            AnswerYN:
                JSON.parse(props.surveyItem.surveyItemOptions || '').map((el, i) => props.surveyItemResponse.surveyItemAnswers.includes(el) ? true : false),
            Answer:
                JSON.parse(props.surveyItem.surveyItemOptions || '').map((el, i) => props.surveyItemResponse.surveyItemAnswers.includes(el) ? el : '')
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

    PSCheckBox(el, i, event){
        const {surveyItemResponse} = this.props;
        const {surveyItem} = this.props;
        var AnswerYN = this.state.AnswerYN;
        AnswerYN[i] = event.target.checked;
        var Answer = this.state.Answer;
        if (AnswerYN[i]==true) {
            Answer[i] = el
        } else {
            Answer[i] = ''
        }
        this.setState({ AnswerYN });
        this.setState({ Answer });
        this.props.PSSurveyItemUpdateSave(surveyItem._id, surveyItem.surveyItemType, surveyItemResponse._id, Answer);
    }

    render(){

        const {loading} = this.props;


        if(loading) {

            return <Components.Loading />
        
        } else {

            const {i} = this.props;
            const {surveyItemResponse} = this.props;
            const {surveyItem} = this.props;


            return(
                <div>
                    <Form>
                        <FormGroup>
                            <Label>
                                Q{i+1}{surveyItem.required ? "*": null} : {surveyItem.surveyItemQuestion}
                            </Label>
                            {JSON.parse(surveyItem.surveyItemOptions).map((el, i) => 
                                <FormGroup key={i} check>
                                    <Label check>
                                        <Input type="checkbox" checked={this.state.Answer.includes(el) ? true: false} onChange={this.PSCheckBox.bind(this, el, i)} />{'   '}{el}
                                    </Label>
                                </FormGroup>
                            )}
                        </FormGroup>
                    </Form>
                </div>
            )

        }
    }
};

registerComponent({
    name: 'PSCheckBoxSurveyItemThread',
    component: PSCheckBoxSurveyItemThread
});

