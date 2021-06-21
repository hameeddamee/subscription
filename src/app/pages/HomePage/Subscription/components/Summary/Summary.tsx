import * as React from 'react';
import styled from 'styled-components/macro';
import { useFormikContext } from 'formik';
import { ReactComponent as DateIcon } from '../../assets/date_range_black_24dp.svg';
import { ReactComponent as CloudIcon } from '../../assets/cloud_upload_black_24dp.svg';
import { ReactComponent as PriceIcon } from '../../assets/payments_black_24dp.svg';

import { Plan, SubValues } from 'types';
import { Text } from 'app/components/Text/Text';
import { calcTotalPrice, getPricePerGB } from 'utils/subscription';

export function Summary({
  plans,
  fullview,
}: {
  plans: Plan[];
  fullview?: boolean;
}) {
  const { values }: { values: SubValues } = useFormikContext();

  if (fullview) {
    return (
      <Wrapper>
        <Item>
          <Name>
            <DateIcon />
            <span>Duration</span>
          </Name>
          <Info>{values.duration} Months</Info>
        </Item>
        <Item>
          <Name>
            <CloudIcon />
            Storage
          </Name>
          <Info>{values.storage} GB</Info>
        </Item>
        <Item>
          <Name>
            <PriceIcon />
            Price per GB
          </Name>
          <Info>$ {getPricePerGB(plans, values)}</Info>
        </Item>
        <Item>
          <Name>
            <PriceIcon />
            Total Cost
          </Name>
          <Info>$ {calcTotalPrice(plans, values)}</Info>
        </Item>
        {values.isUpfrontPayment ? (
          <Small>
            You got a discount of 10% because you are paying upfront
          </Small>
        ) : null}
      </Wrapper>
    );
  }

  return (
    <SmallWrapper>
      <Text>
        You have chosen {values.storage}GB storage plan for {values.duration}{' '}
        Months at ${getPricePerGB(plans, values)} per GB. The total price for
        this plan is: ${calcTotalPrice(plans, values)}{' '}
      </Text>
    </SmallWrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 30px;

  svg {
    fill: ${p => p.theme.text};
    margin-right: 4px;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  min-height: 2.75rem;
  color: ${p => p.theme.text};

  &:nth-child(odd) {
    background-color: ${p => p.theme.borderLight};
  }
`;

const Name = styled.div`
  flex: 1;
  padding: 0.625rem 0;

  .icon {
    margin-right: 0.125rem;
  }
`;

const Info = styled.div`
  display: flex;
`;

const Small = styled.small`
  font-size: 9px;
  font-style: italic;
`;

const SmallWrapper = styled.div`
  font-size: 12px;
`;
