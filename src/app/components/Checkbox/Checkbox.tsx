import React from 'react';
import styled from 'styled-components/macro';
import { Field, ErrorMessage } from 'formik';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export interface Props extends InputProps {
  name: string;
  label: string;
}

export const Checkbox = (props: Props) => {
  const { label, name, ...rest } = props;

  return (
    <Wrapper>
      <Field type="checkbox" id={name} name={name} {...rest} />
      <label htmlFor={name}>{label}</label>
      <ErrorMessage component={TextError} name={name} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  &:active + label,
  &:hover + label {
    color: #4e4e4e;
  }

  &:checked + label {
    color: #b9b3b3;
  }

  input[type='checkbox'] {
    opacity: 0;

    & + label::after {
      content: none;
    }

    &:checked + label::after {
      content: '';
    }

    &:checked + label::before {
      background-color: #4e4e4e;
      border: 1px solid #4e4e4e;
    }

    &:focus + label::before {
      outline: rgb(59, 153, 252) auto 5px;
    }
  }

  label {
    position: relative;
    font-size: 14px;

    &::before {
      content: '';
      left: -24px;
      top: 0;
      height: 16px;
      width: 16px;
      background-color: ${p => p.theme.borderLight};
      border: ${p => p.theme.borderLight};
      position: absolute;
    }

    &::after {
      content: '';
      height: 6px;
      width: 9px;
      border-left: 2px solid;
      border-bottom: 2px solid;
      transform: rotate(-45deg);
      position: absolute;
      left: -20px;
      top: 3px;
      color: ${p => p.theme.primary};
    }
  }
`;
const TextError = styled.small`
  display: block;
  color: #e02200;
`;
