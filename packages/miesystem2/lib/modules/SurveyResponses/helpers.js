import moment from 'moment';
import { SurveyResponses } from './collection.js';
import Users from 'meteor/vulcan:users';
import { Utils, getSetting, registerSetting } from 'meteor/vulcan:core';

SurveyResponses.getLinkParticipated = function( surveyResponse, isAbsolute = false, isRedirected = true) {
    const url = isRedirected ? Utils.getOutgoingUrl(surveyResponse.url) : surveyResponse.url;
    return !!surveyResponse.url ? url : SurveyResponses.getPageUrlParticipated(surveyResponse, isAbsolute);    
};

SurveyResponses.getPageUrlParticipated = function(surveyResponse, isAbsolute = false) {
    const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
    return `${prefix}/participated/${surveyResponse._id}`;    
};

SurveyResponses.getLinkTarget = function(surveyResponse) {
    return !!surveyResponse.url ? '_blank' : '';
};

SurveyResponses.getDefaultStatus = function(user) {
    return SurveyResponses.config.STATUS_DRAFT;
};

SurveyResponses.getStatusName = function (surveyList) {
    if (surveyResponse.status === null) {
        return "NULL"
    } else {
        return Utils.findWhere(SurveyResponses.statuses, {value: surveyResponse.status}).label;
    }
};

SurveyResponses.isDraft = function (surveyResponse) {
    return surveyResponse.status === SurveyResponses.config.STATUS_DRAFT;
};

SurveyResponses.isSubmitted = function (surveyResponse) {
    return surveyResponse.status === SurveyResponses.config.STATUS_SUBMITTED;
};

SurveyResponses.isDeleted = function (surveyResponse) {
    return surveyResponse.status === SurveyResponses.config.STATUS_DELETED;
};