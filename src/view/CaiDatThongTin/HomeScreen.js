import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const HomeScreen = ({ route, navigation }) => {
  const { maTK } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAPI = (search = '') => {
    fetch(`http://192.168.24.1/API_QuanLyNongTrai/CaiDatThongTin/getData.php?search=${search}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAPI(maTK);
  }, []);


  const hienThiLaiDuLieu = () => {
      getAPI(maTK);
   };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No data found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={data[0].avartaNV === ''
          ? require('../../image/dv_ck.png')
          : { uri: data[0].avartaNV }}
        style={styles.image}
      />
      <View style={styles.thongtin}>
        <Text style={styles.tt}>Mã tài khoản:</Text>
        <Text style={styles.tt2}>{data[0].tenDangNhap}</Text>
      </View>

      <View style={styles.thongtin}>
        <Text style={styles.tt}>Tên tài khoản:</Text>
        <Text style={styles.tt2}>{data[0].tenDangNhap}</Text>
      </View>

      <View style={styles.thongtin}>
        <Text style={styles.tt}>Số điện thoại:</Text>
        <Text style={styles.tt2}>{data[0].sdt}</Text>
      </View>

      <View style={styles.thongtin}>
        <Text style={styles.tt}>E-mail:</Text>
        <Text style={styles.tt2}>{data[0].email}</Text>
      </View>

      <View style={styles.thongtin}>
        <Text style={styles.tt}>Ngày sinh:</Text>
        <Text style={styles.tt2}>{data[0].ngaySinh}</Text>
      </View>

      <View style={styles.thongtin}>
        <Text style={styles.tt}>Chức vụ:</Text>
        <Text style={styles.tt2}>{data[0].viTriCongViec}</Text>
      </View>

      <View style={styles.btn}>
        <TouchableOpacity style={styles.btn_xoa_sua} onPress={() => navigation.navigate('Sửa thông tin tài khoản',{data:data[0],hienThiLaiDuLieu:hienThiLaiDuLieu,})}>
          <Text style={{ color: 'black' }}>Sửa thông tin</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn_xoa_sua} onPress={() => navigation.navigate('Đổi mật khẩu',{data:data[0], hienThiLaiDuLieu:hienThiLaiDuLieu,})}>
          <Text style={{ color: 'black' }}>Đôỉ mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#F3FFF3',
  },
  image: {
    marginBottom: 5,
    marginLeft: '33%',
    width: 140,
    height: 140,
    alignItems: 'center',
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#008400',
  },
  thongtin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
    padding: 10,
    marginTop: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    marginBottom: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  tt: {
    fontSize: 16,
  },
  tt2: {
    fontSize: 16,
    color: 'black',
  },
  btn: {
    marginTop: 50,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  btn_xoa_sua: {
    backgroundColor: '#E5EEDF',
    padding: 10,
    width: '45%',
    textAlign: 'center',
    alignItems: 'center',
    borderWidth: 0.4,
    borderColor: 'black',
    borderRadius: 3,
  },
});

export default HomeScreen;
