import * as yup from 'yup';

export const gameValidationSchema = yup.object().shape({
  date_time: yup.date().required(),
  location: yup.string().required(),
  referee_id: yup.string().nullable(),
  team1_id: yup.string().nullable(),
  team2_id: yup.string().nullable(),
});
