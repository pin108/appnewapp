import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HeaderPrimary, ItemProduct} from '../../components';

const ProductScreen = () => {
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      title: 'Robot 1',
      price: 2000000,
      image: 'https://sofosrobotics.id/assets/landing/img/robot/robot1.png',
    },
    {
      id: 2,
      title: 'Robot 2',
      price: 2000000,
      image: 'https://sofosrobotics.id/assets/landing/img/robot/robot2.png',
    },
    {
      id: 3,
      title: 'Robot 3',
      price: 2000000,
      image: 'https://sofosrobotics.id/assets/landing/img/robot/robot3.png',
    },
  ];
  return (
    <SafeAreaView style={styles.page}>
      <HeaderPrimary
        title="Product"
        handleLogin={() => navigation.navigate('LoginScreen')}
      />
      <View style={styles.content}>
        {data.map((item, index) => {
          return (
            <ItemProduct
              key={index}
              data={item}
              type={'product'}
              onPress={() => navigation.navigate('DetailProductScreen')}
            />
          );
        })}
      </View>
      <Text>ProductScreen</Text>
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
