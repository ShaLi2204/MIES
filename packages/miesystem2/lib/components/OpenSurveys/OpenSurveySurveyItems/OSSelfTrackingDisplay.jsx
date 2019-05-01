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
    Label
} from 'reactstrap';
import swal from 'sweetalert';

class OSSelfTrackingDisplay extends Component{

    constructor(props){
        super(props);
        this.state = {
            Clicks: JSON.parse(props.surveyItem.surveyItemOptions).map((el, i) => 0 ),
            Options: JSON.parse(props.surveyItem.surveyItemOptions),
        }
    }

    CountClick(el, i){
        const {surveyItem} = this.props;
        var Clicks = this.state.Clicks;
        var Options = this.state.Options;
        Clicks[i] = Clicks[i]+1;
        this.setState({Clicks});
        console.log(Options);
        console.log(Clicks);
        this.props.surveyItemAnswersUpdate(surveyItem._id, surveyItem.surveyItemType, Clicks);
    }

    render(){

        const {surveyItem} = this.props;
        const {i} = this.props;
        const {loading} = this.props;

        if (loading) {

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
                        <FormGroup>
                            {JSON.parse(surveyItem.surveyItemOptions).map((el, i) =>
                                <Button size="lg" outline key={i} style={{marginRight: '10px'}} onClick={this.CountClick.bind(this, el, i)}>
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

}

registerComponent({
    name: 'OSSelfTrackingDisplay',
    component: OSSelfTrackingDisplay
});

