
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import { Button } from 'reactstrap';

const SurveysNewButton = (props, context) => {

  const size = props.currentUser ? 'lg' : 'sm';
  const button = <Components.Button variant="primary"><Components.Icon name="new"/></Components.Button>;
  return (
    <Components.ModalTrigger size={size} title="New Survey" component={<Button size="sm" color="primary">New Survey</Button>}>
      <Components.SurveysNewForm />
    </Components.ModalTrigger>
  )
}

SurveysNewButton.displayName = 'SurveysNewButton';

SurveysNewButton.propTypes = {
  currentUser: PropTypes.object,
};

SurveysNewButton.contextTypes = {
  messages: PropTypes.object,
  intl: intlShape
};

registerComponent({ name: 'SurveysNewButton', component: SurveysNewButton, hocs: [withCurrentUser] });
