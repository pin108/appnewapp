import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HeaderPrimary, ItemProduct} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {Button, Gap, TitleSection} from '../../atoms';
import {showMessage, useForm} from '../../utils';
import {useDispatch} from 'react-redux';
import {
  getDetailHistoryTransaction,
  postUploadPembayaran,
} from '../../redux/action';

const DetailHistoryPayment = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {invoice_code} = route.params;
  const [form, setForm] = useForm({
    image: '',
  });
  const [imageProfile, setImageProfile] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('data transaksi', data);

  useEffect(() => {
    dispatch(getDetailHistoryTransaction(invoice_code, setData, setLoading));
  }, []);
  return (
    <SafeAreaView style={styles.page}>
      <HeaderPrimary
        title="Payment"
        onPress={() => navigation.goBack()}
        type={'detail'}
      />
      <ScrollView style={styles.container}>
        <TitleSection title="Payment" />
        <View>
          <View style={styles.content}>
            <Text style={styles.txttitle}>User</Text>
            <Text style={styles.txtdesc}>{data?.transaksi?.user?.nama}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.txttitle}>Verifikasi Pembayaran</Text>
            <Text style={styles.txtdesc}>
              {parseInt(data?.transaksi?.verifikasi_pembayaran) === 0
                ? 'Belum Verifikasi'
                : 'Sudah Verifikasi'}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.txttitle}>Bukti Pembayaran</Text>
            <Text style={styles.txtdesc}>
              {data?.transaksi?.bukti_pembayaran === null
                ? 'Belum Upload'
                : 'Sudah Upload'}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.txttitle}>Tanggal</Text>
            <Text style={styles.txtdesc}>{data?.transaksi?.created_at}</Text>
          </View>
        </View>
        <TitleSection title="Pembayaran" />
        <View>
          <View style={styles.content}>
            <Text style={styles.txttitle}>Total Pembayaran</Text>
            <Text style={styles.txtdesc}>{data?.transaksi?.total_bayar}</Text>
          </View>
        </View>
        <TitleSection title="Bukti Pembayaran" />
        <View style={{marginHorizontal: 15, marginBottom: 20}}>
          <View style={styles.preview}>
            {data?.transaksi?.bukti_pembayaran === null ? (
              <View style={styles.noImage}>
                <Text style={styles.txttitle}>No Image</Text>
              </View>
            ) : (
              <Image
                source={{
                  uri: data?.transaksi?.bukti_pembayaran,
                }}
                style={styles.imgpreview}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailHistoryPayment;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  txttitle: {
    fontSize: 12,
    color: '#8D92A3',
    marginBottom: 5,
  },
  txtdesc: {
    fontSize: 12,
    color: '#020202',
  },
  preview: {
    width: 100,
    height: 100,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  imgpreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  noImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
