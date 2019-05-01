/**
 * 
 * SurveyItemResponses View
 * 
 */

import { SurveyItemResponses } from './index.js';

SurveyItemResponses.addView('surveyResponseSurveyItemResponses', function(terms) {
    return {
        selector: {surveyResponseId: terms.surveyResponseId},
        options: {sort: {createdAt: 1}}
    };
});


SurveyItemResponses.addView('surveyItem2SurveyItemResponses', function(terms) {
    return {
        selector: {
            surveyItemId: terms.surveyItemId,
            surveyResponseId: terms.surveyResponseId
        },
        options: {sort: {createdAt: 1}}
    }
});

SurveyItemResponses.addView('surveyItem2AllSurveyItemResponses', function(terms) {
    return {
        selector: {surveyItemId: terms.surveyItemId},
        options: {sort: {createdAt: 1}}
    };
});