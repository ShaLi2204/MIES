/*

Comments views

*/

import { SurveyItems } from './index.js';

SurveyItems.addView('surveyListSurveyItems', function (terms) {
  return {
    selector: {surveyListId: terms.surveyListId},
    options: {sort: {createdAt: -1}}
  };
});

SurveyItems.addView('userSurveyItems', function (terms) {
  return {
    selector: {userId: terms.userId},
    options: {sort: {createdAt: -1}}
  };
});