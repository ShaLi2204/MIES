/*

    Schema for Matrix Survey Items

*/

import Users from 'meteor/vulcan:users';
import { Utils } from 'meteor/vulcan:core';
import marked from 'marked';
import SimpleSchema from 'simpl-schema';
import { SurveyItemOptions } from '../SurveyItemOptions/collection';

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

    title: {
        type: String,
        optional: true,
        canRead: ['guests'],
        canCreate:['members'],
        canUpdate:['members'],
        input: 'textarea',      
    },
    
    surveyItems: {
        type: Object,
        optional: true,
        canRead: ['guests'],
        resolveAs: {
            arguments: 'limit: Int = 10',
            type: '[SurveyItem]',
            resolver: (matrixSurveyItem, {limit}, {currentUser, Users, SurveyItems}) => {
                const surveyItems = SurveyItems.find({ matrixSurveyItemId: matrixSurveyItem._id }, {limit}).fetch();
                return surveyItems;
            }
        }
    },

    matrixSurveyItemOptions: {
        type: Object,
        optional: true,
        canRead: ['guests'],
        resolveAs: {
            arguments: 'limit: Int = 5',
            type: '[MatrixSurveyItemOption]',
            resolver: (matrixSurveyItem, {limit}, {currentUser, Users, MatrixSurveyItemOptions }) => {
                const matrixSurveyItemOptions = MatrixSurveyItemOptions.find({ matrixSurveyItemId: matrixSurveyItem._id}, {limit}).fetch();
                return matrixSurveyItemOptions;
            }
        }        
    }
}

export default schema;