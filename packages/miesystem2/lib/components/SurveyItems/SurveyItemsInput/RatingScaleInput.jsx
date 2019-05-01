import React, { Component } from 'react';
import { Components, registerComponent, withUpdate, withCreate, withMulti, withSingle,withDelete, newMutation, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import { 
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    FormText
} from 'reactstrap';
import swal from 'sweetalert';

class RatingScaleInput extends Component{

    constructor(props){
        super(props);
        this.state = {
            valuesRow: [],
            valuesCol: [],
            RSrows: ['',''],
            RScols: ['',''],
        }
    }

    handleChangeRowI(event){
        let RSrows = [...this.state.RSrows];
        RSrows[0] = event.target.value;
        this.setState({ RSrows });
    }

    handleChangeRowII(event){
        let RSrows = [...this.state.RSrows];
        RSrows[1] = event.target.value;
        this.setState({ RSrows });
    }

    handleChangeColI(event){
        let RScols = [...this.state.RScols];
        RScols[0] = event.target.value;
        this.setState({ RScols });
    }

    handleChangeColII(event){
        let RScols = [...this.state.RScols];
        RScols[1] = event.target.value;
        this.setState({ RScols });
    }

    RSAddRow(){
        this.setState(prevState => ({
            valuesRow: [...prevState.valuesRow,''], 
            RSrows: [...prevState.RSrows,'']
        }))
    }

    RSAddCol(){
        this.setState(prevState => ({
            valuesCol: [...prevState.valuesCol,''], 
            RScols: [...prevState.RScols,'']
        }))
    }

    handleChangeRows(i, event){
        let valuesRow = [...this.state.valuesRow];
        valuesRow[i] = event.target.value;
        this.setState({ valuesRow });
        let RSrows = [...this.state.RSrows];
        RSrows[i+2] = event.target.value;
        this.setState({ RSrows });
    }

    handleChangeCols(i, event){
        let valuesCol = [...this.state.valuesCol];
        valuesCol[i] = event.target.value;
        this.setState({ valuesCol });
        let RScols = [...this.state.RScols];
        RScols[i+2] = event.target.value;
        this.setState({ RScols });
    }

    createRow(){
        return this.state.valuesRow.map((el,i) =>
            <div key={i}>
                <InputGroup>
                    <Input value={el||''} onChange={this.handleChangeRows.bind(this,i)} />
                    <InputGroupAddon addonType="append">
                        <Button onClick={this.DeleteRow.bind(this,i)}>Delete</Button>
                    </InputGroupAddon>
                </InputGroup>
                <br/>
            </div>
        )
    }

    createCol(){
        return this.state.valuesCol.map((el,i) =>
            <div key={i}>
                <InputGroup>
                    <Input value={el||''} onChange={this.handleChangeCols.bind(this,i)} />
                    <InputGroupAddon addonType="append">
                        <Button onClick={this.DeleteCol.bind(this,i)}>Delete</Button>
                    </InputGroupAddon>
                </InputGroup>
                <br/>
            </div>
        )
    }

    DeleteRow(i){
        let valuesRow = [...this.state.valuesRow];
        valuesRow.splice(i,1);
        this.setState({ valuesRow });
        let RSrows = [...this.state.RSrows];
        RSrows.splice(i+2,1);
        this.setState({ RSrows });
    }

    DeleteCol(i){
        let valuesCol = [...this.state.valuesCol];
        valuesCol.splice(i,1);
        this.setState({ valuesCol });
        let RScols = [...this.state.RScols];
        RScols.splice(i+2,1);
        this.setState( {RScols} );
    }

    RatingScaleSave(id, qv, ir){
		
		const ops_obj = {"Row": this.state.RSrows, "Col": this.state.RScols }

        //const Rows = this.state.RSrows.join("|R|");
        //const Cols = this.state.RScols.join("|C|");
        const ops = JSON.stringify(ops_obj);
        if(!qv) {
            swal({
                title: "Please input a question!",
                icon: "warning"
            })
        } else if (this.state.RSrows.includes("")){
            swal({
                title: "Please input all the rows!",
                icon: "warning"
            })
        } else if (this.state.RScols.includes("")){
            swal({
                title: "Please input all the cols!",
                icon: "warning"
            })
        } else {
            this.props
            .createSurveyItem({
                data:{
                    surveyListId: id,
                    surveyItemQuestion: qv,
                    surveyItemType: 'RatingScale',
                    required: ir,
                    surveyItemOptions: ops
                }
            })
            .then(console.log)
            ;
			this.props.clearFunc();
        }
    }
    
    render(){

        const questionValue = this.props.questionValue;
        const surveyListId = this.props.surveyListId;
        const isRequired = this.props.isRequired;

        return(
            <div className="MultipleChoiceInputPage">
                <Form>
                    <FormGroup>
                        <Label>Rows</Label>
                        <Input onChange={this.handleChangeRowI.bind(this)}/>
                        <br/>
                        <Input onChange={this.handleChangeRowII.bind(this)}/>
                        <br/>
                        {this.createRow()}
                        <div className="RatingScaleAddBtn">
                        <Button onClick={this.RSAddRow.bind(this)}>Add</Button>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label>Columns</Label>
                        <Input onChange={this.handleChangeColI.bind(this)} />
                        <br/>
                        <Input onChange={this.handleChangeColII.bind(this)} />
                        <br/>
                        {this.createCol()}
                        <div className="RatingScaleAddBtn">
                        <Button onClick={this.RSAddCol.bind(this)}>Add</Button>
                        </div>
                    </FormGroup>
                </Form>
                <div className="CommentBoxInputBtns">
                    <Button color="primary" onClick={this.RatingScaleSave.bind(this, surveyListId, questionValue, isRequired)}>Save</Button>{'  '}
                    <Button outline onClick={this.props.cancelFunc.bind(this)}>Cancel</Button>
                    <br/><br/>
                </div>
            </div>
        )
    }
}

const CreateOption = {
    collectionName: 'SurveyItems'
}

registerComponent({
    name: 'RatingScaleInput',
    component: RatingScaleInput,
    hocs: [[withCreate, CreateOption]]
});