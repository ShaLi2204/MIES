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

/* -------------------------------------------------- PSMultipleChoiceDisplay ------------------------------------------------------*/

class PSMultipleChoiceDisplay extends Component{

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
                    <Components.PSMultipleChoiceSurveyItem
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
    name: 'PSMultipleChoiceDisplay',
    component: PSMultipleChoiceDisplay,
    hocs: [[withDocument, queryOption]]
})
;



/* -------------------------------------------------- PSMultipleChoiceSurveyItem ------------------------------------------------------*/


class PSMultipleChoiceSurveyItem extends Component {

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
                    <Components.PSMultipleChoiceSurveyItemThread
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

                const resultsClone = _.map(results, _.clone);

                return(
                    <div>
                        {resultsClone.map((surveyItemResponse, t) =>
                        <div key={t}>
                        <Components.PSMultipleChoiceSurveyItemThread
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

const PSMultipleChoiceSurveyItemOption = {
    collectionName: 'SurveyItemResponses',
    queryName: 'PSMultipleChoiceSurveyItemQuery'
}

registerComponent({
    name: 'PSMultipleChoiceSurveyItem',
    component: PSMultipleChoiceSurveyItem,
    hocs: [[withList, PSMultipleChoiceSurveyItemOption], withCurrentUser]
})
;


/* -------------------------------------------------- PSMultipleChoiceSurveyItemThread ------------------------------------------------------*/

class PSMultipleChoiceSurveyItemThread extends Component {

    constructor(props) {
        super(props);
        this.state = {
            MultipleChoiceUpdate: JSON.parse(props.surveyItemResponse.surveyItemAnswers || '')
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

    PSMultipleChoice(el){
        const {surveyItemResponse} = this.props;
        const {surveyItem} = this.props;
        var MultipleChoiceUpdate = this.state.MultipleChoiceUpdate;
        this.setState({
            MultipleChoiceUpdate: el
        });
        this.props.PSSurveyItemUpdateSave(surveyItem._id, surveyItem.surveyItemType, surveyItemResponse._id, el);

    }

    render(){

        const {loading} = this.props;
       
        if(loading) {

            return <Components.Loading />
        
        } else {

            const {surveyItem} = this.props;
            const {i} = this.props;
            const {surveyItemResponse} = this.props;

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
                                        <Input type="radio" name="radio1" checked={el==this.state.MultipleChoiceUpdate ? true: false} onChange={this.PSMultipleChoice.bind(this, el)} />{'   '}{el}
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
    name: 'PSMultipleChoiceSurveyItemThread',
    component: PSMultipleChoiceSurveyItemThread
});
