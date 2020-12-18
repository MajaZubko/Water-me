import React from 'react';
import { AllPlants } from '../allPlants.component';
import { makeContextRenderer } from '../../../shared/utils/testUtils';

describe('AllPlants: Component', () => {
  const component = () => <AllPlants />;
  const render = makeContextRenderer(component);

  it('should render correctly', () => {
    const { container } = render();
    expect(container.firstChild).toMatchSnapshot();
  });
});
