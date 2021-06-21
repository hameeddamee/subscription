import { Plan } from 'types/Plan';
import { SubValues } from 'types/SubValues';
/* --- STATE --- */
export interface SubscriptionState {
  plans: Plan[];
  loading: boolean;
  error?: PlanErrorType | null;

  preference: SubValues | null;
  saving: boolean;
}

export enum PlanErrorType {
  RESPONSE_ERROR = 1,
  PLAN_NOT_FOUND = 2,
}
