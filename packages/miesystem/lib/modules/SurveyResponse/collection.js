/*

Collection for defining survey responses

*/

import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import schema from './schema.js';

const SurveyResponses = createCollection({

    collectionName: 'SurveyResponses',

    typeName: 'SurveyResponse',

    schema,

    resolver: getDefaultResolvers('SurveyResponses'),

    mutations: getDefaultMutations('SurveyResponses')
});

/* Three types of status of survey responses */
/* Draft: survey responses in progress */
/* Public: survey responses is available online */
/* Delted: survey responses deleted by the creators */

SurveyResponses.config = {};

SurveyResponses.config.STATUS_DRAFT = 1;
SurveyResponses.config.STATUS_PUBLIC = 2;
SurveyResponses.config.STATUS_DELETED = 3;

SurveyResponses.statuses = [
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
        label: 'deleted'
    }
];

SurveyResponses.checkAccess = (currentUser, surveyresponse) => {
    if (Users.isAdmin(currentUser) || Users.owns(currentUser, surveyresponse)) { // admins can always see everything, users can always see their own surveys
      return true;
    } else if (surveyresponse.isFuture) {
      return false;
    } else { 
      const status = _.findWhere(SurveyResponses.statuses, {value: SurveyResponses.status});
      return Users.canDo(currentUser, `surveyresponses.view.${status.label}`);
    }
  }