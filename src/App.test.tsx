import App from './App';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const operator = ['add', 'subtract', 'multiply', 'divide'];

describe("App page component", () => {
  const render = shallow(<App />);

  it("should render 3 input text", () => {
    expect(render.find('input[type="text"]').length).toBe(3);
  });

  it("should render 3 input checkbox", () => {
    expect(render.find('input[type="checkbox"]').length).toBe(3);
  });

  it.each(operator)("should render operator button correctly", (opt) => {
    expect(render.find('.button'+opt)).toBeTruthy();
  });
})

describe("App page integration", () => {
  const render = shallow(<App />);

  it("should show error if only 1 input checked", () => {
    const checkbox = render.find('input[name="input-one"]');
    checkbox.simulate('change', {target: {checked: true}});
    expect(render.find('.error')).toBeTruthy();
  });

  it.each(operator)("should disabled button if there is only 1 input", (opt) => {
    const button = render.find('.button'+opt);
    expect(button.prop("disabled")).toBeFalsy();
  })

  describe("Render correct result", () => {
    const inputOne = render.find("input-one");
    const inputTwo = render.find("input-two");
    const inputThree = render.find("input-three");
    
    it("should render addition result correctly", () => {
      const add = render.find("btn-add");
      inputOne.simulate('change', { target: { value: 1 } });
      inputTwo.simulate('change', { target: { value: 2 } });
      add.simulate('click');
      expect(render.find("result").text()).toBe(3)
    })

    it("should render substraction result correctly", () => {
      const sub = render.find("btn-substract");
      inputOne.simulate('change', { target: { value: 5 } });
      inputTwo.simulate('change', { target: { value: 2 } });
      inputThree.simulate('change', { target: { value: 1 } });
      sub.simulate('click');
      expect(render.find("result").text()).toBe(2)
    })

    it("should render multiply result correctly", () => {
      const multiply = render.find("btn-multiply");
      inputOne.simulate('change', { target: { value: 1 } });
      inputTwo.simulate('change', { target: { value: 2 } });
      multiply.simulate('click');
      expect(render.find("result").text()).toBe(2)
    })

    it("should render divide result correctly", () => {
      const divide = render.find("btn-divide");
      inputOne.simulate('change', { target: { value: 10 } });
      inputTwo.simulate('change', { target: { value: 5 } });
      inputThree.simulate('change', { target: { value: 2 } });
      divide.simulate('click');
      expect(render.find("result").text()).toBe(1)
    })
  })
})