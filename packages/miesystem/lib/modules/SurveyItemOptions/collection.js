/*

SurveyItemOptions collection

*/

import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations }  from 'meteor/vulcan:core';


export const SurveyItemOptions = createCollection({

  collectionName: 'SurveyItemOptions',

  typeName: 'SurveyItemOption',

  schema: schema,

  resolvers: getDefaultResolvers('SurveyItemOptions'),

  mutations: getDefaultMutations('SurveyItemOptions')

});

