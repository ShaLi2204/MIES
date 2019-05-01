import { SurveyResponses } from './collection.js';


SurveyResponses.addView('userParticipatedSurveys', terms => ({
    selector: {
        userId: terms.userId,
        $or: [
            {status: 1},
            {status: 2}
        ]
    },
    options: {
        limit: 5, 
        sort: {
            createdAt: -1
        }
    }
}));

SurveyResponses.addView('draft', terms => ({
    selector:{
        status: SurveyResponses.config.STATUS_DRAFT
    },
    options: {
        sort: {createdAt: -1}
    }
}));

SurveyResponses.addView('submitted', terms => ({
    selector: {
        status: SurveyResponses.config.STATUS_SUMMITTED
    },
    options: {
        sort: {createdAt: -1}
    }
}));

SurveyResponses.addView('deleted', terms => ({
    selector: {
        status: SurveyResponses.config.STATUS_DELETED
    },
    options: {
        sort: {createdAt: -1}
    }
}));

SurveyResponses.addView('SurveyList2SurveyResponses', terms => ({
    selector: {
        surveyListId: terms.surveyListId,
        status: 2
    }, 
    options: {
        sort: {createdAt: -1}
    }
}));