/*

SurveyItemOptions permission

*/

import Users from 'meteor/vulcan:users';

const guestsActions = [
    'surveyitemoptions.view'
];
Users.groups.guests.can(guestsActions);

const membersActions = [
    'surveyitemoptions.view',
    'surveyitemoptions.new',
    'surveyitemoptions.edit.own',
    'surveyitemoptions.remove.own'
];
Users.groups.members.can(membersActions);

const adminActions = [
    'surveyitemoptions.edit.all',
    'surveyitemoptions.remove.all'
];
Users.groups.admins.can(adminActions);