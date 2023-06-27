import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HeaderPrimary, ItemCart, SkeletonDefault} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {Button, Gap, TitleSection} from '../../atoms';
import {ScrollView} from 'react-native';
import {getDataDashboard, postCheckout} from '../../redux/action';
import {useDispatch, useSelector} from 'react-redux';
import {RFValue} from 'react-native-responsive-fontsize';
import {convertToRupiah} from '../../utils';

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {listCart} = useSelector(state => state.globalReducer);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  const onHandleTotalHarga = () => {
    let total = 0;
    let fix_total = 0;
    listCart?.map(item => {
      const harga = item?.jawaban?.[0]?.harga;
      const jasa = item?.jawaban?.[0]?.penawaran?.jasa;
      const quality = item?.qty;
      total = total + harga * quality;
      fix_total = total + parseInt(jasa);
    });
    return fix_total;
  };

  const onHandleSelect = item => {
    const newData = data?.keranjang?.map((data, index) => {
      if (data?.id === item?.id) {
        return {
          ...data,
          isSelect: !data?.isSelect,
        };
      }
      return data;
    });
    setData({
      ...data,
      keranjang: newData,
    });
  };

  const onHandleCheckout = () => {
    const fixTotal = onHandleTotalHarga();
    // const orderedData = JSON.stringify(fixTotal, ['total_harga'], 2);
    const orderedData = {
      total_harga: fixTotal,
    };
    console.log('orderedData', orderedData);
    dispatch(postCheckout(orderedData, navigation));
    setData({
      ...data,
      keranjang: [],
    });
  };

  useEffect(() => {
    dispatch(getDataDashboard(setData, setLoad));
  }, []);
  return (
    <SafeAreaView style={styles.page}>
      <HeaderPrimary type={'detail'} onPress={() => navigation.goBack()} />
      <Gap height={5} />
      <TitleSection title="Keranjang" />
      <Gap height={10} />
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        {load ? (
          <>
            <SkeletonDefault stylesSkeleton={styles.skeleton} />
            <SkeletonDefault stylesSkeleton={styles.skeleton} />
            <SkeletonDefault stylesSkeleton={styles.skeleton} />
            <SkeletonDefault stylesSkeleton={styles.skeleton} />
          </>
        ) : data?.keranjang?.length > 0 ? (
          data?.keranjang?.map((item, index) => {
            return (
              <ItemCart
                key={index}
                data={item}
                value={true}
                setValue={() => {}}
                dispatch={dispatch}
                // value={item?.isSelect ? true : false}
                // setValue={() => {
                //   onHandleSelect(item);
                // }}
              />
            );
          })
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
              Keranjang Kosong
            </Text>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}>
        <View>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
            Total
          </Text>
          <Gap height={5} />
          <Text style={{fontSize: 14, fontWeight: 'bold', color: '#000'}}>
            {convertToRupiah(onHandleTotalHarga())}
          </Text>
        </View>
        <Button
          title="Checkout"
          stylesButton={styles.button}
          stylesText={styles.buttonText}
          onPress={() => onHandleCheckout()}
        />
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#7126B5',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  skeleton: {
    marginHorizontal: 20,
    marginVertical: 10,
    width: Dimensions.get('window').width - 40,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
});
