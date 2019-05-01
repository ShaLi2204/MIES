import {registerComponent} from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const OpenSurveysNoMore = props => <p className="posts-no-more"><FormattedMessage id="posts.no_more"/></p>;

OpenSurveysNoMore.displayName = "OpenSurveysNoMore";

registerComponent({ name: 'OpenSurveysNoMore', component: OpenSurveysNoMore});