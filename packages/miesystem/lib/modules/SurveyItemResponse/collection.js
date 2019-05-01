/**
*  Survey Item Responses Collection
*/

import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import schema from './schema.js';

export const SurveyItemResponses = createCollection({

    collectionName: 'SurveyItemResponses',

    typeName: 'SurveyItemResponse',

    schema,

    resolver: getDefaultResolvers('SurveyItemResponses'),

    mutations: getDefaultMutations('SurveyItemResponses')

});

export default SurveyItemResponses;