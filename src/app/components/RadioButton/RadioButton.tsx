import React from 'react';
import styled from 'styled-components/macro';
import { Field, ErrorMessage } from 'formik';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
interface Props extends InputProps {
  name: string;
  label: string;

  options: any[];
}

export const RadioButton = (props: Props) => {
  const { label, name, options, ...rest } = props;

  return (
    <Wrapper>
      <Field id={name} name={name} {...rest}>
        {({ field }) => {
          return options.map((option, index) => {
            return (
              <p key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value.toString()}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </p>
            );
          });
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  p {
    display: inline-block;
    box-sizing: border-box;
    width: 33%;
    margin: 0 1% 30px 0;
    text-align: center;
  }

  label {
    border: 1px solid ${p => p.theme.border};
    box-sizing: border-box;
    display: block;
    height: 100%;
    width: 100%;
    max-width: 160px;
    max-height: 50px;
    padding: 10px 10px 30px 10px;
    cursor: pointer;
    opacity: 0.5;
    text-align: center;
    margin-bottom: 5px;
    transition: all 0.5s ease-in-out;
    &:hover,
    &:focus,
    &:active {
      border: 1px solid ${p => p.theme.primary};
      box-shadow: 0 0 0 3px
        ${p =>
          p.theme.primary.replace(
            /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
            'rgba$1,0.2)',
          )};
    }
  }

  input[type='radio'] {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input[type='radio']:checked ~ label {
    opacity: 1;
    border: 1px solid ${p => p.theme.primary};
    box-shadow: 0 0 0 3px
      ${p =>
        p.theme.primary.replace(
          /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
          'rgba$1,0.2)',
        )};
  }
`;
const TextError = styled.div``;
