/**
 * Collection for defining SurveyItemResponses
 */

import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations }  from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

/**
*  @summary The global namespace for SurveyItemResponses
*  @namespace SurveyItemResponses
*/

export const SurveyItemResponses = createCollection({

    collectionName: 'SurveyItemResponses',
   
    typeName: 'SurveyItemResponse',
   
    schema,
   
    resolvers: getDefaultResolvers('SurveyItemResponses'),
   
    mutations: getDefaultMutations('SurveyItemResponses'),
   
   });

export default SurveyItemResponses;