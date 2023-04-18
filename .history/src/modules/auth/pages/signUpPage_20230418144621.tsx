import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { useCallback, useEffect, useState } from 'react';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';

const SignUpPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState();
  const [location, setLocation] = useState([]);

  const getLocation = useCallback(async (idRegion?: string) => {
    setLoading(true);

    const json = await dispatch(
      fetchThunk(idRegion ? `${API_PATHS.getLocation}?pid=${idRegion}` : API_PATHS.getLocation, 'get'),
    );

    setLoading(false);

    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      console.log(json.data);

      idRegion ? setStates(json.data) : setLocations(json.data);
      return;
    }
  }, []);

  useEffect(() => {
    getLocation(idRegion);
  }, [getLocation, idRegion]);
};
