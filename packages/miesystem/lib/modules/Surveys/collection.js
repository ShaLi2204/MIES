/*

Collection for defining survey 

*/
import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations }  from 'meteor/vulcan:core';
//import './fragments.js';
//import './permissions.js';
//import './custom_fields.js';
//import './views.js';
import Users from 'meteor/vulcan:users';

/**
 *  @summary The global namespace for SurveyLists
 *  @namespace SurveyLists
 */

export const SurveyLists = createCollection({

  collectionName: 'SurveyLists',

  typeName: 'SurveyList',

  schema,

  resolvers: getDefaultResolvers('SurveyLists'),

  mutations: getDefaultMutations('SurveyLists'),

});
/*
Surveys.config = {};

Surveys.config.STATUS_DRAFT = 1;
Surveys.config.STATUS_OPEN = 2;
Surveys.config.STATUS_PUBLIC = 3;
Surveys.config.STATUS_CLOSED = 4;
Surveys.config.STATUS_DELETED = 5;


/**
 * @summary Surveys statuses
 * @type {Object}
 */
/*
Surveys.statuses = [
  {
    value: 1,
    label: 'draft'
  },
  {
    value: 2,
    label: 'open'
  },
  {
    value: 3,
    label: 'public'
  },
  {
    value: 4,
    label: 'closed'
  },
  {
    value: 5,
    label: 'deleted'
  }
];*/
//TODO: PASSCODE CHECK

/*
SurveyLists.checkAccess = (currentUser, surveyList) => {
  if (Users.isAdmin(currentUser) || Users.owns(currentUser, surveyList)) { // admins can always see everything, users can always see their own surveys
    return true;
  } else {
    return true;
  }
};
*/

/*

Set a default results view whenever the SurveyLists Collection is queried

Surveys are sorted by their createdAt timestamp in descending order

*/

// createdAt -1 latest => oldest
// createdAt 1 oldest => latest

SurveyLists.addDefaultView(terms => {
  return {
    options: {sort: {createdAt: -1}}
  };
});



export default SurveyLists;