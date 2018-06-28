// @flow
import React from 'react';
import { QueryPanel } from "../../source/components/QueryPanel.react"
import { mount, shallow } from 'enzyme';

// test('TodoComponent calls doneChange when todo is clicked', () => {
//     const todo = { id: 1, done: false, name: 'Buy Milk' };
//     const doneChange = jest.fn();
//     const wrapper = mount(
//       <Todo todo={todo} doneChange={doneChange} />
//     );
  
//     const p = wrapper.find('.toggle-todo');
//     p.simulate('click');
//     expect(doneChange).toBeCalledWith(1);
//   });

  describe('Todo component renders the todo correctly', () => {
    it('renders correctly', () => {
      const todo = { id: 1, done: false, name: 'Buy Milk' };
      const wrapper = shallow(
        <QueryPanel/>
      );
      // expect(rendered.toJSON()).toMatchSnapshot();
    });
  });
  
  