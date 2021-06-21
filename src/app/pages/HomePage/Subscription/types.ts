import { SubValues } from '../../../../types/SubValues';
import { FormikHelpers } from 'formik';

export interface WizardProps {
  children: React.ReactNode;
  initialValues: SubValues;
  onSubmit: (
    values: SubValues,
    bag?: FormikHelpers<SubValues>,
  ) => Promise<void>;
}
