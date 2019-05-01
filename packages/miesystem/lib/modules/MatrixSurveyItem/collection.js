/*
    Collection for survey items matrix
*/

import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations }  from 'meteor/vulcan:core';
//import './fragments.js';
//import './permissions.js';

export const MatrixSurveyItems = createCollection({

  collectionName: 'MatrixSurveyItems',

  typeName: 'MatrixSurveyItem',

  schema: schema,

  resolvers: getDefaultResolvers('MatrixSurveyItems'),
  //resolvers: getDefaultResolvers({typeName:'SurveyList'}),
  mutations: getDefaultMutations('MatrixSurveyItems')

  //mutations: getDefaultMutations({typeName:'SurveyList'})

});