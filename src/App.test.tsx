import App from './App';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const operator = ['add', 'subtract', 'multiply', 'divide'];

describe("App page component", () => {
  const render = shallow(<App />);

  it("should render 3 input number", () => {
    expect(render.find('input[type="number"]').length).toBe(3);
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
    const checkbox = render.find('input[name="checkbox-1"]').at(0);
    checkbox.simulate('change', {target: {checked: true}});
    expect(render.find('.error')).toBeTruthy();
  });

  it.each(operator)("should disabled button if there is only 1 input", (opt) => {
    const button = render.find('.btn_'+opt).at(0);
    expect(button.prop("disabled")).toBeTruthy();
  })

  describe("Render correct result", () => {
    const inputOne = render.find('input[name="input-1"]').at(0);
    const inputTwo = render.find('input[name="input-2"]').at(0);
    const inputThree = render.find('input[name="input-3"]').at(0);
    
   
    const cbThree = render.find('input[name="checkbox-3"]').at(0);
    
    it("should render addition result correctly", () => {
      inputOne.simulate('change', { target: { value: 1 } });
      inputTwo.simulate('change', { target: { value: 2 } });

      render.update();

      const cbOne = render.find('input[name="checkbox-1"]').at(0);
      const cbTwo = render.find('input[name="checkbox-2"]').at(0);
     
      cbOne.simulate('change', {target: {checked: true}});
      cbTwo.simulate('change', {target: {checked: true}});

      render.update();

      const add = render.find(".btn_add").at(0);
      add.simulate('click', { preventDefault: jest.fn() });
      expect(render.find(".result-value").text()).toBe("3")
    })

    it("should render substraction result correctly", () => {   
      inputOne.simulate('change', { target: { value: 5 } });
      inputTwo.simulate('change', { target: { value: 2 } });
      inputThree.simulate('change', { target: { value: 1 } });

      render.update();

      const cbOne = render.find('input[name="checkbox-1"]').at(0);
      const cbTwo = render.find('input[name="checkbox-2"]').at(0);
      const cbThree = render.find('input[name="checkbox-3"]').at(0);

      cbOne.simulate('change', {target: {checked: true}});
      cbTwo.simulate('change', {target: {checked: true}});
      cbThree.simulate('change', {target: {checked: true}});

      render.update();

      const sub = render.find(".btn_subtract").at(0);
      sub.simulate('click', { preventDefault: jest.fn() });
      expect(render.find(".result-value").text()).toBe("2")
    })

    it("should render multiply result correctly", () => {
      inputOne.simulate('change', { target: { value: 1 } });
      inputTwo.simulate('change', { target: { value: 2 } });

      render.update();

      const cbOne = render.find('input[name="checkbox-1"]').at(0);
      const cbTwo = render.find('input[name="checkbox-2"]').at(0);
     
      cbOne.simulate('change', {target: {checked: true}});
      cbTwo.simulate('change', {target: {checked: true}});

      render.update();

      const multiply = render.find(".btn_multiply").at(0);
      multiply.simulate('click', { preventDefault: jest.fn() });
      expect(render.find(".result-value").text()).toBe("2")
    })

    it("should render divide result correctly", () => {
      inputOne.simulate('change', { target: { value: 10 } });
      inputTwo.simulate('change', { target: { value: 5 } });
      inputThree.simulate('change', { target: { value: 2 } });

      render.update();

      const cbOne = render.find('input[name="checkbox-1"]').at(0);
      const cbTwo = render.find('input[name="checkbox-2"]').at(0);
      const cbThree = render.find('input[name="checkbox-3"]').at(0);

      cbOne.simulate('change', {target: {checked: true}});
      cbTwo.simulate('change', {target: {checked: true}});
      cbThree.simulate('change', {target: {checked: true}});

      render.update();

      const divide = render.find(".btn_divide").at(0);
      divide.simulate('click', { preventDefault: jest.fn() });
      expect(render.find(".result-value").text()).toBe("1")
    })
  })
})