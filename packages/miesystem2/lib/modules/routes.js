/** 
* Page for adding routes
*/

import { addRoute } from 'meteor/vulcan:core';

addRoute({  name: 'Welcome',                path: '/',                  componentName: 'Welcome'});
addRoute({  name: 'FAQ',                    path: 'FAQ',                componentName: 'FAQ'});
addRoute({  name: 'Contact',                path: 'contact',            componentName: 'Contact'});
addRoute({  name: 'SurveysNewSingle',       path: 'newsurvey/:_id',     componentName: 'SurveysNewSingle'});
addRoute({  name: 'CreatedSurveys',         path: 'createdsurveys',     componentName: 'CreatedSurveys'});
addRoute({  name: 'CreatedSurveysSingle',   path: 'createdsurveys/:_id',componentName: 'SurveysNewPage'});
addRoute({  name: 'OpenSurveysHome',        path: 'opensurveys',        componentName: 'OpenSurveysHome'});
addRoute({  name: 'OpenSurveysSingle',      path: 'opensurveys/:id',    componentName: 'OpenSurveysSingle'});
addRoute({  name: 'ParticipatedSurveys',    path: 'participated',       componentName: 'ParticipatedSurveys'});
addRoute({  name: 'ParticipatedSurvey',     path: 'participated/:_id',  componentName: 'ParticipatedSurveysSingle'});

