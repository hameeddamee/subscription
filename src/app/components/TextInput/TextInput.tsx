import React from 'react';
import styled from 'styled-components/macro';
import { Field, ErrorMessage } from 'formik';
import { Input } from '../../pages/HomePage/Subscription/components/Input/Input';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
interface Props extends InputProps {
  name: string;
  label: string;
}

export const TextInput = (props: Props) => {
  const { label, name, ...rest } = props;

  return (
    <Wrapper>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name}>
        {({ field }) => <Input {...field} {...rest} />}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  ${Input} {
    margin-right: 0.5rem;
  }

  label {
    text-align: left;
    font-size: 14px;
  }
`;

const TextError = styled.small`
  color: #e02200;
`;
