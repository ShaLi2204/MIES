import { Components, registerComponent, withList, withCurrentUser, Utils } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { SurveyLists } from '../../../modules/Surveys/index.js';
import classNames from 'classnames';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';

const Error = ({error}) => <Components.Alert className="flash-message" variant="danger"><FormattedMessage id={error.id} values={{value: error.value}} />{error.message} </Components.Alert>

const OpenSurveysList = ({className, results, loading, count, totalCount, loadMore, showHeader = true, showLoadMore = true, networkStatus, currentUser, error, terms}) => {

    const loadingMore = networkStatus ===2;

    if (results && results.length) {

        const hasMore = totalCount > results.length;

        return (
            <div /*className={className(className, 'surveyLists-list', `surveyLists-list-${terms.view}`)}*/>
            {console.log(currentUser)}
                {showHeader ? <Components.OpenSurveysListHeader currentUser={currentUser}/> : null}
                {error ? <Error error={Utils.decodeIntlError(error)} />: null}
                <div>
                    {results.map(surveyList => <Components.OpenSurveys surveyList={surveyList} key={surveyList._id} currentUser={currentUser} terms={terms} />)}
                </div>
                {showLoadMore ?
                    hasMore ?
                        <Components.OpenSurveysLoadMore loading={loadingMore} loadMore={loadMore} count={count} totalCount={totalCount} /> :
                        <Components.OpenSurveysNoMore /> :
                    null
                }
            </div>
        )
    } else if (loading) {
        return (
            <div>
                {showHeader ? <Components.OpenSurveysListHeader /> : null}
                {error ? <Error error={Utils.decodeIntlError(error)}/> : null}
                <div>
                    <Components.OpenSurveysLoading/>
                </div>
            </div>
        )
    } else {
        return(
            <div>
                {showHeader ? <Components.OpenSurveysListHeader/> : null}
                {error ? <Error error={Utils.decodeIntlError(error)} /> : null}
                <div>
                    <Components.OpenSurveysNoResults />
                </div>
            </div>
        )
    }
};

OpenSurveysList.displayName = "OpenSurveysList";

OpenSurveysList.propTypes = {
    results: PropTypes.array,
    terms: PropTypes.object,
    hasMore: PropTypes.bool, 
    loading: PropTypes.bool,
    count: PropTypes.number,
    totalCount: PropTypes.number,
    loadMore: PropTypes.func,
    showHeader: PropTypes.bool,
};

OpenSurveysList.contextTypes = {
    intl: intlShape
};

const options = {
    collection: SurveyLists,
    queryName: 'surveyListsQuery',
};

registerComponent({ name:'OpenSurveysList', component: OpenSurveysList, hocs: [withCurrentUser, [withList, options]]});

