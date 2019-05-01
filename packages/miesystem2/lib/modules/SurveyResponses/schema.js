/**
 * 
 * Schema of SurveyResponses
 * 
 */

import Users from 'meteor/vulcan:users';
import { Utils, getSetting, registerSetting, getCollection } from 'meteor/vulcan:core';
import moment from 'moment';
import marked from 'marked';

/**
 * @summary SurveyResponses schema
 * @type {object}
 */

const schema = {

    _id: {
        type: String,
        optional: true,
        canRead: ['guests'],
    },

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
        hidden: true // never show this        
    },

    surveyListTitle: {
        type: String, 
        optional: true,
        canRead: ['guests'],
        canCreate: ['members']
    },

    surveyItemResponses: {
        type: Object, 
        optional: true,
        canRead: ['guests'],
		canUpdate: ['members'],
        resolveAs: {
            arguments: 'limit: Int = 5', 
            type: '[SurveyItemResponse]', 
            resolver: (surveyResponse, { limit }, {currentUser, Users, SurveyItemResponses}) => {
                const surveyItemResponses = SurveyItemResponses.find({ surveyResponseId: surveyResponse._id}, { limit }).fetch();
                return surveyItemResponses;
            }
        }
    },

       
    url: {
        type: String,
        optional: true,
        max: 500,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
        input: 'url',
        order: 10,
        searchable: true,
        query: `
        SiteData{
            logoUrl
            title
        }
        `,
    },

    status: {
        type: Number,
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
        input: 'select',
        hidden: true,
        onCreate: ({document: document, currentUser}) => {
            if(!document.status) {
                return getCollection('SurveyResponses').getDefaultStatus(currentUser);
            }
        }, 
        onUpdate: ({data, currentUser}) => {
            if(data.status === null) {
                return getCollection('SurveyResponses').getDefaultStatus(currentUser);
            }
        },
        options: () => getCollection('SurveyResponses').statuses,
    },
}

export default schema;