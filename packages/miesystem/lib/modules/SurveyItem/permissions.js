/*

SurveyItems permissions

*/

import Users from 'meteor/vulcan:users';
/*
const guestsActions = [
    'surveyItems.view'
];
Users.groups.guests.can(guestsActions);
*/
const membersActions = [
  //  'surveyItems.view',
    'surveyItems.new',
    'surveyItems.edit.own',
    'surveyItems.remove.own',
];
Users.groups.members.can(membersActions);

const adminActions = [
    'surveyItems.edit.all',
    'surveyItems.remove.all'
];
Users.groups.admins.can(adminActions);