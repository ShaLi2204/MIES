/*

SurveyItemOptions schema

*/

import Users from 'meteor/vulcan:users';
import marked from 'marked';
import { Utils } from 'meteor/vulcan:core';

const schema = {

    _id:{
        type: String, 
        optional: true,
        canRead:['guests']
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
            resolver: async (surveyItemOption, args, {currentUser, Users, SurveyItems}) => {
                if(!surveyItemOption.surveyItemId) return null;
                const surveyItem = await SurveyItems.loader.load(surveyItemOption.surveyItemId);
                return Users.restrictedViewableFields(currentUser, SurveyItems, surveyItem);
            },
            addOriginalField: true
        },
        hidden: true
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
            resolver: async (surveyItemOption, args, {currentUser, Users}) => {
                if( !surveyItemOption.userId) return null;
                const user = await Users.loader.load(surveyItemOption.userId);
                return Users.restrictViewableFields(currentUser, Users, user);
            },
            addOriginalField: true
        }
    },

    createdAt: {
        type: Date,
        optional: true,
        canRead: ['admins'],
        onCreate: () => {
            return new Date();
        }
    },

    options: {
        type: String,
        optional: true,
        canRead:['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
        input: "textarea"
    },
/*
    surveyItemOptionMatrixTitle: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canCreate: ['members'],
        max: 500,
        resolveAs: {
            fieldName: 'surveyItem',
            type: 'SurveyItem',
            resolver: async (surveyItemOption, args, {currentUser, Users, Posts}) => {
                if (!surveyItemOption.surveyItemOptionMatrixTitle) return null;
                const surveyItem = await SurveyItems.loader.load(surveyItemOption.surveyItemOptionMatrixTitle);
                return Users.restrictedViewableFields(currentUser, SurveyItems, surveyItem);
            },
            addOriginalField: true
        }, 
        hidden: true
    },
*/
}

export default schema;