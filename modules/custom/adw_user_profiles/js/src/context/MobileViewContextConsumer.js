import React, { Component } from 'react';
import IsMobileContext from './index';

const withMobileViewContextConsumer = Component => {
  class MobileViewContextConsumer extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <IsMobileContext.Consumer>
          {isMobileView => {
            return <Component {...this.props} isMobileView={isMobileView} />;
          }}
        </IsMobileContext.Consumer>
      );
    }
  }
  return MobileViewContextConsumer;
};

export default withMobileViewContextConsumer;
