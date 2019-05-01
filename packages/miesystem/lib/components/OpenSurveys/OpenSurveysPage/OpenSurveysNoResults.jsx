import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const OpenSurveysNoResults = props => <p className="posts-no-results"><FormattedMessage id="posts.no_results" /></p>;

OpenSurveysNoResults.displayName = "OpenSurveysNoResults";

registerComponent({ name:'OpenSurveysNoResults', component: OpenSurveysNoResults});