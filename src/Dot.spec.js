import { shallow } from 'enzyme';
import Dot from './';

describe('<Dot />', () => {
  it('should render', () => {
    shallow(<Dot pair="ab"><div /></Dot>);
  });
});
