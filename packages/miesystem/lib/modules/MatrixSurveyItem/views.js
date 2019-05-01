/*

Matrix Survey Items views

*/

import { MatrixSurveyItems } from './index.js';

MatrixSurveyItems.addView('surveyItemmatrixSurveyItem', function (terms) {
    return {
        selector: {_id: terms._id},
        options: {sort: {createdAt: 1}}
    };
});