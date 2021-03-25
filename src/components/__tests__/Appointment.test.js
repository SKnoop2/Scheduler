import React from 'react';

// the render function allows us to render components
import { render } from '@testing-library/react';

import Application from 'components/Application';
import Appointment from 'components/Appointment';


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