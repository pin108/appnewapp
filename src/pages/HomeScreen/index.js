import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getData, storeData} from '../../utils/storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  HeaderPrimary,
  ItemEvent,
  ItemProduct,
  SkeletonDefault,
} from '../../components';
import {Gap, Line, TitleSection} from '../../atoms';
import {robot3} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {getDataDashboard, getDataDashboardNoAuth} from '../../redux/action';
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isLogin} = useSelector(state => state.globalReducer);
  const [data, setData] = useState([]);
  console.log('data', data);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  let jsonData = JSON.stringify(data);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (isLogin) {
      dispatch(getDataDashboard(setData, setLoad));
    } else {
      console.log('masuk no auth');
      dispatch(getDataDashboardNoAuth(setData, setLoad));
    }
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (isLogin) {
      dispatch(getDataDashboard(setData, setLoad));
    } else {
      dispatch(getDataDashboardNoAuth(setData, setLoad));
    }
  }, [isLogin]);

  return (
    <SafeAreaView style={styles.page}>
      <HeaderPrimary
        title="Home"
        handleLogin={() => navigation.navigate('LoginScreen')}
        onPress={() =>
          isLogin
            ? navigation.navigate('CartScreen')
            : navigation.navigate('LoginScreen')
        }
        countCart={data?.keranjang?.length || 0}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <View style={styles.wpContent}>
            <Image source={robot3} style={styles.img} />
            <View style={styles.wpText}>
              <Text style={styles.txtContentTitle}>
                ROBOTICS AND AUTOMATION FAKULTAS TEKNIK UDINUS
              </Text>
              <Text style={styles.txtContentDesc}>
                We are team of talented designers making robot with profesional
              </Text>
            </View>
          </View>
          <TitleSection title="Our Project" titleLink={'Info'} />
          <Gap height={10} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {load ? (
              <View style={{marginHorizontal: 15, flexDirection: 'row'}}>
                <SkeletonDefault
                  stylesSkeleton={{width: 250, height: 100, marginRight: 15}}
                />
                <SkeletonDefault
                  stylesSkeleton={{width: 250, height: 100, marginRight: 15}}
                />
                <SkeletonDefault
                  stylesSkeleton={{width: 250, height: 100, marginRight: 15}}
                />
              </View>
            ) : (
              data?.robot?.map((item, index) => {
                console.log('item', item);
                return (
                  <ItemProduct
                    key={index}
                    data={item}
                    onPress={() =>
                      navigation.navigate('DetailProduct', {id: item.id})
                    }
                  />
                );
              })
            )}
            <Gap width={15} />
          </ScrollView>
          <TitleSection title="Pelatihan" titleLink={'Info'} />
          <Gap height={10} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {load ? (
              <View style={{marginHorizontal: 15, flexDirection: 'row'}}>
                <SkeletonDefault
                  stylesSkeleton={{width: 250, height: 100, marginRight: 15}}
                />
                <SkeletonDefault
                  stylesSkeleton={{width: 250, height: 100, marginRight: 15}}
                />
                <SkeletonDefault
                  stylesSkeleton={{width: 250, height: 100, marginRight: 15}}
                />
              </View>
            ) : (
              data?.pelatihan?.map((item, index) => {
                return <ItemProduct key={index} data={item} />;
              })
            )}
            <Gap width={15} />
          </ScrollView>
          <TitleSection title="Otomasi" titleLink={'Info'} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {load ? (
              <View style={{marginHorizontal: 15, flexDirection: 'row'}}>
                <SkeletonDefault
                  stylesSkeleton={{width: 250, height: 100, marginRight: 15}}
                />
                <SkeletonDefault
                  stylesSkeleton={{width: 250, height: 100, marginRight: 15}}
                />
                <SkeletonDefault
                  stylesSkeleton={{width: 250, height: 100, marginRight: 15}}
                />
              </View>
            ) : (
              data?.otomasi?.map((item, index) => {
                return <ItemProduct key={index} data={item} />;
              })
            )}
            <Gap width={15} />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    marginTop: 5,
  },
  txtHome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  // banner content
  wpContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#634d92',
    marginHorizontal: 15,
    borderRadius: 10,
    paddingBottom: 10,
  },
  img: {
    width: 150,
    height: 150,
  },
  wpText: {
    marginTop: 10,
  },
  txtContentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    maxWidth: 180,
  },
  txtContentDesc: {
    fontSize: 10,
    color: '#fff',
    maxWidth: 180,
  },
  // end banner content
});
