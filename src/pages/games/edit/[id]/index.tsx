import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getGameById, updateGameById } from 'apiSdk/games';
import { gameValidationSchema } from 'validationSchema/games';
import { GameInterface } from 'interfaces/game';
import { RefereeInterface } from 'interfaces/referee';
import { TeamInterface } from 'interfaces/team';
import { getReferees } from 'apiSdk/referees';
import { getTeams } from 'apiSdk/teams';

function GameEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<GameInterface>(
    () => (id ? `/games/${id}` : null),
    () => getGameById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: GameInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateGameById(id, values);
      mutate(updated);
      resetForm();
      router.push('/games');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<GameInterface>({
    initialValues: data,
    validationSchema: gameValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Games',
              link: '/games',
            },
            {
              label: 'Update Game',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Game
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="date_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Date Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.date_time ? new Date(formik.values?.date_time) : null}
              onChange={(value: Date) => formik.setFieldValue('date_time', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.location}
            label={'Location'}
            props={{
              name: 'location',
              placeholder: 'Location',
              value: formik.values?.location,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<RefereeInterface>
            formik={formik}
            name={'referee_id'}
            label={'Select Referee'}
            placeholder={'Select Referee'}
            fetcher={getReferees}
            labelField={'id'}
          />
          <AsyncSelect<TeamInterface>
            formik={formik}
            name={'team1_id'}
            label={'Select Team'}
            placeholder={'Select Team'}
            fetcher={getTeams}
            labelField={'name'}
          />
          <AsyncSelect<TeamInterface>
            formik={formik}
            name={'team2_id'}
            label={'Select Team'}
            placeholder={'Select Team'}
            fetcher={getTeams}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/games')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'game',
    operation: AccessOperationEnum.UPDATE,
  }),
)(GameEditPage);
