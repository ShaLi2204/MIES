/*import SurveyLists from '../modules/Surveys/collection';
import SurveyItems from '../modules/SurveyItem/collection';
import Users from 'meteor/vulcan:users';
import { Utils } from 'meteor/vulcan:core';
import { Picker } from 'meteor/meteorhacks:picker';

export const serverSurveyListsApi = (terms) => {
    var surveyLists = [];

    if(!terms.limit){
        terms.limit = 50;
    }

    var parameters = SurveyLists.getParameters(terms);

    const surveyListsCursor = SurveyLists.find(parameters.selector, parameters.options);

    surveyListsCursor.forEach(function(surveyList) {

    })
}*/