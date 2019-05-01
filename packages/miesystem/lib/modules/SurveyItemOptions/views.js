/*

SurveyItemOptions views

*/

import { SurveyItemOptions } from './index.js';

SurveyItemOptions.addView('surveyItemSurveyItemOptions', function(terms){
    return {
        selector: {surveyItemId: terms.surveyItemId},
        options: {sort: {createdAt:1}}
    }
});