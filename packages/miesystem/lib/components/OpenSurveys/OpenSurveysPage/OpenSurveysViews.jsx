import { Components, registerComponent, withCurrentUser, Utils } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Users from 'meteor/vulcan:users';

const OpenSurveysViews = (props, context) => {

    let views = ['public']; //normal users can see all the surveys created by himself and the public surveys
    const adminViews = ['draft', 'closed']; //admins can view all the surveys (draft and closed of others as well)

    if (Users.canDo(props.currentUser, 'surveylists.edit.all')){
        views = views.concat(adminViews);
    }

    const query = _.clone(props.router.location.query);

    return(
        <div>
            <Components.Dropdown
                buttonProps={{ variant: 'secondary' }}
                id="views-dropdown"
                className="views"
                labelId={'surveyLists.view'} //Should show "view"
                menuItems={[
                    ...views.map(view => ({
                        to: { pathname: '/opensurveys' /*Utils.getRoutePath('surveyLists.list')*/, query: { ...query, view: view } },
                        labelId: `surveylists.${view}`,
                }))
                ]}
            />
        </div>
    );
};

OpenSurveysViews.propTypes = {
    currentUser: PropTypes.object,
    defaultView: PropTypes.string,
};

OpenSurveysViews.defaultProps = {
    defaultView: 'public',
};

OpenSurveysViews.contextTypes = {
    currentRoute: PropTypes.object,
};

OpenSurveysViews.displayName = 'OpenSurveysViews';

registerComponent({ name: 'OpenSurveysViews', component: OpenSurveysViews, hocs: [withCurrentUser, withRouter]});