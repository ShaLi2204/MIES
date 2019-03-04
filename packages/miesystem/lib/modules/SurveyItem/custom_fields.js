
import SurveyLists from '../Surveys/collection.js';
import Users from 'meteor/vulcan:users';

SurveyLists.addField([
    {
        fieldName: 'surveyItemCount',
        fieldSchema: {
            type: Number, 
            optional: true,
            defaultValue: 0,
            canRead: ['guests']
        }
    }
])
;