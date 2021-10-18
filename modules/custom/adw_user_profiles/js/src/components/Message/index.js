import React from 'react';
import PropTypes from 'prop-types';

const Message = props => {
  return <div className={`message-${props.type} fade in`}>{props.text}</div>
};

Message.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string
};

export default Message;
