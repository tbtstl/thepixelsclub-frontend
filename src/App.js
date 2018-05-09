import React, { Component } from 'react';
import {Provider as StateProvider} from 'mobx-react';
import {Provider as ThemeProvider, Flex, Box} from 'rebass';
import {ActionCableProvider} from 'react-actioncable-provider';
import theme, {colors} from './theme';
import * as stores from './stores';
import {injectGlobal} from "styled-components";
import ColorPicker from "./components/ColorPicker";
import Canvas from './components/Canvas';

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
        <ActionCableProvider url={process.env.REACT_APP_ACTION_CABLE_URL}>
          <StateProvider {...stores}>
            <Flex flexWrap={'wrap'}>
              <Box w={[1, 1/2, 1/3, 1/4, 1/5]} p={1}>
                <ColorPicker/>
              </Box>
              <Box w={[1, 1/2, 2/3, 3/4, 4/5]} p={1}>
                <Canvas/>
              </Box>
            </Flex>
          </StateProvider>
        </ActionCableProvider>
      </ThemeProvider>
    );
  }
}

export default App;
