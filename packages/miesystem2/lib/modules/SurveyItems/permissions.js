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
    'surveyitems.new',
    'surveyitems.edit.own',
    'surveyitems.remove.own',
];
Users.groups.members.can(membersActions);

const adminActions = [
    'surveyitems.edit.all',
    'surveyitems.remove.all'
];
Users.groups.admins.can(adminActions);