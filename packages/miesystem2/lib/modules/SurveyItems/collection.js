
/*
    Collection for survey items
*/

import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations }  from 'meteor/vulcan:core';


export const SurveyItems = createCollection({

  collectionName: 'SurveyItems',

  typeName: 'SurveyItem',

  schema: schema,

  resolvers: getDefaultResolvers('SurveyItems'),
  //resolvers: getDefaultResolvers({typeName:'SurveyList'}),
  mutations: getDefaultMutations('SurveyItems')

  //mutations: getDefaultMutations({typeName:'SurveyList'})

});

