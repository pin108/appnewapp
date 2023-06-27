import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Gap, Line} from '../../atoms';
import CheckBox from '@react-native-community/checkbox';
import {convertToRupiah, showMessage} from '../../utils';
import {useSelector} from 'react-redux';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ItemCart = ({data, value, setValue, dispatch}) => {
  const [qty, setQty] = useState(1);
  const {listCart} = useSelector(state => state.globalReducer);

  const handleIncrement = () => {
    if (qty < data?.qty) {
      setQty(qty + 1);
    } else {
      showMessage('Jumlah melebihi batas', 'error');
    }
  };

  const handleDecrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
    } else {
      showMessage('Jumlah tidak boleh kurang dari 1', 'error');
    }
  };

  useEffect(() => {
    const newData = listCart?.map((item, index) => {
      if (item?.id === data?.id) {
        return {
          ...item,
          qty: qty,
        };
      }
      return item;
    });
    dispatch({type: 'SET_LIST_CART', value: newData});
    console.log('newData', newData);
  }, [qty]);

  return (
    <View style={styles.container}>
      <View style={styles.wpCard}>
        {/* <CheckBox
          disabled={false}
          value={value}
          onValueChange={setValue}
          tintColors={{true: '#7126B5', false: '#7126B5'}}
        /> */}
        <Image
          source={{
            // uri: `http://34.142.156.17:882/storage/${data?.jawaban?.[0]?.penawaran?.image}`,
            uri: `http://34.142.156.17:882/storage/${data?.robot?.image}`,
          }}
          style={styles.img}
        />
        <Gap width={10} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View style={styles.wpText}>
            <Text
              style={{
                fontSize: RFValue(12),
                fontWeight: 'bold',
                color: '#000',
                fontFamily: 'Poppins-Regular',
              }}>
              {data?.jawaban?.[0]?.penawaran?.penawaran}
            </Text>
            <Gap height={5} />
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: RFValue(8),
                  color: '#8D92A3',
                  marginRight: 5,
                }}>
                {`${convertToRupiah(data?.jawaban?.[0]?.harga * qty)}`}
              </Text>
              <Line
                stylesLine={{
                  width: 2,
                  height: 10,
                  marginRight: 5,
                }}
              />
              <Text
                style={{
                  fontSize: RFValue(8),
                  color: '#8D92A3',
                }}>
                {`Jasa : ${convertToRupiah(data?.jawaban?.[0]?.penawaran?.jasa)}`}
              </Text>
            </View>
          </View>
          <View style={styles.count}>
            <TouchableOpacity style={styles.button} onPress={handleDecrement}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{qty}</Text>
            <Gap width={10} />
            <TouchableOpacity style={styles.button} onPress={handleIncrement}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemCart;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: RFValue(10),
    borderRadius: 10,
    width: width - 25,
    height: height * 0.15,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#fff',
    marginBottom: RFValue(15),
    justifyContent: 'center',
    
  },
  img: {
    width: RFValue(50),
    height: RFValue(50),
    resizeMode: 'contain',
    borderRadius: 10,
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(10),
  },
  wpCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: RFValue(10),
    maxWidth: Dimensions.get('window').width - 25,
  },
  count: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#DDDDDD',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8A899C',
  },
  quantity: {
    fontSize: 12,
    color: '#8A899C',
  },
  wpText: {
    
  },
});
