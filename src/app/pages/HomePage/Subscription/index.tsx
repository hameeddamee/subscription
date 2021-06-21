import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import styled from 'styled-components/macro';

import { selectLoading, selectError, selectPlans } from './slice/selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { PlanErrorType } from './slice/types';
import { useSubscriptionSlice } from './slice';
import { media } from 'styles/media';
import {
  creditCardValidation,
  subscriptinValidation,
  finalValidation,
} from '../utils';

import Wizard, { WizardStep } from './Wizard';
import { Summary } from './components/Summary/Summary';
import { Title } from 'app/components/Title/Title';
import { TextInput } from 'app/components/TextInput/TextInput';
import { RadioButton } from 'app/components/RadioButton/RadioButton';
import { createRadioOptions } from 'utils/subscription';
import { Checkbox } from 'app/components/Checkbox/Checkbox';
import { FormLabel } from 'app/components/FormLabel';
import { SubValues } from 'types';

const initialValues: SubValues = {
  duration: '12',
  storage: '5',
  isUpfrontPayment: false,
  creditCardNumber: '',
  ccExpDate: '',
  cvv: '',
  email: '',
  acceptedTerms: false,
};

const storagePlans = [
  {
    key: '5 GB',
    value: '5',
  },
  {
    key: '10 GB',
    value: '10',
  },
  {
    key: '50 GB',
    value: '50',
  },
];

const Subscription = () => {
  const { actions } = useSubscriptionSlice();

  const plans = useSelector(selectPlans);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.loadPlans());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Title>Storage Subscription Plan</Title>
      {isLoading && <LoadingIndicator />}
      {plans.length > 0 ? (
        <Wizard
          initialValues={initialValues}
          onSubmit={async values => {
            dispatch(actions.saveSubPreference(values));
            dispatch(actions.createSub());
          }}
        >
          <WizardStep
            onSubmit={() => console.log('Step1 onSubmit')}
            validationSchema={Yup.object({
              ...subscriptinValidation,
            })}
          >
            <FormLabel>Duration:</FormLabel>
            <RadioButton
              name="duration"
              label="Duration"
              options={createRadioOptions(plans)}
            />

            <FormLabel>Storage:</FormLabel>
            <RadioButton
              name="storage"
              label="Storage"
              options={storagePlans}
            />

            <Checkbox
              name="isUpfrontPayment"
              label="I would like to
                pay upfront for this plan"
            />
            <Summary plans={plans} />
          </WizardStep>
          <WizardStep
            onSubmit={() => console.log('Step2 onSubmit')}
            validationSchema={Yup.object({
              ...creditCardValidation,
            })}
          >
            <TextInput name="creditCardNumber" label="Credit Card Number" />

            <Row>
              <TextInput
                name="ccExpDate"
                label="Expiration Date"
                placeholder="12/25"
              />
              <TextInput name="cvv" label="CVV" />
            </Row>

            <Summary plans={plans} />
          </WizardStep>
          <WizardStep
            onSubmit={() => console.log('Step3 onSubmit')}
            validationSchema={Yup.object({
              ...finalValidation,
            })}
          >
            <FormLabel>Summary:</FormLabel>
            <Summary plans={plans} fullview />
            <TextInput autoComplete="email" name="email" label="Email" />

            <Checkbox
              name="acceptedTerms"
              label="I have read and accepted the Terms and Conditions for this service"
            />
          </WizardStep>
        </Wizard>
      ) : error ? (
        <ErrorText>{repoErrorText(error)}</ErrorText>
      ) : null}
    </Wrapper>
  );
};

export const repoErrorText = (error: PlanErrorType) => {
  switch (error) {
    case PlanErrorType.PLAN_NOT_FOUND:
      return "Sorry couldn't load plan at this time. Please try again 😞";
    default:
      return 'An error has occurred!';
  }
};

const Wrapper = styled.div`
  color: ${p => p.theme.text};
  background: ${p => p.theme.backgroundVariant};
  width: 851px;
  box-shadow: 0px 8px 20px 0px ${p => p.theme.borderLight};
  -o-box-shadow: 0px 8px 20px 0px ${p => p.theme.borderLight};
  -ms-box-shadow: 0px 8px 20px 0px ${p => p.theme.borderLight};
  -moz-box-shadow: 0px 8px 20px 0px ${p => p.theme.borderLight};
  -webkit-box-shadow: 0px 8px 20px 0px ${p => p.theme.borderLight};
  border-radius: 10px;
  -o-border-radius: 10px;
  -ms-border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  margin: 70px auto;
  position: relative;
  padding-top: 20px;

  ${Title} {
    text-align: center;
    margin-bottom: 0;
  }

  ${media.medium`
    margin: 100px auto;
  `};
`;

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Subscription;
