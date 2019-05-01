/**
 *  Schema for the Survey Reponses
 */

const schema = {

    _id: {
        type: String,
        optional: true,
        canRead: ['guests'],
    },

    /* The time at which the survey response is public */
    createdAt: {
        type: Date,
        optional: true,
        canRead: ['guests'],
        onCreate: () => {
            return new Date();
        }
    },

    userId: {
        type: String, 
        optional: true,
        input: 'select',
        canRead: ['guests'],
        canCreate: ['members'],
        hidden: true,
        resolveAs: {
            fieldName: 'user',
            type: 'User',
            resolver: async (surveyResponse, args, context) => {
                if (!surveyResponse.userId) return null;
                const user = await context.Users.loader.load(surveyResponse.userId);
                return context.Users.restrictViewableFields(context.currentUser, context.Users, user);
            },
            addOriginalField: true
        }
    },

    surveyListId: {
        type: String, 
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        max: 500, 
        resolveAs: {
            fieldName: 'surveyList',
            type: 'SurveyList',
            resolver: async (surveyResponse, args, {currentUser, Users, SurveyLists}) => {
                if (!surveyResponse.surveyListId) return null;
                const surveyList = await SurveyLists.loader.load(surveyResponse.surveyListId);
                return Users.restrictViewableFields(currentUser, SurveyLists, surveyList);
            },
            addOriginalField: true
        },
        hidden: true
    },

    surveyItemResponses: {
        type: Object, 
        optional: true,
        canRead: ['guests'],
        resolveAs: {
            arguments: 'limit: Int = 5',
            type: '[SurveyItemResponse]',
            resolver: (surveyResponse, { limit }, { currentUser, Users, SurveyItemResponses }) => {
                const surveyItemResponses = SurveyItemResponses.find({ surveyResponseId: surveyResponse._id}, { limit }).fetch();
                return surveyItemResponses;
            }
        }
    }
}

export default schema;
