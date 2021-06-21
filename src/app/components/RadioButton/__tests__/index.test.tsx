import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { RadioButton } from '../RadioButton';
import { themes } from 'styles/theme/themes';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { Formik } from 'formik';

const options = [
  {
    key: 'One',
    value: '1',
  },
  {
    key: 'Two',
    value: '2',
  },
  {
    key: 'Three',
    value: '3',
  },
];
const renderWithTheme = (
  props: Parameters<typeof RadioButton>[number] = {
    name: 'test',
    label: 'test',
    options: options,
  },
  theme?: DefaultTheme,
) =>
  render(
    <ThemeProvider theme={theme || themes.light}>
      <Formik initialValues={{ test: '1' }} onSubmit={jest.fn()}>
        <RadioButton {...props} />
      </Formik>
    </ThemeProvider>,
  );

describe('<RadioButton />', () => {
  it('should have 3 radio buttons', () => {
    const radioButton = renderWithTheme();
    expect(radioButton.queryAllByRole('radio').length).toBe(3);
    radioButton.unmount();
  });

  it('should switch value when clicked', () => {
    const radioButton = renderWithTheme();
    const element = radioButton.queryAllByRole('radio') as HTMLInputElement[];
    expect(element[0].checked).toBe(true);

    fireEvent.click(element[1]);

    expect(element[1].checked).toBe(true);
  });
});
