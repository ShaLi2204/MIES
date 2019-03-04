import { Components, registerComponent, withMessages } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import SurveyItems from '../../modules/SurveyItem/collection';
import moment from 'moment';

class SurveyItemsItem extends Component{
    
    render(){

        const surveyItem = this.props.surveyItem;

        return(
            <div>
                {surveyItem.label}
            </div>
        )
    }
}

SurveyItemsItem.propTypes = {
    surveyItem: PropTypes.object.isRequired,
    currentUser: PropTypes.object
};

registerComponent({name:'SurveyItemsItem', component: SurveyItemsItem});