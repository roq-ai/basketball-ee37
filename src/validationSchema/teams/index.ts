import * as yup from 'yup';

export const teamValidationSchema = yup.object().shape({
  name: yup.string().required(),
  manager_id: yup.string().nullable(),
  organization_id: yup.string().nullable(),
});
