/**
 * SurveyLists helpers
 */

import moment from 'moment';
import { SurveyLists } from './collection.js';
import Users from 'meteor/vulcan:users';
import { Utils, getSetting, registerSetting } from 'meteor/vulcan:core';

/**
 * @summary Return a surveyList's link if it has one, else return its surveyList page URL
 * @param {Object} surveyList
 */

SurveyLists.getLink = function (surveyList, isAbsolute = false, isRedirected = true) {
    const url = isRedirected ? Utils.getOutgoingUrl(surveyList.url) : surveyList.url;
    return !!surveyList.url ? url : SurveyLists.getPageUrl(surveyList, isAbsolute);
};

/**
 * Helpers for the created SurveyLists
 */   
SurveyLists.getLinkCreated = function (surveyList, isAbsolute = false, isRedirected = true) {
    const url = isRedirected ? Utils.getOutgoingUrl(surveyList.url) : surveyList.url;
    return !!surveyList.url ? url : SurveyLists.getPageUrlCreated(surveyList, isAbsolute);
};
   
SurveyLists.getPageUrlCreated = function(surveyList, isAbsolute = false){
    const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
    return `${prefix}/newsurvey/${surveyList._id}`;
};

SurveyLists.getLinkNoDraft = function (surveyList, isAbsolute = false, isRedirected = true) {
    const url = isRedirected ? Utils.getOutgoingUrl(surveyList.url) : surveyList.url;
    return !!surveyList.url ? url : SurveyLists.getPageUrlNoDraft(surveyList, isAbsolute);
};
   
SurveyLists.getPageUrlNoDraft = function(surveyList, isAbsolute = false){
    const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
    return `${prefix}/createdsurveys/public/${surveyList._id}`;
};

/**
 * Helpers for the open surveys
 */
   
SurveyLists.getLinkOpenSurveys = function (surveyList, isAbsolute = false, isRedirected = true) {
    const url = isRedirected ? Utils.getOutgoingUrl(surveyList.url) : surveyList.url;
    return !!surveyList.url ? url : SurveyLists.getPageUrlOpenSurvey(surveyList, isAbsolute);
};
   
SurveyLists.getPageUrlOpenSurvey = function(surveyList, isAbsolute = false) {
    const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
    return `${prefix}/opensurveys/${surveyList._id}`;
};

SurveyLists.getLinkTarget = function (surveyList) {
  return !!surveyList.url ? '_blank' : '';
};

/**
 * @summary Depending on the settings, return either a surveyList's URL Link (if it has one) or its page URL
 * @param {Object} surveyList
 */
SurveyLists.getPageUrl = function(surveyList, isAbsolute = false){
    const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
    return `${prefix}/surveyLists/${surveyList._id}`;
};
 
SurveyLists.getNewPageUrl = function(surveyList, isAbsolute = false){
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
  return `${prefix}/newsurvey/${surveyList._id}`;
};
 
SurveyLists.getDefaultStatus = function (user) {
  return SurveyLists.config.STATUS_DRAFT;
};
 
SurveyLists.getStatusName = function (surveyList) {
  if (surveyList.status === null) {
    return "NULL"
  } else {
  return Utils.findWhere(SurveyLists.statuses, {value: surveyList.status}).label;
  }
};
 
SurveyLists.isDraft = function (surveyList) {
  return surveyList.status === SurveyLists.config.STATUS_DRAFT;
};
 
SurveyLists.isPublic = function (surveyList) {
  return surveyList.status === SurveyLists.config.STATUS_PUBLIC;
};
 
SurveyLists.isClosed = function (surveyList) {
  return surveyList.status === SurveyLists.config.STATUS_CLOSED;
};
