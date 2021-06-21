import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Checkbox } from '../Checkbox';
import { themes } from 'styles/theme/themes';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { Formik } from 'formik';

const renderWithTheme = (
  props: Parameters<typeof Checkbox>[number] = {
    name: 'test',
    label: 'test',
  },
  theme?: DefaultTheme,
) =>
  render(
    <ThemeProvider theme={theme || themes.light}>
      <Formik initialValues={{ test: true }} onSubmit={jest.fn()}>
        <Checkbox {...props} />
      </Formik>
    </ThemeProvider>,
  );

describe('<Checkbox />', () => {
  it('should switch value when clicked', () => {
    const checkbox = renderWithTheme();
    const element = checkbox.queryAllByRole('checkbox') as HTMLInputElement[];
    expect(element[0].checked).toBe(true);

    fireEvent.click(element[0]);

    expect(element[0].checked).toBe(false);
  });
});
