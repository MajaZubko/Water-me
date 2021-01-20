import * as React from 'react';
import { render, act } from '@testing-library/react';
import { usePlants } from '../usePlants.hook';

function setup() {
  const returnVal = {};
  const TestComponent = () => {
    Object.assign(returnVal, usePlants());
    return null;
  };

  render(
    <div>
      <TestComponent />
    </div>
  );
  return returnVal;
}

describe('Plants: hook', () => {
  it('should run a test', () => {
    expect(1).toEqual(1);
  });
});
