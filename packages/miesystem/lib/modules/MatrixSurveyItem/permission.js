/*

MatrixSurveyItems permissions

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
    'matrixsurveyitems.new',
    'matrixsurveyitems.edit.own',
    'matrixsurveyitems.remove.own',
];
Users.groups.members.can(membersActions);

const adminActions = [
    'matrixsurveyitems.edit.all',
    'matrixsurveyitems.remove.all'
];
Users.groups.admins.can(adminActions);