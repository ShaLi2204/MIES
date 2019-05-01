import { registerComponent } from 'meteor/vulcan:core';
import React, {Component} from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Alert } from 'reactstrap';

//const OpenSurveysNoResults = props => <p className="posts-no-results"><FormattedMessage id="posts.no_results" /></p>;

class OpenSurveysNoResults extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        return (
            <div>
                <Alert color="secondary">
                    No Open Surveys!
                </Alert>
            </div>
        )
    }
}

OpenSurveysNoResults.displayName = "OpenSurveysNoResults";

registerComponent({ name:'OpenSurveysNoResults', component: OpenSurveysNoResults});