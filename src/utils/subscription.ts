import { Plan, SubValues } from 'types';

const getDuration = (plans: Plan[], values: SubValues): Plan | undefined => {
  const selectedDuration = plans.find(
    plan => plan.duration_months === parseInt(values.duration),
  );
  return selectedDuration;
};

export const getPricePerGB = (
  plans: Plan[],
  values: SubValues,
): number | null => {
  const selectedDuration = getDuration(plans, values);

  return selectedDuration ? selectedDuration?.price_usd_per_gb : null;
};

export const calcTotalPrice = (
  plans: Plan[],
  values: SubValues,
): number | null => {
  const selectedDuration = getDuration(plans, values);

  if (!selectedDuration) {
    return null;
  }

  const UPFRONT_DISCOUNT = 0.1;
  const mainPrice =
    selectedDuration?.price_usd_per_gb * parseInt(values.storage);
  const finalPrice = values.isUpfrontPayment
    ? mainPrice - mainPrice * UPFRONT_DISCOUNT
    : mainPrice;
  return finalPrice;
};

interface Options {
  key: string;
  value: string;
}

export const createRadioOptions = (plans: Plan[]): Options[] => {
  const options = plans.map(plan => {
    return {
      key: `${plan.duration_months} Months`,
      value: plan.duration_months.toString(),
    };
  });

  return options;
};
