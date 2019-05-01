import { Components, registerComponent, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';

const ParticipatedUsersProfile = (props) => {

    if (props.loading) {

        return <Components.Loading />

    } else if (!props.document) {

        return <div className="page users-profile"><FormattedMessage id="app.404"/></div> 

    } else {

        const user = props.currentUser;

        const terms = {view: "userParticipatedSurveys", userId: user._id};

        return (
            <div>
                <Components.ParticipatedSurveysList terms={terms} showHeader={false} />
            </div>
        )
    }
}

ParticipatedUsersProfile.propTypes = {

}

ParticipatedUsersProfile.displayName = "ParticipatedUsersProfile";

const options = {
    collection: Users,
    queryName: 'usersParticipatesSurveysQuery'
};

registerComponent({
    name: 'ParticipatedUsersProfile',
    component: ParticipatedUsersProfile,
    hocs: [withCurrentUser, [withDocument, options]]
});