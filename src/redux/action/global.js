import axios from 'axios';
import {API_HOST} from '../../config/API';
import {getData, showMessage, storeData} from '../../utils';

export const postLogin = (form, navigation) => dispatch => {
  console.log('form', form);
  try {
    const res = axios.post(`${API_HOST.baseUrlAPI}login`, form, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res.then(res => {
      console.log('res', res);
      storeData('tokenLogin', res?.data?.token);
      showMessage(res?.data?.message, 'success');
      dispatch({type: 'SET_LOADING', value: false});
      dispatch({type: 'SET_LOGIN', value: true});
      navigation.navigate('Home');
    });
  } catch (e) {
    console.log('error', e);
  }
};

export const postRegister = (form, navigation) => async dispatch => {
  console.log('form', form);
  try {
    const res = await axios.post(`${API_HOST.baseUrlAPI}register`, form, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res.then(res => {
      showMessage(res?.data?.message, 'success');
      dispatch({type: 'SET_LOADING', value: false});
      navigation.navigate('LoginScreen');
    });
  } catch (e) {
    console.log('error', e?.response?.data?.message);
    showMessage(e?.response?.data?.message, 'error');
  }
};

export const getDataDashboard = (setData, setLoad) => async dispatch => {
  try {
    setLoad(true);
    const getToken = await getData('tokenLogin');
    console.log('getToken', getToken);
    const res = await axios.get(`${API_HOST.baseUrlAPI}dashboard`, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });
    if (res) {
      setData(res?.data);
      dispatch({type: 'SET_LIST_CART', value: res?.data?.keranjang});
      setLoad(false);
    }
  } catch (e) {
    console.log('get erorr', e?.response?.data?.message);
    setLoad(false);
  }
};

export const getDataDashboardNoAuth = (setData, setLoad) => async dispatch => {
  try {
    setLoad(true);
    const res = await axios.get(`${API_HOST.baseUrlAPI}homes`);
    if (res) {
      setData(res?.data);
      setLoad(false);
    }
  } catch (e) {
    console.log('get erorr', e?.response?.data?.message);
    setLoad(false);
  }
};

export const getDetailProduct = (id, setData, setLoad) => async dispatch => {
  try {
    setLoad(true);
    const getToken = await getData('tokenLogin');
    console.log('getToken', getToken);
    const res = await axios.get(`${API_HOST.baseUrlAPI}showdetail/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });
    if (res) {
      console.log('res', res);
      setData(res?.data);
      setLoad(false);
    }
  } catch (e) {
    console.log('get erorr', e?.response?.data?.message);
    setLoad(false);
  }
};

export const postAddCart =
  (form, navigation, id, setData, setLoad) => async dispatch => {
    try {
      const getToken = await getData('tokenLogin');
      const res = await axios.post(`${API_HOST.baseUrlAPI}keranjang`, form, {
        headers: {
          Authorization: `Bearer ${getToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (res) {
        dispatch(getDetailProduct(id, setData, setLoad));
        showMessage('Sukses Menambahkan Keranjang', 'success');
        dispatch({type: 'SET_LOADING', value: false});
      }
    } catch (e) {
      showMessage('Gagal Menambahkan Keranjang', 'error');
    }
  };

export const postCheckout = (form, navigation) => async dispatch => {
  try {
    const getToken = await getData('tokenLogin');
    const res = await axios.post(`${API_HOST.baseUrlAPI}checkoutdata`, form, {
      headers: {
        Authorization: `Bearer ${getToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (res) {
      console.log('TOTAL TRANSAKSI', res?.data?.transaksi?.total_bayar);
      showMessage(res?.data?.message, 'success');
      dispatch({type: 'SET_LOADING', value: false});
      navigation.navigate('PaymentScreen', {
        invoice_code: res?.data?.transaksi?.kode_invoice,
      });
    }
  } catch (e) {
    console.log('get erorr', e?.response?.data?.message);
    showMessage(e?.response?.data?.message, 'error');
  }
};

export const getDataPayment =
  (invoice_code, setData, setLoad) => async dispatch => {
    try {
      setLoad(true);
      const getToken = await getData('tokenLogin');
      console.log('getToken', getToken);
      const res = await axios.get(
        `${API_HOST.baseUrlAPI}invoice/${invoice_code}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        },
      );
      if (res) {
        console.log('res', res);
        setData(res?.data);
        setLoad(false);
      }
    } catch (e) {
      console.log('get erorr', e?.response?.data?.message);
      setLoad(false);
    }
  };

export const postUploadPembayaran =
  (form, invoice_code, navigation) => async dispatch => {
    getData('tokenLogin').then(resToken => {
      console.log('resToken', resToken);
      console.log(
        'invoice_code',
        `${API_HOST.baseUrlAPI}uploadpembayaran/${invoice_code}`,
      );
      const fetchData = fetch(
        `${API_HOST.baseUrlAPI}uploadpembayaran/${invoice_code}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${resToken}`,
            'Content-Type': 'multipart/form-data',
          },
          body: form,
        },
      );
      fetchData
        .then(res => res.json())
        .then(resJson => {
          console.log('resJson', resJson);
          showMessage(resJson?.data?.message, 'success');
          dispatch({type: 'SET_LOADING', value: false});
          navigation.navigate('Home');
        })
        .catch(err => {
          console.log('err', err);
          showMessage(err?.response?.data?.message, 'error');
        });
    });
  };

export const getAllHistoryTransaction =
  (setData, setLoad) => async dispatch => {
    try {
      setLoad(true);
      const getToken = await getData('tokenLogin');
      console.log('getToken', getToken);
      const res = await axios.get(`${API_HOST.baseUrlAPI}datatransaksi`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      if (res) {
        console.log('res', res);
        setData(res?.data);
        setLoad(false);
      }
    } catch (e) {
      console.log('get erorr', e?.response?.data?.message);
      setLoad(false);
    }
  };

export const getDetailHistoryTransaction =
  (invoice_code, setData, setLoad) => async dispatch => {
    try {
      setLoad(true);
      const getToken = await getData('tokenLogin');
      console.log('getToken', getToken);
      const res = await axios.get(
        `${API_HOST.baseUrlAPI}showtransaksi/${invoice_code}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        },
      );
      if (res) {
        console.log('res', res);
        setData(res?.data);
        setLoad(false);
      }
    } catch (e) {
      console.log('get erorr', e?.response?.data?.message);
      setLoad(false);
    }
  };
