import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {convertToRupiah, truncateString} from '../../utils/helpers';
import {Button, Gap} from '../../atoms';
import {robot3} from '../../assets';
import {API_HOST} from '../../config/API';

const ItemProduct = ({data, onPress, type}) => {
  const dataDesc = `${data?.nama}`;
  if (type === 'payment') {
    return (
      <View style={styles.content}>
        <Image
          source={{
            // uri: `https://sofosrobotics.id/storage/app/${data?.image}`,
            uri: `http://34.142.156.17:882/storage/${data?.jawaban[0]?.penawaran?.image}`,
          }}
          style={styles.img}
        />
        <View style={styles.wpText}>
          <Text style={styles.title}>
            {data?.jawaban[0]?.penawaran?.penawaran}
          </Text>
          <Text style={styles.desc}>
            {data?.jawaban[0]?.penawaran?.komponen}
          </Text>
          <Text style={styles.desc}>{`${convertToRupiah(
            data?.jawaban[0]?.harga,
          )} x ${data?.qty}`}</Text>
          <Text
            style={
              styles.desc
            }>{`Jasa : ${convertToRupiah(data?.jawaban[0]?.penawaran?.jasa)}`}</Text>
        </View>
      </View>
    );
  }
  if (type === 'product') {
    return (
      <View style={styles.contentProduct}>
        <Image
          source={{
            uri: `http://34.142.156.17:882/storage/${data?.image}`,
          }}
          style={styles.img}
        />
        <View style={styles.wpTextV2}>
          <Text style={styles.titleCenter}>{data?.penawaran}</Text>
          <Gap height={5} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
            }}>
            <Text style={styles.txt}>{'Komponen : '}</Text>
            <View />
            <Text style={styles.txt2}>{data?.komponen}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
            }}>
            <Text style={styles.txt}>{'Harga Jasa : '}</Text>
            <View />
            <Text style={styles.txt2}>{`Rp${data?.jasa}`}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
            }}>
            <Text style={styles.txt}>{'Harga : '}</Text>
            <View />
            <Text style={styles.txt2}>{`Rp${data?.jasa}`}</Text>
          </View>
          <Gap height={10} />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button
              title="Keranjang"
              stylesButton={styles.btn}
              stylesText={{
                color: '#fff',
                fontSize: 10,
              }}
              onPress={onPress}
            />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.content}>
      <Image
        source={{
          // uri: `https://sofosrobotics.id/storage/app/${data?.image}`,
          uri: `http://34.142.156.17:882/storage/${data?.image}`,
        }}
        style={styles.img}
      />
      <View style={styles.wpText}>
        <Text style={styles.title}>{data?.nama}</Text>
        <Text style={styles.desc}>{truncateString(dataDesc, 100)}</Text>
        <Button
          title="Detail"
          stylesButton={styles.btn}
          stylesText={{
            color: '#fff',
            fontSize: 10,
          }}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default ItemProduct;

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    height: 150,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginLeft: 15,
  },
  contentProduct: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10,
    marginBottom: 10,
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    maxWidth: 180,
  },
  titleCenter: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    maxWidth: 180,
    textAlign: 'center',
  },
  desc: {
    fontSize: 10,
    color: 'black',
    maxWidth: 150,
  },
  wpText: {
    marginLeft: 12,
  },
  wpTextV2: {
    maxWidth: Dimensions.get('window').width / 2.5,
  },
  btn: {
    backgroundColor: '#634d92',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 5,
    width: 80,
  },
  txt: {
    fontSize: 10,
    color: 'black',
  },
  txt2: {
    fontSize: 10,
    color: 'black',
    maxWidth: 100,
  },
});
