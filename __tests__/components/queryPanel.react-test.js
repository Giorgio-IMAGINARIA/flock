// @flow
import React from 'react';
import { QueryPanel } from "../../source/components/QueryPanel.react";

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';

const queryPanelProps = {
  fetchDrones: () => {
  }
}

describe('<QueryPanel/>', () => {
  it('renders correctly', () => {
    const todo = { id: 1, done: false, name: 'Buy Milk' };
    const wrapper = shallow(
      <QueryPanel {...queryPanelProps} />
    );
    wrapper.setState({
      IDInputDisabledState: true,
      IDTextFieldValueState: ''
    });
    expect(wrapper.find('RadioButton').length).toBe(2);
  });
});

