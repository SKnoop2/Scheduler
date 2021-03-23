// we will be rendering <Application /> down below, so we will need react.createElement
import React from 'react';

// we import our helper functions from the react-testing-library
// the render function allows us to render components
import { render } from '@testing-library/react';

// need to import the component we are testing
import Application from 'components/Application';
import Appointment from 'components/Appointment';

// test that renders a React component
it("renders without crashing", () => {
  render(<Application />);
});


describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});

it("doesn't call the function", () => {
  const fn = jest.fn();
  expect(fn).toHaveBeenCalledTimes(0);
});

it("calls the function", () => {
  const fn = jest.fn();
  fn();
  expect(fn).toHaveBeenCalledTimes(1);
 });

it("calls the function with specific arguments", () => {
  const fn = jest.fn();
  fn(10);
  expect(fn).toHaveBeenCalledWith(10);
});