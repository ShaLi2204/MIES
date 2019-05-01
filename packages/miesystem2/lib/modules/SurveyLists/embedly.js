import { SurveyLists } from '../SurveyLists/index.js';

SurveyLists.addField([
    {
        fieldName: 'url',
        fieldSchema: {
            input: 'EmbedURL', //just extending the field url, not replacing it
        }
    }
]);