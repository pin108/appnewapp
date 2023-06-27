import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {getDetailProduct, postAddCart} from '../../redux/action';
import {HeaderPrimary, ItemProduct, SkeletonDefault} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Button, Gap, Line, TitleSection} from '../../atoms';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const DetailProduct = ({route}) => {
  const {id} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  const onHandleToCart = item => {
    let newData = {
      keranjang: true,
      idRobot: id,
      pesanan: [item?.id],
    };
    dispatch(postAddCart(newData, navigation, id, setData, setLoad));
  };
  useEffect(() => {
    dispatch(getDetailProduct(id, setData, setLoad));
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <HeaderPrimary
        type={'detail'}
        typeCart={true}
        title="Detail Product"
        countCart={data?.keranjang?.length}
        onPress={() => navigation.goBack()}
        onPressTow={() => navigation.navigate('CartScreen')}
      />
      <ScrollView>
        {load ? (
          <SkeletonDefault stylesSkeleton={styles.image} />
        ) : (
          <Image
            style={styles.image}
            source={{
              uri: `http://34.142.156.17:882/storage/${data?.robot?.image}`,
            }}
          />
        )}
        <Gap height={10} />
        <TitleSection title="Deskripsi" />
        <View style={styles.container}>
          <View style={styles.wpDetailInfo}>
            <Text style={styles.textLeft}>Nama</Text>
            <Text style={styles.textRight}>{data?.robot?.nama}</Text>
          </View>
          <View style={styles.wpDetailInfo}>
            <Text style={styles.textLeft}>Product</Text>
            <Text style={styles.textRight}>{data?.robot?.namaproduct}</Text>
          </View>
          <View style={styles.wpDetailInfo}>
            <Text style={styles.textLeft}>Durasi Project</Text>
            <Text style={styles.textRight}>{data?.robot?.duration}</Text>
          </View>
          <View style={styles.wpDetailInfo}>
            <Text style={styles.textLeft}>Kategory</Text>
            <Text style={styles.textRight}>{data?.robot?.kategory}</Text>
          </View>
        </View>
        <Gap height={10} />
        <Line stylesLine={{marginHorizontal: 15}} />
        <Gap height={10} />
        <TitleSection title="Penawaran" />
        <View>
          {/* <View style={styles.cartCenter}>
            <Button title="Beli" onPress={() => console.log('Beli')} />
          </View> */}
          <View style={styles.content}>
            {load ? (
              <SkeletonDefault stylesSkeleton={styles.image} />
            ) : data?.penawaran?.length > 0 ? (
              <>
                {data?.penawaran?.map((item, index) => {
                  return (
                    <ItemProduct
                      key={index}
                      data={item}
                      type={'product'}
                      onPress={() => onHandleToCart(item)}
                    />
                  );
                })}
              </>
            ) : (
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center'}}>Tidak ada penawaran</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailProduct;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  container: {
    marginHorizontal: 15,
  },
  wpDetailInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 18,
  },
  textLeft: {
    fontFamily: 'Poppins-Medium',
    color: '#7B7B7B',
    fontSize: RFValue(12),
  },
  textRight: {
    fontSize: RFValue(12),
    fontFamily: 'Poppins-Medium',
    color: '#242424',
  },
  cartCenter: {
    alignItems: 'center',
    marginVertical: 20,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
