import { useDispatch } from 'react-redux';
import logo from '../../../logo-420-x-108.png';

import { ThunkDispatch } from 'redux-thunk';
import { ISignUpParams } from '../../../models/auth';
import { useDispatch } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import { useCallback, useEffect, useState } from 'react';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';

import { replace } from 'connected-react-router';

const SignUpPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [states, setStates] = useState([]);
  const [idRegion, setIdRegion] = useState('');

  const getLocation = useCallback(async (idRegion?: string) => {
    setLoading(true);

    const json = await dispatch(
      fetchThunk(idRegion ? `${API_PATHS.getLocation}?pid=${idRegion}` : API_PATHS.getLocation, 'get'),
    );

    setLoading(false);

    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      console.log(json.data);

      idRegion ? setStates(json.data) : setLocation(json.data);
      return;
    }
  }, []);

  useEffect(() => {
    getLocation(idRegion);
  }, [getLocation, idRegion]);

  const onSignUp = useCallback(
    async (values: ISignUpParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(fetchThunk(API_PATHS.signUp, 'post', values));

      setLoading(false);

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(json.data));
        // Cookies.set(ACCESS_TOKEN_KEY, json.data.token, { expires: values.rememberMe ? 7 : undefined });
        dispatch(replace(ROUTES.home));
        return;
      }

      setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch],
  );

  return (
    <div
      className="container"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />

      <SignUpForm
        onSignUp={onSignUp}
        loading={loading}
        errorMessage={errorMessage}
        locations={locations}
        states={states}
        onChangeRegion={onChangeRegion}
      />
    </div>
  );
};
