/*

SurveyResponses permissions

*/

import Users from 'meteor/vulcan:users';

const guestsActions = [
    'surveyresponses.view'
];
Users.groups.guests.can(guestsActions);

const membersActions = [
  //  'surveyItems.view',
    'surveyresponses.new',
    'surveyresponses.edit.own',
    'surveyresponses.remove.own',
];
Users.groups.members.can(membersActions);

const adminActions = [
    'surveyresponses.edit.all',
    'surveyresponses.remove.all'
];
Users.groups.admins.can(adminActions);