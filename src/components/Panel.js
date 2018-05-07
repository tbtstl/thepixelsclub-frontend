import {Panel as BasePanel} from 'rebass';

const Panel = BasePanel.extend`
  box-shadow: 0 2px 1px ${props => props.accent};
  border: 0;
`;

export default Panel;
