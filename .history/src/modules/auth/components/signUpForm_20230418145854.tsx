import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IGenderParams, ILocationParams, ISignUpParams, ISignUpValidation } from '../../../models/auth';
import { GENDER } from '../../intl/constants';
import { validateSignUp, validSignUp } from '../utils';

interface Props {
  onSignUp(values: ISignUpParams): void;
  loading: boolean;
  errorMessage: string;
  locations: Array<ILocationParams>;
  states: Array<ILocationParams>;
  onChangeRegion(idRegion: string): void;
}

const SignUpForm = (props: Props) => {
  const { onSignUp, loading, errorMessage, locations, states, onChangeRegion } = props;

  const [formValues, setFormValues] = React.useState<ISignUpParams>({
    email: '',
    password: '',
    repeatPassword: '',
    name: '',
    gender: '',
    region: '',
    state: '',
  });
  const [validate, setValidate] = React.useState<ISignUpValidation>();

  const onSubmit = React.useCallback(() => {
    const validate = validateSignUp(formValues);

    setValidate(validate);

    if (!validSignUp(validate)) {
      return;
    }

    onSignUp(formValues);
  }, [formValues, onSignUp]);

  const renderGender = () => {
    const arrGender: JSX.Element[] = [
      <option disabled selected value={''} key={''}>
        {' '}
        -- select an option --{' '}
      </option>,
    ];
    GENDER.map((g: IGenderParams, index: number) => {
      arrGender.push(
        <option value={g.value} key={index}>
          {g.label}
        </option>,
      );
    });
    return arrGender;
  };

  const renderRegion = () => {
    const arrRegion: JSX.Element[] = [
      <option disabled selected value={''} key={''}>
        {' '}
        -- select an option --{' '}
      </option>,
    ];
    locations.map((location: ILocationParams, index: number) => {
      arrRegion.push(
        <option value={location.id} key={index}>
          {location.name}
        </option>,
      );
    });
    return arrRegion;
  };

  const changRegion = () => (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeRegion(e.target.value);
    setFormValues({ ...formValues, region: e.target.value });
  };

  const renderState = () => {
    const arrState: JSX.Element[] = [
      <option disabled selected value={''} key={''}>
        {' '}
        -- select an option --{' '}
      </option>,
    ];
    states.map((state: ILocationParams, index: number) => {
      arrState.push(
        <option value={state.id} key={index}>
          {state.name}
        </option>,
      );
    });
    return arrState;
  };
};
