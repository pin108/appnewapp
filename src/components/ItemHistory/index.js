import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';

const ItemHistory = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.wpContentCard}>
          <Text style={styles.wpTxtTitle}>
            6c8baf76-9d41-4ae2-b086-209e1e747b02
          </Text>
          <Text style={styles.wpPrice}>Rp100.000.000</Text>
          <Text style={styles.date}>2 Januari 2023</Text>
        </View>
        <View style={styles.wpStatus}>
          <Text style={styles.wpTxtStatus}>Menunggu Konfirmasi</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemHistory;

const styles = StyleSheet.create({
  card: {
    width: '91%',
    height: 'auto',
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  wpContentCard: {
    marginHorizontal: 15,
  },
  wpStatus: {
    height: RFValue(15),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC700',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 15,
  },
  wpTxtTitle: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
    color: '#020202',
    marginBottom: 5,
  },
  wpPrice: {
    fontSize: RFValue(10),
    fontWeight: 'bold',
    color: '#8D92A3',
    marginBottom: 5,
  },
  date: {
    fontSize: RFValue(10),
    fontWeight: 'bold',
    color: '#8D92A3',
    marginBottom: 5,
  },
  wpTxtStatus: {
    fontSize: RFValue(8),
    fontWeight: 'bold',
    color: '#000',
  },
});
