/*

Schema of SurveyItemResponses

*/


import Users from 'meteor/vulcan:users';
import { Utils, getSetting, registerSetting, getCollection } from 'meteor/vulcan:core';
import moment from 'moment';
import marked from 'marked';

/**
 * @summary SurveyItemResponses schema
 * @type {Object}
 */

const schema = {

    _id: {
        type: String, 
        optional: true,
        canRead: ['guests'],
		canUpdate: ['members']
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
                if(!surveyItemResponse.surveyItemId) return null;
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
        canCreate: ['guests'],
        // regEx: SimpleSchema.RegEx.Id,
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
        hidden: true // never show this
      },

    surveyItemAnswers: {
        type: String, 
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
    },

    surveyItemType: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
    },
	
	userId: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        hidden: true,
        resolveAs: {
            fieldName: 'user',
            type: 'User',
            resolver: async (surveyItemResponse, args, {currentUser, Users}) => {
                if( !surveyItemResponse.userId) return null;
                const user = await Users.loader.load(surveyItemResponse.userId);
                return Users.restrictViewableFields(currentUser, Users, user);
            },
            addOriginalField: true
            
        }
    },

}

export default schema;