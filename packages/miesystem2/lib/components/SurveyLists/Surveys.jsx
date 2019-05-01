

import { Components, registerComponent, withMulti, withCurrentUser, Loading, Utils, withUpdate, withDocument } from 'meteor/vulcan:core';
import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { SurveyLists } from '../../modules/SurveyLists/index.js';
import { 
  Button, 
  ListGroup, 
  ListGroupItem, 
  Container, 
  Row, 
  Col, 
  Modal, 
  ModalHeader, 
  ModalFooter,
  ModalBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';

class Surveys extends Component{

  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      AnalyzeModal: false,
      showEditPublic: props.surveyList.status==1 ? true: false,
      showAnalyze: props.surveyList.status ==1? false: true,
      showClose: props.surveyList.status == 2 ? true: false,
      dropdownOpen: false,

    }
  }

  ModalOpen(){
    this.setState({
      isOpen: true
    })
  }

  AnalyzeModalOpenFunc(){
    this.setState({
      AnalyzeModal: true,
    })
  }

  AnalyzeModalCloseFunc(){
    this.setState({
      AnalyzeModal: false
    })
  }


  renderActions() {
    const {surveyList} = this.props;    
    return(
      <div>
        <div style={{textAlign: 'right', width: '100%'}}>
        {this.state.showEditPublic && 
          <div style={{display: 'inline-block', marginRight:'5px'}}>
            <Components.ModalTrigger label="Edit" title="Edit" component={<Button size="sm" color="primary">Edit</Button>}>
              <Components.SurveysEditForm surveyList={this.props.surveyList}/>
            </Components.ModalTrigger>
          </div>
        }
        {this.state.showEditPublic &&
          <div style={{display: 'inline-block', marginRight:'5px'}}>
            <Button size="sm" color="primary" onClick={this.renderPublic.bind(this, surveyList._id)}>Publish</Button>
          </div>
        }

        {this.state.showEditPublic &&
          <div style={{display: 'inline-block', marginRight:'5px'}}>
            <Button size="sm" color="primary" onClick={this.renderDelete.bind(this, surveyList._id)}>Delete</Button>
          </div>
        }
        {this.state.showClose &&
          <div style={{display: 'inline-block', marginRight:'5px'}}>
            <Button size="sm" color="primary" onClick={this.renderClose.bind(this, surveyList._id)}>Close</Button>
          </div>
        }

        {this.state.showAnalyze && 
          <div style={{display: 'inline-block', marginRight:'5px'}}>
            <Button size="sm" color="primary" onClick={this.AnalyzeModalOpenFunc.bind(this)}>Analyze</Button>
          </div>
        }
        </div>
      </div>
    )
  }

  renderPublic(id) {
    this.props
    .updateSurveyList({
      selector: {documentId: id},
      data: {status: 2}
    });
    swal({
      title: "Survey is now public",
      icon: "success",
    });
    this.setState({
      showEditPublic: false,
      showAnalyze: true,
      showClose: false
    });
	  //window.location.reload(); force to reload the component
  }

  renderDelete(id) {
    this.props
    .updateSurveyList({
      selector: {documentId: id},
      data: {status: 4}
    });
    swal({
      title: "Survey is deleted",
      icon: "success"
    });
    
  }

  renderClose(id) {
    this.props
    .updateSurveyList({
      selector: {documentId: id},
      data: {status: 3}
    });
    swal({
      title: "Survey is now closed",
      icon: "success"
    });
  }

  render(){

    const {surveyList} = this.props;

    return(

      <div>
        <ListGroup>
          <ListGroupItem>
            <Container>
              <Row>
                <Col xs="4">
				          <Link to={SurveyLists.getLinkCreated(surveyList)} target={SurveyLists.getLinkTarget(surveyList)}>
                    {surveyList.title}
                  </Link>
                </Col>
                <Col xs="auto">
                  {SurveyLists.options.mutations.update.check(this.props.currentUser, surveyList) && this.renderActions()}
                </Col>
              </Row>
            </Container>
          </ListGroupItem>
        </ListGroup>
      
      
      {/*------------------------------------------------------ Modal for Analyze ----------------------------------------------------------- */}
      <Modal isOpen={this.state.AnalyzeModal} size="lg">
        <ModalHeader>
          {surveyList.title}
        </ModalHeader>
        <ModalBody>
          <Components.SurveyAnalyze 
            terms={{surveyListId:surveyList._id, view: 'surveyListSurveyItems'}}
            surveyList={surveyList}
          />
        </ModalBody>
        <ModalFooter>
          <Button size="sm" outline onClick={this.AnalyzeModalCloseFunc.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </div>
      )

    }

 // }
}


Surveys.propTypes = {
  currentUser: PropTypes.object,
  surveyList: PropTypes.object.isRequired,
  terms: PropTypes.object
}

const updateOptions = {
  collectionName: 'SurveyLists'
}

const queryOption = {
  collectionName: "SurveyLists"
}

  
registerComponent({
  name:'Surveys', 
  component: Surveys,
  hocs: [[withUpdate, updateOptions], [withDocument, queryOption]]
});