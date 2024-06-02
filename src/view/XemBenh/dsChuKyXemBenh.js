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
import { AuthContext } from '../../NhanVien/AuthContext';

export default function DsChuKy({ route, navigation }) {

  const [serachText, setSerachText] = React.useState('');
  const [data, setData] = React.useState([]);
  const { user } = route.params;
  const ip ="192.168.24.1";

  const getAPI = (search = '') => {
    fetch(`http://${ip}/API_QuanLyNongTrai/ChuKy/getData.php?search=${search}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  };

  const getAPINhanVien = (search = '', tenDangNhap = '') => {
    fetch(`http://${ip}/API_QuanLyNongTrai/ChuKy/getDataBangMaNhanVien.php?search=${search}`)
      .then(response => response.json())
      .then(data => {
        // Lọc danh sách nhân viên theo viTriCongViec
        const filteredData = data.filter(user => user.tenDangNhap === tenDangNhap);
        setData(filteredData);
      })
      .catch(err => console.log(err));
  };


    useEffect(() => {
       if(user.viTriCongViec == "admin"){
           getAPI();
       }

       if(user.viTriCongViec != "admin"){
           getAPINhanVien("",user.tenDangNhap);
       }

    },[]);
    console.log(data)

  const handleSearch = (text) => {
    setSerachText(text);
    if(user.viTriCongViec == "admin"){
       getAPI(text);
    }

    if(user.viTriCongViec != "admin"){
       getAPINhanVien("",user.tenDangNhap);
    }
  };

  const hienThiLaiDuLieu = () => {
    getAPI();
  };

const renderItem = ({ item }) => (
    <TouchableOpacity
        onPress={() => {
          if (user.viTriCongViec === "admin") {
            navigation.navigate('Sửa chu kỳ chăn nuôi', {
              newItem: item,
              hienThiLaiDuLieu: hienThiLaiDuLieu,
            });
          } else {
            alert('Bạn không có quyền truy cập vào chức năng này.');
          }
        }}
      >
      <View style={styles.view_ds}>
        <Text style={styles.duLieuDS}>Nhân viên chăm sóc: Mã NV: {item.tenDangNhap} - Tên TK: {item.tenDangNhap}</Text>
        <View style={styles.item_view_ds}>
          <Image
            style={styles.image_ds}
            source={{ uri: item.hinh }}
            resizeMode="contain"></Image>
          <View>
            <Text style={styles.duLieuDS}>Mã chu kỳ: {item.maCK}</Text>
            <Text style={styles.duLieuDS}>tên đông vật: {item.tenDV}</Text>
            <Text style={styles.duLieuDS}>
              Bắt đầu:{item.ngayBatDau} - Kết thúc:{item.ngayKetThuc}
            </Text>
            <Text style={styles.duLieuDS}>Số lượng nuôi: {item.soLuongNuoi} con</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.btn_GhiChepCK}
            onPress={() =>
              navigation.navigate('Xem ghi chép chăn nuôi', {
                itemCK: item,
              })
            }>
            <Text style={styles.btn_GhiChepChuKy}>Chăn sóc động vật</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.btn_ThuHoach} onPress={() =>
                                                                      navigation.navigate('Thống kê lịch ghi chép chăn nuôi', {
                                                                        itemCK: item,
                                                                      })
                                                                    }>
            <Text style={styles.txt_ThuHoach}>Thống kê lịch ghi chép chăn nuôi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ backgroundColor: '#EDF9ED', marginBottom: 150 }}>
          {/*Tieu de*/}
          <View>
            <Text style={styles.tieude_tb}>Danh sách chu kỳ chăn nuôi</Text>
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
          {user.viTriCongViec === "admin" && (
            <TouchableOpacity
              style={styles.btn_ThemChuKyChanNuoi}
              onPress={() => navigation.navigate('Thêm chu kỳ', { hienThiLaiDuLieu })}
            >
              <Text style={styles.txt_ChuKyChanNuoi}>Thêm chu kỳ chăn nuôi</Text>
            </TouchableOpacity>
          )}

          <FlatList
               style={styles.ds}
               data={data}
               renderItem={renderItem}
               keyExtractor={(item) => item.maCK.toString()}
          />

        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ds: {
  height: 'auto',
  },
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


