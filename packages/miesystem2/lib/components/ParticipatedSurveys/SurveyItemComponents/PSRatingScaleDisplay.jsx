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
    FormText,
    Table
} from 'reactstrap';
import { width } from 'window-size';

/* -------------------------------------------------- PSRatingScaleDisplay ------------------------------------------------------*/

class PSRatingScaleDisplay extends Component{

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
                    <Components.PSRatingScaleSurveyItem
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
    name: 'PSRatingScaleDisplay',
    component: PSRatingScaleDisplay,
    hocs: [[withDocument, queryOption]]
})
;



/* -------------------------------------------------- PSRatingScaleSurveyItem ------------------------------------------------------*/


class PSRatingScaleSurveyItem extends Component {

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

                const surveyItemResponse = {_id: 'NONE', surveyItemAnswers: JSON.stringify(JSON.parse(surveyItem.surveyItemOptions || '')["Row"].map((el, i) => ""))};
                console.log("here");
                console.log(surveyItemResponse);

                return (
                    <div>
                    <Components.PSRatingScaleSurveyItemThread
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
                        <Components.PSRatingScaleSurveyItemThread
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

const PSRatingScaleSurveyItemOption = {
    collectionName: 'SurveyItemResponses',
    queryName: 'PSRatingScaleSurveyItemQuery'
}

registerComponent({
    name: 'PSRatingScaleSurveyItem',
    component: PSRatingScaleSurveyItem,
    hocs: [[withList, PSRatingScaleSurveyItemOption], withCurrentUser]
})
;


/* -------------------------------------------------- PSRatingScaleSurveyItemThread ------------------------------------------------------*/

class PSRatingScaleSurveyItemThread extends Component {

    constructor(props) {
        super(props);
        this.state = {
            RatingScaleUpdate: 
                JSON.parse(props.surveyItemResponse.surveyItemAnswers || '')
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

    PSRatingScale(i, col){
        const {surveyItemResponse} = this.props;
        const {surveyItem} = this.props;
        var RatingScaleUpdate = this.state.RatingScaleUpdate;
        RatingScaleUpdate[i] = col;
        this.setState({ RatingScaleUpdate });
        this.props.PSSurveyItemUpdateSave(surveyItem._id, surveyItem.surveyItemType, surveyItemResponse._id, RatingScaleUpdate);
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
                    {console.log(this.state.RatingScaleUpdate)}
                    <Form>
                        <FormGroup>
                            <Label>
                                Q{i+1}{surveyItem.required ? "*": null} : {surveyItem.surveyItemQuestion}
                            </Label>
                            <Table bordered style={{textAlign: 'center'}}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        {JSON.parse(surveyItem.surveyItemOptions || '')["Col"].map((el, i) =>
                                            <th key={i}>{el}</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {JSON.parse(surveyItem.surveyItemOptions || '')["Row"].map((row, i) =>
                                        <tr key={i}>
                                            <th key={i}>{row}</th>
                                            {JSON.parse(surveyItem.surveyItemOptions || '')["Col"].map((col, j) =>
                                                <td key={j}>
                                                <Input type="radio" onChange={this.PSRatingScale.bind(this, i, col)} checked={col == this.state.RatingScaleUpdate[i] ? true: false} name={i} />
                                                </td>
                                            )}
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </FormGroup>
                    </Form>
                </div>
            )

        }
    }
};

registerComponent({
    name: 'PSRatingScaleSurveyItemThread',
    component: PSRatingScaleSurveyItemThread
});
