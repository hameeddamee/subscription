import { SubscriptionState } from 'app/pages/HomePage/Subscription/slice/types';
import { ThemeState } from 'styles/theme/slice/types';

export interface RootState {
  subscription?: SubscriptionState;
  theme?: ThemeState;
}
