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

/* -------------------------------------------------- PSSelfTrackingDisplay ------------------------------------------------------*/

class PSSelfTrackingDisplay extends Component{

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
                    <Components.PSSelfTrackingSurveyItem
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
    name: 'PSSelfTrackingDisplay',
    component: PSSelfTrackingDisplay,
    hocs: [[withDocument, queryOption]]
})
;



/* -------------------------------------------------- PSSelfTrackingSurveyItem ------------------------------------------------------*/


class PSSelfTrackingSurveyItem extends Component {

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


            if (Object.keys(results_temp).length === 0) {

                const surveyItemResponse = {_id: 'NONE', surveyItemAnswers: JSON.stringify(JSON.parse(surveyItem.surveyItemOptions).map((el, i) => 0))};

                return (
                    <div>
                    <Components.PSSelfTrackingSurveyItemThread
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
                    <Components.PSSelfTrackingSurveyItemThread
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

const PSSelfTrackingSurveyItemOption = {
    collectionName: 'SurveyItemResponses',
    queryName: 'PSSelfTrackingSurveyItemQuery'
}

registerComponent({
    name: 'PSSelfTrackingSurveyItem',
    component: PSSelfTrackingSurveyItem,
    hocs: [[withList, PSSelfTrackingSurveyItemOption], withCurrentUser]
})
;


/* -------------------------------------------------- PSSelfTrackingSurveyItemThread ------------------------------------------------------*/

class PSSelfTrackingSurveyItemThread extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Clicks: //props.surveyItemResponse.surveyItemAnswers
                JSON.parse(props.surveyItemResponse.surveyItemAnswers|| '').map((el, i) => el)
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

    PSSelfTracking(el, i){
        const {surveyItemResponse} = this.props;
        const {surveyItem} = this.props;
        var Clicks = this.state.Clicks;
        Clicks[i] = Clicks[i]+1;
        this.setState({
            Clicks
        });
        this.props.PSSurveyItemUpdateSave(surveyItem._id, surveyItem.surveyItemType, surveyItemResponse._id, Clicks);
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
                    {console.log(this.state.Clicks)}
                    <Form>
                        <FormGroup>
                            <Label>
                                Q{i+1}{surveyItem.required ? "*": null} : {surveyItem.surveyItemQuestion}
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            {JSON.parse(surveyItem.surveyItemOptions).map((el, i) =>
                                <Button size="lg" outline key={i} style={{marginRight: '10px'}} onClick={this.PSSelfTracking.bind(this, el, i)}>
                                    {el} <br/>
                                    Click: <br/>
                                    {this.state.Clicks[i]}
                                </Button>
                            )}
                        </FormGroup>
                    </Form>
                </div>
            )

        }
    }
};

registerComponent({
    name: 'PSSelfTrackingSurveyItemThread',
    component: PSSelfTrackingSurveyItemThread
});
