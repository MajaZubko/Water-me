import React from 'react';
import { PlantsList } from '../plantsList.component';
import { makeContextRenderer } from '../../../utils/testUtils';

describe('PlantsList: Component', () => {
  const component = () => <PlantsList />;
  const render = makeContextRenderer(component);

  it('should render correctly', () => {
    const { container } = render();
    expect(container.firstChild).toMatchSnapshot();
  });
});
