/*

Matrix Survey Item Options 

*/

import { MatrixSurveyItemOptions } from './index.js';

MatrixSurveyItemOptions.addView('surveyItemMatrixSurveyItemOptions', function(terms){
    return {
        selector: {matrixSurveyItemId: terms.matrixSurveyItemId},
        options: {sort: {createdAt: 1}}
    };
});