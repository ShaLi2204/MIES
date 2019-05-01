/*

SurveyLists permissions

*/

import Users from 'meteor/vulcan:users';


const guestsActions = [
    'surveyLists.view.public'
];
Users.groups.guests.can(guestsActions);

const membersActions = [
    'surveylists.new',
    'surveylists.edit.own',
    'surveylists.remove.own',
    'surveylists.view.public'
];
Users.groups.members.can(membersActions);

const adminActions = [
    'surveylists.new',
    'surveylists.edit.all',
    'surveylists.remove.all',
    'surveylists.view.draft',
    'surveylists.view.public',
    'surveylists.view.closed'
];
Users.groups.admins.can(adminActions);
