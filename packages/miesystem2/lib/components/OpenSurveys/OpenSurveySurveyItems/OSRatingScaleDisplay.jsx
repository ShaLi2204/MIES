import React, { Component } from 'react';
import { Components, registerComponent, withUpdate, withDelete } from 'meteor/vulcan:core';
import { 
    Button, 
    Container, 
    Row, 
    Col, 
    Modal, 
    ModalFooter, 
    ModalBody, 
    Input,
    InputGroup,
    InputGroupAddon,
    Form,
    FormGroup,
    Label,
    Table
} from 'reactstrap';
import swal from 'sweetalert';

class OSRatingScaleDisplay extends Component{

    constructor(props){
        super(props);
        this.state = {
            Answers:
            [...Array(JSON.parse(props.surveyItem.surveyItemOptions || '')["Row"].length)].map((el, i) => '')
        }
    }

    RatingScaleChange(i, col){
        const {surveyItem} = this.props;
        var Answers = this.state.Answers;
        Answers[i] = col;
        this.setState({ Answers });
        console.log(Answers);
        this.props.surveyItemAnswersUpdate(surveyItem._id, surveyItem.surveyItemType, Answers)
    }
    

    render(){

        const {surveyItem} = this.props;
        const {i} = this.props;
        const {loading} = this.props;
        const numOptions = JSON.parse(surveyItem.surveyItemOptions).length;

        if(loading) {

            return <Components.Loading />
            
        } else {

            return(
                <div>
                    <Form>
                        <FormGroup>
                            <Label>
                                Q{i+1}{surveyItem.required ? "*": null} : {surveyItem.surveyItemQuestion}
                            </Label>
                        </FormGroup>
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
                                            <Input onClick={this.RatingScaleChange.bind(this, i, col)} type="radio" name={i} />
                                            </td>
                                        )}
                                </tr>
                            )}                           
                            </tbody>
                        </Table>
                    </Form>
                </div>
            )
        }

    }

}

registerComponent({
    name: 'OSRatingScaleDisplay',
    component: OSRatingScaleDisplay
});

