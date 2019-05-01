/**
* Schema for the Survey Item Responses 
*/

const schema = {

    _id: {
        type: String,
        optional: true,
        canRead: ['guests'],
    },

    surveyItemId: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        max: 500, 
        resolveAs: {
            fieldName: 'surveyItem',
            type: 'SurveyItem',
            resolver: async (surveyItemResponse, args, {currentUser, Users, SurveyItems}) => {
                if (!surveyItemResponse.surveyItemId) return null;
                const surveyItem = await SurveyItems.loader.load(surveyItemResponse.surveyItemId);
                return Users.restrictViewableFields(currentUser, SurveyItems, surveyItem);
            },
            addOriginalField: true
        },
        hidden: true
    },

    surveyResponseId: {
        type: String, 
        optional: true, 
        canRead: ['guests'], 
        canCreate: ['members'],
        max: 500,
        resolveAs: {
            fieldName: 'surveyResponse',
            type: 'SurveyResponse',
            resolver: async (surveyItemResponse, args, {currentUser, Users, SurveyResponses}) => {
                if (!surveyItemResponse.surveyResponseId) return null;
                const surveyResponse = await SurveyResponses.loader.load(surveyItemResponse.surveyResponseId);
                return Users.restrictViewableFields(currentUser, SurveyResponses, surveyResponse);
            },
            addOriginalField: true
        }, 
        hidden: true
    }, 

    answer: {
        type: String,
    }, 

    answerId: {
        type: String
    }
}

export default schema;