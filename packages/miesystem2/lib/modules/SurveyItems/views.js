/*

Comments views

*/

import { SurveyItems } from './index.js';
import { func } from 'prop-types';
/*
SurveyItems.addDefaultView(terms => {
  return {
    options: {sort: {createdAt: 1}}
  }
});
*/
SurveyItems.addView('surveyListSurveyItems', function (terms) {
  return {
    selector: {
      surveyListId: terms.surveyListId,
      isDeleted: false
    },
    options: {sort: {createdAt: 1}}
  };
});

SurveyItems.addView('userSurveyItems', function (terms) {
  return {
    selector: {userId: terms.userId},
    options: {sort: {createdAt: 1}}
  };
});

SurveyItems.addView('surveyItemResponse2SurveyItem', function(terms) {
  return {
    selector: {_id: terms._id},
    options: {sort: {createdAt: 1}}
  }
});