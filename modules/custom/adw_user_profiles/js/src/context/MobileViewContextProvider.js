import React from 'react';
import IsMobileContext from './index';

const withMobileViewContextProvider = Component => {
  class MobileViewContextProvider extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        windowWidth: window.innerWidth
      };

      this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize() {
      this.setState({
        windowWidth: window.innerWidth
      });
    }


    render() {
      const isMobileView = this.state.windowWidth < 1100;
      return (
        <IsMobileContext.Provider value={isMobileView}>
          <Component {...this.props} />
        </IsMobileContext.Provider>
      );
    }

  }
  return MobileViewContextProvider;
};

export default withMobileViewContextProvider;
