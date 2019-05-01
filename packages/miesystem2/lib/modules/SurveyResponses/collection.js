/**
* Colelction for defining Survey Responses 
*/

import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations }  from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

/**
 * @summary The global namespace for Survey Responses
 * @namespace SurveyResponses
 */

export const SurveyResponses = createCollection({

    collectionName: 'SurveyResponses',

    typeName: 'SurveyResponse',
   
    schema,
   
    resolvers: getDefaultResolvers('SurveyResponses'),
   
    mutations: getDefaultMutations('SurveyResponses'),

});

SurveyResponses.config = {};
SurveyResponses.config.STATUS_DRAFT = 1;
SurveyResponses.config.STATUS_SUBMITTED = 2;
SurveyResponses.config.STATUS_DELETED = 3;

/**
 * @summary SurveyResponses statuses
 * @type {object}
 */

SurveyResponses.statuses = [
    {
        value: 1,
        label: 'draft'
    },
    {
        value: 2,
        label: 'submitted'
    },
    {
        value: 3, 
        label: 'deleted'
    }
];

SurveyResponses.addDefaultView(terms => {
    return{
        options: {sort: {createdAt: -1}}
    };
});

export default SurveyResponses;