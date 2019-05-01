/*

MatrixSurveyItemOptions permissions

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
    'matrixsurveyitemoptions.new',
    'matrixsurveyitemoptions.edit.own',
    'matrixsurveyitemoptions.remove.own',
];
Users.groups.members.can(membersActions);

const adminActions = [
    'matrixsurveyitemoptions.edit.all',
    'matrixsurveyitemoptions.remove.all'
];
Users.groups.admins.can(adminActions);