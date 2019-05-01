/*

    Schema for Matrix Survey Item Options

*/

import Users from 'meteor/vulcan:users';
import { Utils } from 'meteor/vulcan:core';
import marked from 'marked';
import SimpleSchema from 'simpl-schema';

const schema = {

    _id: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canCreate:['members'],
        canUpdate:['members']
    },

    createdAt: {
        type: Date,
        optional: true,
        canRead: ['members'],
        onCreate: () => {
            return new Date();
        }
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
            resolver: async (surveyItem, args, {currentUser, Users}) => {
                if( !surveyItem.userId) return null;
                const user = await Users.loader.load(surveyItem.userId);
                return Users.restrictViewableFields(currentUser, Users, user);
            },
            addOriginalField: true
            
        }
    },

    matrixSurveyItemId: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canUpdate: ['members'],
        canCreate: ['members'],
        max: 500,
        resolveAs: {
            fieldName: 'matrixSurveyItem',
            type: 'MatrixSurveyItem',
            resolver: async (matrixSurveyItemOption, args, {currentUser, Users, MatrixSurveyItems}) => {
                if (!matrixSurveyItemOption.matrixSurveyItemId) return null;
                const matrixSurveyItem = await MatrixSurveyItems.loader.load(matrixSurveyItemOption.matrixSurveyItemId);
                return Users.restrictViewableFields(currentUser, MatrixSurveyItems, matrixSurveyItem);
            },
            addOriginalField: true
        },
        hidden: true
    },

    options: {
        type: String,
        optional: true,
        canRead:['guests'],
        canCreate: ['members'],
        canUpdate: ['members'],
        input: "textarea"
    },
}

export default schema;