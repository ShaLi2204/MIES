/** 
* Collection for defining SurveyLists 
*/

import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations }  from 'meteor/vulcan:core';
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

SurveyLists.config = {};
SurveyLists.config.STATUS_DRAFT = 1;
SurveyLists.config.STATUS_PUBLIC = 2;
SurveyLists.config.STATUS_CLOSED = 3;
SurveyLists.config.STATUS_DELETED = 4;

/**
 * @summary SurveyLists statuses
 * @type {object}
 */

SurveyLists.statuses = [
    {
        value: 1,
        label: 'draft'
    },
    {
        value: 2,
        label: 'public'
    },
    {
        value: 3,
        label: 'closed'
    },
    {
        value: 4,
        label: 'deleted'
    }
 ];

SurveyLists.addDefaultView(terms => {
 return {
   options: {sort: {createdAt: -1}}
 };
});

SurveyLists.checkAccess  = (currentUser, surveyList) => {
    if (Users.isAdmin(currentUser) || Users.owns(currentUser, surveyList)) {
        return true;
    } else if (surveyList.isFuture) {
        return false;
    } else {
        const status = _.findWhere(SurveyLists.statuses, {value: surveyList.status});
        return Users.canDo(currentUser, `surveylists.view.${status.label}`);
    }
}



export default SurveyLists;