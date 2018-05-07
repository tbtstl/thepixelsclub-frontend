import React, { Component } from 'react';
import {Provider as StateProvider} from 'mobx-react';
import {Provider as ThemeProvider, Flex, Box} from 'rebass';
import theme, {colors} from './theme';
import * as stores from './stores';
import {injectGlobal} from "styled-components";

class App extends Component {
  constructor(){
    super();
    injectGlobal`
    body {
      background-color: ${colors.lightGrey};
    }
    `;
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StateProvider {...stores}>
          <Flex flexWrap={'wrap'}>
            <Box w={[1, 1/2, 1/3, 1/4, 1/5]} p={1}>
              Information
            </Box>
            <Box w={[1, 1/2, 2/3, 3/4, 4/5]} p={1}>
              Canvas
            </Box>
          </Flex>
        </StateProvider>
      </ThemeProvider>
    );
  }
}

export default App;
