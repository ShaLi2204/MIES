/*

MatrixSurveyItemOptions collection

*/

import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations }  from 'meteor/vulcan:core';


export const MatrixSurveyItemOptions = createCollection({

  collectionName: 'MatrixSurveyItemOptions',

  typeName: 'MatrixSurveyItemOption',

  schema: schema,

  resolvers: getDefaultResolvers('MatrixSurveyItemOptions'),

  mutations: getDefaultMutations('MatrixSurveyItemOptions')

});

