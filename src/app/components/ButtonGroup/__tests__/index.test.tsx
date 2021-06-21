import * as React from 'react';
import { render } from '@testing-library/react';

import { ButtonGroup } from '../ButtonGroup';
import { themes } from 'styles/theme/themes';
import { DefaultTheme } from 'styled-components';

const renderWithTheme = (theme?: DefaultTheme) =>
  render(<ButtonGroup theme={theme || themes.light} />);

describe('<ButtonGroup />', () => {
  it('should render a <div> tag', () => {
    const buttonGroup = renderWithTheme();
    expect(buttonGroup.container.querySelector('div')).toBeInTheDocument();
  });
});
