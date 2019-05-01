/**
 * SurveyItemResponses permissions
 */

import Users from 'meteor/vulcan:users';

const memberActions = [
    'surveyitemresponses.new',
    'surveyitemresponses.edit.own',
    'surveyitemresponses.remove.own',
];
Users.groups.members.can(memberActions);

const adminActions = [
    'surveyitemresponses.edit.all',
    'surveyitemresponses.new',
    'surveyitemresponses.remove.all'
];
Users.groups.admins.can(adminActions);