import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HeaderPrimary, ItemHistory, SkeletonDefault} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {getAllHistoryTransaction} from '../../redux/action';
import {Gap} from '../../atoms';

const HistoryPayment = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  console.log('data', data);
  useEffect(() => {
    dispatch(getAllHistoryTransaction(setData, setLoad));
  }, []);
  return (
    <SafeAreaView style={styles.page}>
      <HeaderPrimary title="History Payment" countCart={0} />
      <Gap height={20} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {load ? (
          <>

            <SkeletonDefault stylesSkeleton={styles.skeleton} />
            <SkeletonDefault stylesSkeleton={styles.skeleton} />
            <SkeletonDefault stylesSkeleton={styles.skeleton} />
            <SkeletonDefault stylesSkeleton={styles.skeleton} />
            <SkeletonDefault stylesSkeleton={styles.skeleton} />
            <SkeletonDefault stylesSkeleton={styles.skeleton} />
          </>
        ) : data?.length > 0 && data !== undefined ? (
          data?.map((item, index) => {
            console.log('item', item);
            return (
              <ItemHistory
                key={index}
                onPress={() =>
                  navigation.navigate('DetailHistoryPayment', {
                    invoice_code: item.kode_invoice,
                  })
                }
              />
            );
          })
        ) : (
          <View style={styles.empty}>
            <Text style={styles.textEmpty}>Data Empty</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryPayment;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpty: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  skeleton: {
    width: '91%',
    height: 80,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
  },
});
