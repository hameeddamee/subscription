import React, { useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';

import { WizardProps } from './types';
import { media } from 'styles/media';
import { selectSaving } from './slice/selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';

import { SubValues } from 'types';
import { Button } from 'app/components/Button/Button';
import { ButtonGroup } from 'app/components/ButtonGroup/ButtonGroup';
import { ReactComponent as StorageIcon } from './assets/storage_black_24dp.svg';
import { ReactComponent as CardIcon } from './assets/credit_card_black_24dp.svg';
import { ReactComponent as ReceiptIcon } from './assets/receipt_black_24dp.svg';

const Wizard = ({ children, initialValues, onSubmit }: WizardProps) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const isSaving = useSelector(selectSaving);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values: SubValues) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values: SubValues) => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (
    values: SubValues,
    bag: FormikHelpers<SubValues>,
  ) => {
    if (React.isValidElement(step)) {
      if (step.props.onSubmit) {
        await step.props.onSubmit(values, bag);
      }
      if (isLastStep) {
        return onSubmit(values, bag);
      } else {
        bag.setTouched({});
        next(values);
      }
    }
  };

  return (
    <FormikWraper>
      <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={
          React.isValidElement(step) ? step.props.validationSchema : null
        }
      >
        {formik => (
          <Form>
            <StepHeader>
              <ul>
                <li>
                  <span className="step-icon">
                    <StorageIcon />
                  </span>
                  <span className="step-text">Storage Preference</span>
                </li>
                <li>
                  <span className="step-icon">
                    <CardIcon />
                  </span>
                  <span className="step-text">Payment Infomation</span>
                </li>
                <li>
                  <span className="step-icon">
                    <ReceiptIcon />
                  </span>
                  <span className="step-text">Confirm Your Details</span>
                </li>
              </ul>
            </StepHeader>

            <Content>
              {step}

              <ButtonGroup>
                {stepNumber > 0 && (
                  <Button onClick={() => previous(formik.values)} type="button">
                    Back
                  </Button>
                )}
                <Button
                  disabled={formik.isSubmitting || isSaving}
                  type="submit"
                >
                  {isLastStep ? 'Submit' : 'Next'}
                  {isSaving && (
                    <span>
                      <LoadingIndicator small />
                    </span>
                  )}
                </Button>
              </ButtonGroup>
            </Content>
          </Form>
        )}
      </Formik>
    </FormikWraper>
  );
};

export const WizardStep = ({ children, onSubmit, validationSchema }) =>
  children;

export default Wizard;

const FormikWraper = styled.div`
  width: 100%;
  padding: 15px 25px;

  ${Button} {
    font: inherit;
    line-height: normal;
    cursor: pointer;
    background: ${p => p.theme.primary};
    font-weight: bold;
    width: 100px;
    font-weight: bold;
    padding-left: 2em;
    padding-right: 2em;
    padding: 0.75em 1em;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    line-height: normal;
    border-radius: 0;
    border: 4px;
    color: ${p => p.theme.text};
  }

  button[type='button'] {
    background: ${p => p.theme.gray};
    color: ${p => p.theme.primary};
    margin-right: 15px;
  }

  svg {
    circle {
      stroke: ${p => p.theme.text};
    }
  }

  ${media.small`
    padding: 40px 20px;
	  width: auto;
  `};
`;

const Content = styled.div`
  margin: 10px auto;
  width: 80%;
`;

const StepHeader = styled.div`
  margin-bottom: 33px;
  ul {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -o-justify-content: center;
    -ms-justify-content: center;
    -moz-justify-content: center;
    -webkit-justify-content: center;
    list-style: none;
    padding-left: 0;
  }

  li {
    outline: none;
    -o-outline: none;
    -ms-outline: none;
    -moz-outline: none;
    -webkit-outline: none;
    position: relative;
    padding-bottom: 3px;
    padding-right: 63px;
    text-align: center;

    &:last-child {
      padding-right: 0;

      &::before {
        content: none;
      }
    }

    &::before {
      position: absolute;
      content: '';
      background: ${p => p.theme.gray};
      width: 168px;
      height: 6px;
      top: 30%;
      left: 45%;
    }

    span {
      display: block;
      font-size: 13px;
    }

    .step-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      -o-border-radius: 50%;
      -ms-border-radius: 50%;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
      background: ${p => p.theme.gray};
      margin: 0 auto;
      position: relative;
      outline: none;
      -o-outline: none;
      -ms-outline: none;
      -moz-outline: none;
      -webkit-outline: none;

      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
      }
    }
  }
`;
