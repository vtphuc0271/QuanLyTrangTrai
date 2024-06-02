import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  RootTagContext,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import { Alert } from 'react-native';


export default function ChonChuKy({ route, navigation }) {
  const { chonChuKyDongVat } = route.params;

  const handleChonChuKy = (chonDongVat) => {
    chonChuKyDongVat(chonDongVat);
    navigation.goBack();
  };

  const [serachText, setSerachText] = React.useState('');
  const [data, setData] = React.useState([]);


  const getAPI = (search = '') => {
    fetch(`http://192.168.24.1/API_QuanLyNongTrai/ThuHoach/getDataChuKy.php?search=${search}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  };

    useEffect(() => {
        getAPI();
    },[]);
    console.log(data)

    const handleSearch = (text) => {
        setSerachText(text);
        getAPI(text);
     };

  const Item = ({ item }) => (
    <View style={styles.view_ds}>
      <View style={styles.item_view_ds}>
        <Image
          style={styles.image_ds}
          source={{ uri: item.hinhDV }}
          resizeMode="contain"></Image>
        <View>
          <Text style={styles.duLieuDS}>Mã chu kỳ: {item.maCK}</Text>
          <Text style={styles.duLieuDS}>Tên động vật: {item.tenDV}</Text>
          <Text style={styles.duLieuDS}>
            Ngày bắt đầu:{item.ngayBatDau} -  Ngày kết thúc:{item.ngayKetThuc}
          </Text>
          <Text style={styles.duLieuDS}>Số lượng nuôi: {item.soLuongNuoi} con</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.btn_ThuHoach}
          onPress={() => handleChonChuKy(item)}>
          <Text style={styles.txt_ThuHoach}>Chọn chu kỳ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ backgroundColor: '#EDF9ED', marginBottom: 150 }}>
      {/*Tieu de*/}
      <View>
        <Text style={styles.tieude_tb}>Danh sách chu kỳ</Text>
      </View>
      {/*Tim kiem */}
      <View style={styles.view_search}>
        <TextInput
          style={styles.search}
          value={serachText}
          onChangeText={handleSearch}
          placeholder="Tìm kiếm chu kỳ"></TextInput>
        <Image
          style={styles.img_search}
          source={require('../../image/search_ck.png')}
          resizeMode="contain"></Image>
      </View>
      {/*btn Them chu ky chan nuoi */}

      <FlatList
        style={styles.ds}
        data={data}
        renderItem={Item}
        keyExtractor={(item) => item.maCK.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ds: {},
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  header_top: {
    flexDirection: 'row',
    height: 72,
    backgroundColor: '#067E2F',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_quaylai: {
    height: 30,
    width: 30,
    position: 'absolute',
    left: 10,
    textAlign: 'left',
  },
  title_header_top: {
    width: 'auto',
    color: 'white',
    textAlign: 'center',
  },

  img_quaylai: {
    height: 30,
    width: 30,
  },

  tieude_tb: {
    marginTop: 15,
    fontWeight: 'bold',
    marginLeft: 15,
    color: 'black',
    fontSize: 15,
  },

  img_search: {
    height: 25,
    width: 25,
    position: 'absolute',
    right: 40,
  },
  view_search: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  search: {
    borderColor: 'black',
    paddingLeft: 10,
    borderWidth: 0.5,
    fontSize: 11,
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    height: 38,
    borderRadius: 100,
  },

  view_ds: {
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  item_view_ds: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  image_ds: {
    marginRight: 10,
    height: 80,
    width: 110,
  },
  duLieuDS: {
    fontSize: 11,
    color: 'black',
  },
  btn_GhiChepCK: {
    justifyContent: 'center',
    height: 26,
    backgroundColor: '#D9D9D9',
  },
  btn_GhiChepChuKy: {
    width: 'auto',
    fontSize: 11,
    color: 'black',
    textAlign: 'center',
  },
  btn_ThuHoach: {
    marginTop: 10,
    justifyContent: 'center',
    height: 26,
    backgroundColor: '#067E2F',
  },
  txt_ThuHoach: {
    width: 'auto',
    fontSize: 11,
    color: 'white',
    textAlign: 'center',
  },

  btn_ThemChuKyChanNuoi: {
    marginTop: 10,
    justifyContent: 'center',
    height: 30,
    backgroundColor: '#D9D9D9',
    marginLeft: 15,
    marginRight: 15,
    borderColor: 'black',
    borderWidth: 0.3,
  },
  txt_ChuKyChanNuoi: {
    width: 'auto',
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
  },
});
