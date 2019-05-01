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

/* -------------------------------------------------- PSCommentBoxDisplay ------------------------------------------------------*/

class PSCommentBoxDisplay extends Component{

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
                    <Components.PSCommentBoxSurveyItem
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
    name: 'PSCommentBoxDisplay',
    component: PSCommentBoxDisplay,
    hocs: [[withDocument, queryOption]]
})
;



/* -------------------------------------------------- PSCommentBoxSurveyItem ------------------------------------------------------*/


class PSCommentBoxSurveyItem extends Component {

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
                    <Components.PSCommentBoxSurveyItemThread
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
                        <Components.PSCommentBoxSurveyItemThread
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

const PSCommentBoxSurveyItemOption = {
    collectionName: 'SurveyItemResponses',
    queryName: 'PSCommentBoxSurveyItemQuery'
}

registerComponent({
    name: 'PSCommentBoxSurveyItem',
    component: PSCommentBoxSurveyItem,
    hocs: [[withList, PSCommentBoxSurveyItemOption], withCurrentUser]
})
;


/* -------------------------------------------------- PSCommentBoxSurveyItemThread ------------------------------------------------------*/

class PSCommentBoxSurveyItemThread extends Component {

    constructor(props) {
        super(props);
        this.state = {
            CommentBoxUpdate: JSON.parse(props.surveyItemResponse.surveyItemAnswers || '')
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

    PSCommentBox(event){
        const {surveyItemResponse} = this.props;
        const {surveyItem} = this.props;
        var CommentBoxUpdate = this.state.CommentBoxUpdate;
        this.setState({
            CommentBoxUpdate: event.target.value
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

            return(
                <div>
                    <Form>
                        <FormGroup>
                            <Label>
                                Q{i+1}{surveyItem.required ? "*": null} : {surveyItem.surveyItemQuestion}
                            </Label>
                            <Input type="textarea" value={this.state.CommentBoxUpdate} onChange={this.PSCommentBox.bind(this)} />
                        </FormGroup>
                    </Form>
                </div>
            )

        }
    }
};

registerComponent({
    name: 'PSCommentBoxSurveyItemThread',
    component: PSCommentBoxSurveyItemThread
});

