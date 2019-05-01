import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Row,
    Col
} from 'reactstrap';

class OSSurveyItemsNode extends Component {

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

            const {surveyItem} = this.props;
            const {surveyItems} = this.props;
            const {currentUser} = this.props;
            const {i} = this.props;
            const {surveyItemAnswersUpdate} = this.props;

            if (surveyItem.surveyItemType=="CommentBox") {
                return(
                    <div>
                        <Components.OSCommentBoxDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyItemAnswersUpdate={surveyItemAnswersUpdate} />
                    </div>
                )
            } else if (surveyItem.surveyItemType=="TextBox"){
                return(
                    <div>
                        <Components.OSTextBoxDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyItemAnswersUpdate={surveyItemAnswersUpdate} />
                    </div>
                )
            } else if (surveyItem.surveyItemType=="MultipleChoice"){
                return(
                    <div>
                        <Components.OSMultipleChoiceDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyItemAnswersUpdate={surveyItemAnswersUpdate} />
                    </div>
                )
            } else if (surveyItem.surveyItemType=="CheckBox"){
                return(
                    <div>
                        <Components.OSCheckBoxDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyItemAnswersUpdate={surveyItemAnswersUpdate} />
                    </div>
                )
            } else if (surveyItem.surveyItemType=="RatingScale"){
                return(
                    <div>
                        <Components.OSRatingScaleDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyItemAnswersUpdate={surveyItemAnswersUpdate} />
                    </div>
                )
            } else if (surveyItem.surveyItemType=="SelfTracking"){
                return(
                    <div>
                        <Components.OSSelfTrackingDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyItemAnswersUpdate={surveyItemAnswersUpdate} />
                    </div>
                )
            } else {
                return(
                    <div>
                        Wrong Survey Item Type
                    </div>
                )
            }
        }
    }
}
/*
const OSSurveyItemsNode = ({ surveyItem, surveyItems, currentUser, i, loading, surveyResponseId, surveyItemAnswersUpdate, surveyItemAnswersDelete}) => {

    if (loading) {

        return <Components.Loading />

    } else if (surveyItem.surveyItemType=="CommentBox"){
        return(
            <div>
                <Components.OSCommentBoxDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyItemAnswersUpdate={surveyItemAnswersUpdate} />
            </div>
        )
    } else if (surveyItem.surveyItemType=="TextBox"){
        return(
            <div>
                <Components.OSTextBoxDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyItemAnswersUpdate={surveyItemAnswersUpdate} />
            </div>
        )
    } else if (surveyItem.surveyItemType=="MultipleChoice"){
        return(
            <div>
                <Components.OSMultipleChoiceDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyItemAnswersUpdate={surveyItemAnswersUpdate} />
            </div>
        )
    } else if (surveyItem.surveyItemType=="CheckBox"){
        return(
            <div>
                <Components.OSCheckBoxDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyItemAnswersUpdate={surveyItemAnswersUpdate} />
            </div>
        )
    } else if (surveyItem.surveyItemType=="RatingScale"){
        return(
            <div>
                <Components.OSRatingScaleDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyItemAnswersUpdate={surveyItemAnswersUpdate} />
            </div>
        )
    } else if (surveyItem.surveyItemType=="SelfTracking"){
        return(
            <div>
                <Components.OSSelfTrackingDisplay i={i} currentUser={currentUser} surveyItem={surveyItem} key={surveyItem._id} surveyItemAnswersUpdate={surveyItemAnswersUpdate} />
            </div>
        )
    } else {
        return(
            <div>
                Wrong Survey Item Type
            </div>
        )
    }
}
*/
OSSurveyItemsNode.propTypes = {
    surveyItem: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
};

registerComponent({
    name: 'OSSurveyItemsNode',
    component: OSSurveyItemsNode
});