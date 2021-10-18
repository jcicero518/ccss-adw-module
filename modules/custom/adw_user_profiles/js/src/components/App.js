import React from 'react';
import ProfileContainer from './ProfileContainer';
import { BreakpointProvider, setDefaultBreakpoints } from 'react-socks';

/**
 * react-socks library custom breakpoints
 */
setDefaultBreakpoints([
  { xs: 0 },
  { s: 600 },
  { m: 769 },
  { l: 1100 },
  { xl: 1400 }
]);

const App = () => (
  <BreakpointProvider>
    <ProfileContainer />
  </BreakpointProvider>
);

export default App;
