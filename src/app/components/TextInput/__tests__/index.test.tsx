import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { TextInput } from '../TextInput';
import { themes } from 'styles/theme/themes';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { Formik } from 'formik';

const renderWithTheme = (
  props: Parameters<typeof TextInput>[number] = {
    name: 'test',
    label: 'test',
  },
  theme?: DefaultTheme,
) =>
  render(
    <ThemeProvider theme={theme || themes.light}>
      <Formik initialValues={{ test: '' }} onSubmit={jest.fn()}>
        <TextInput {...props} aria-label="test" />
      </Formik>
    </ThemeProvider>,
  );

describe('<TextInput />', () => {
  it('should display a new value when changed', () => {
    const textInput = renderWithTheme();
    const element = textInput.getByLabelText(/test/i) as HTMLElement;

    fireEvent.change(element, { target: { value: 'test' } });

    expect(element.value).toBe('test');
  });
});
