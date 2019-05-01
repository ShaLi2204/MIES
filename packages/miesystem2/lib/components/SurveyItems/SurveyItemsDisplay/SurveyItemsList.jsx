import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
//import SurveyItems from '../../modules/SurveyItem/collection';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Spinner } from 'reactstrap';

class SurveyItemsList extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        
        const {surveyItemCount} = this.props;
                
        if(surveyItemCount>0) {
                        
            const {surveyItems} = this.props;
            const {currentUser} = this.props;
            const {surveyList} = this.props;

            return(
                <div style={{marginTop: '20px'}}>

                    {surveyItems.map((surveyItem, i) => 
                    <Components.SurveyItemsNode i={i} currentUser={currentUser} surveyItem={surveyItem} surveyList={surveyList} key={surveyItem._id} surveyItems={surveyItems} />
                    )}
                </div>
            )
        } else {
            return(
                <div>

                </div>
            )
        }
    }
    
}

SurveyItemsList.displayName = "SurveyItemsList";

registerComponent({ 
    name: 'SurveyItemsList', 
    component: SurveyItemsList
});