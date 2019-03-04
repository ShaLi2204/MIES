/*

SurveyLists permissions

*/

import Users from 'meteor/vulcan:users';

/*
const guestsActions = [
    'surveyLists.view'
];
Users.groups.guests.can(guestsActions);
*/
const membersActions = [
    'surveyLists.new',
    //'surveyLists.view',
    'surveyLists.edit.own',
    'surveyLists.remove.own',
];
Users.groups.members.can(membersActions);

const adminActions = [
    //'surveyLists.view',
    'surveyLists.edit.all',
    'surveyLists.remove.all'
];
Users.groups.admins.can(adminActions);
