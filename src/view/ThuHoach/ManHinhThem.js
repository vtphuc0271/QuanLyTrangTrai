import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  TextInput,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Picker,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function ManHinhThem({ route, navigation }) {
  const { hienThiLaiDanhSach } = route.params;

  const handleSave = async () => {
      try {
              const response = await fetch('http://192.168.24.1/API_QuanLyNongTrai/ThuHoach/addData.php', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  tienThietHai : thietHai,
                  soLuongBan: soLuong,
                  khoiLuong : khoiLuong,
                  donVi : donVi,
                  maChuKy: maChuKy,
                  giaThiTruong : giaThiTruong,
                }),
              });

              const data = await response.json();
              console.log(data); // Xử lý phản hồi từ file PHP tại đây

              if (data.success) {
                // Nếu thêm dữ liệu thành công, quay lại màn hình trước đó
                Alert.alert('Thông báo', data.message);
                hienThiLaiDanhSach();
                navigation.goBack();
              } else {
                console.error('Failed to add data:', data.message);
              }
            } catch (error) {
              console.error('Error adding data:', error);
            }
  };

  const chonChuKyDongVat = (chuky) => {
        setMaChuKy(chuky.maCK);
        setChonChuKy(chuky);
  };

  const [chonChuKy, setChonChuKy] = React.useState('');

  const [giaThiTruong, setGiaThiTruong] = React.useState('0');
  const [donVi, setDonVi] = React.useState('kg');

  const [maThuHoach, setMaThuHoach] = React.useState('0');
  const [maChuKy, setMaChuKy] = React.useState('');
  const [soLuong, setSoLuong] = React.useState('0');
  const [khoiLuong, setKhoiLuong] = React.useState('0');
  const [thietHai, setThietHai] = React.useState('0');



  const DuLieuKhi = ({ items }) => (
    <View style={styles.main_2_1}>
      <View style={styles.khungTrong}>
        <View>
          <Text style={styles.thongTin}>Thông tin động vật</Text>
          <Text style={styles.maDV}>Mã động vật: {items.maDongVat}</Text>
        </View>

        <View style={styles.chiaAnhVaThuocTinh}>
          <View style={styles.anh}>
            <Image
              style={styles.front}
              source={require('../../image/image_122.png')}
            />
          </View>

          <View style={styles.thuocTinh}>
            <Text style={styles.title}>Tên động vật: {items.tenDongVat}</Text>
            <Text style={styles.title}>Nơi sản xuất: {items.noiSanXuat}</Text>
            <Text style={styles.title}>
              Ngày nhập hàng: {items.ngayNhapHang}
            </Text>
            <Text style={styles.title}>Số lượng nuôi: {items.soLuongNuoi}</Text>
          </View>
        </View>
      </View>


    </View>
  );

  const DATA = [
    {
      maChuKy: 'CK01',
      maDongVat: 'K01',
      tenDongVat: 'Khỉ',
      noiSanXuat: 'khu CN',
      ngayNhapHang: '11/2/2024',
      soLuongNuoi: '20 con',
      maNhanVien: 'nv01',
      tenNhanVien: 'Nguyen Thi A',
      ngayBatDau: '12/11/2024',
      ngayKetThuc: '11/02/2025',
      anhDongVat: 'image_122.png',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.main_1}>
        <Text style={styles.thuhoach}>Mã thu hoạch: {maThuHoach}</Text>
      </View>

      <View style={styles.main_2}>
        <Text style={styles.chuky}>Mã chu kỳ:</Text>
        <View style={{flexDirection:'row',}}>
            <TextInput
              style={styles.input_maChuKy}
              placeholder="Mã chu kỳ"
              value={maChuKy}
              editable={false}
              onChangeText={setMaChuKy}
            />
           <TouchableOpacity
                style={{position: 'absolute',
                            right: 10,
                            top: 10,}}
                onPress={() =>
                navigation.navigate('Chọn chu kỳ', {
                chonChuKyDongVat : chonChuKyDongVat,
               })
            }>
             <Image
                  style={{height:30,width:30,}}
                  source={require('../../image/dv_ck.png')}
                  resizeMode="contain"></Image>
            </TouchableOpacity>
        </View>
      </View>

      <View style={{flexDirection:'row',marginLeft:10,justifyContent:'space-between'}}>
            <View style={styles.khungKLVaDV}>
          <Text style={styles.thietHaiVaSoLuong}>Tiền thiệt hại:</Text>
          <TextInput
            style={{height: 38,
                        marginTop: 5,
                        marginRight: 10,
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 8,
                        backgroundColor: 'white',}}
            placeholder=""
            value={thietHai}
            onChangeText={setThietHai}
          />
        </View>

           <View style={styles.khungKLVaDV}>
          <Text style={styles.thietHaiVaSoLuong}>Số lượng thu được:</Text>
          <TextInput
            style={{height: 38,
                        marginTop: 5,
                        marginRight: 10,
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 8,
                        backgroundColor: 'white',}}
            placeholder=""
            value={soLuong}
            onChangeText={setSoLuong}
          />
        </View>
      </View>

        <View style={{flexDirection:'row',marginLeft:10,justifyContent:'space-between'}}>
        <View style={styles.khungKLVaDV}>
          <Text style={styles.khoiLuongVaDonVi}>Khối lượng:</Text>
          <TextInput
            style={styles.khoiLuong}
            placeholder="Khối lượng"
            value={khoiLuong}
            onChangeText={setKhoiLuong}
          />
        </View>

        <View style={styles.khungKLVaDV}>
          <Text style={styles.khoiLuongVaDonVi}>Đơn vị:</Text>
          <TextInput
            style={styles.donVi}
            editable={false}
            placeholder="Đơn vị"
            value={donVi}
            onChangeText={setDonVi}
          />
        </View>
      </View>

      <View style={styles.main_2}>
              <Text style={styles.chuky}>Giá thị trường ({giaThiTruong=='' ? 0 : giaThiTruong}/1kg): </Text>
              <TextInput
                style={styles.input_maChuKy}
                placeholder="Giá thị trường"
                value={giaThiTruong}
                onChangeText={setGiaThiTruong}
              />
      </View>

      <View style={styles.main_4}>
        <View>
          <View style={{}}>
             <View style={styles.khungTrong}>
                  <View>
                        <Text style={styles.thongTin}>Thông tin động vật</Text>
                        <Text style={styles.maDV}>Mã động vật: {chonChuKy.maDV}</Text>
                  </View>

                  <View style={styles.chiaAnhVaThuocTinh}>
                       <View style={styles.anh}>
                          <Image
                           style={styles.front}
                           source={ chonChuKy.hinhDV ? {uri : chonChuKy.hinhDV} : require('../../image/dv_ck.png')}
                           />
                       </View>

                        <View style={styles.thuocTinh}>
                            <Text style={styles.title}>Tên động vật: {chonChuKy.tenDV}</Text>
                            <Text style={styles.title}>Nơi sản xuất: {chonChuKy.noiSanXuat}</Text>
                            <Text style={styles.title}>
                                Ngày nhập hàng: {chonChuKy.ngayNhapHang}
                            </Text>
                            <Text style={styles.title}>Số lượng nuôi: {chonChuKy.soLuongNuoi} con</Text>
                        </View>
                   </View>
             </View>
          </View>
        </View>
      </View>

      <View style={styles.nhanviencs}>
            <TouchableOpacity
               onPress={() =>
                navigation.navigate('ManHinhThongKe')
                }>
              <Text style={styles.tienDauTu}> Tiền đầu tư:  {parseFloat(chonChuKy.tienDauTu == null ? 0:chonChuKy.tienDauTu).toLocaleString('en-US')} VND</Text>
            </TouchableOpacity>

              <Text style={styles.tienNhapHang}>Tiền nhập hàng: {parseFloat(chonChuKy.tienNhapGiong == null ? 0:chonChuKy.tienNhapGiong).toLocaleString('en-US')} VND</Text>
              <Text style={styles.tienBan}>Tiền bán: {parseFloat(giaThiTruong*khoiLuong*soLuong).toLocaleString('en-US')}  VND</Text>

              <View style={styles.chiaNV}>
                <Text style={styles.nhanvien}>Nhân viên: </Text>
                <Text style={styles.nhanvien}>Mã: {chonChuKy.tenDangNhap} - </Text>
                <Text style={styles.nhanvien}>Tên: {chonChuKy.tenDangNhap}</Text>
              </View>
              <View style={styles.chiaNV}>
                <Text style={styles.nhanvien}>Ngày BĐ: {chonChuKy.ngayBatDau}</Text>
                <Text style={styles.nhanvien}> - </Text>
                <Text style={styles.nhanvien}>Ngày KT: {chonChuKy.ngayKetThuc}</Text>
              </View>
            </View>

      <View style={styles.chiaHaiNut}>


        <View style={styles.chiaLuu}>
          <TouchableOpacity
            style={styles.nutChuyenTrang}
            onPress={handleSave}>
            <View style={styles.nutChuyenTrang1}>
              <View>
                <Text style={styles.textNutChuyenTrang}>Lưu thu hoạch</Text>
              </View>
              <View>
                <Image
                  style={styles.hinhLuu}
                  source={require('../../image/hinhLuu.png')}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF8F0',
  },
  header_Dau: {
    backgroundColor: '#66CC66',
    padding: 9,
    paddingTop: 13,
    flexDirection: 'row',
    justifyContent: 'left',
  },
  back: {
    width: 30,
    height: 30,
  },
  qlThuHoach: {
    margin: 2,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 60,
  },

  main_1: {
    marginBottom: 2,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 7,
  },
  thuhoach: {
    marginTop: 2,
    fontSize: 15,
    color: 'black',
  },

  main_2: {
    marginLeft: 10,
    marginRight: 10,
  },
  chuky: {
    marginTop: 2,
    fontSize: 15,
    color: 'black',
  },
  input_maChuKy: {
      width:'100%',
      height: 38,
      marginTop: 5,
      marginRight: 10,
      borderWidth: 1,
      padding: 10,
      borderRadius: 8,
      backgroundColor: 'white',
  },
  maChuKy: {
    marginTop: 7,
    marginRight: 10,
  },

  main_3: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  thietHaiVaSoLuong: {
    marginTop: 2,
    fontSize: 15,
    color: 'black',
  },
  khungTHVaSL: {

  },
  thietHai: {
    height: 38,
    marginTop: 5,
    marginRight: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  soLuong: {
    height: 38,
    marginTop: 5,
    marginRight: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  },

  main_4: {

    marginLeft:5,

  },
  thongTin: {
    fontSize: 12,
    color: 'black',
    marginStart: 10,
    marginTop: 5,
  },
  maDV: {
    fontSize: 12,
    color: 'black',
    marginLeft:14,
    marginTop: 4,
  },
  chiaAnhVaThuocTinh: {
    flexDirection: 'row',
    margin: 8,
    marginTop: 3,
  },
  anh: {},
  thuocTinh: {},
  title: {
    fontSize: 12,
    color: 'black',
    marginLeft: 20,
  },
  front: {
    width: 100,
    height: 70,
  },
  chiaNV: {
    flexDirection: 'row',
  },
  main_2_1: {
    flex: 1,
    margin: 5,
    marginRight:10,
    marginTop:10,
    borderWidth:0.5,
    padding:10,
    borderRadius:3,
  },
  khungTrong: {
    marginTop:10,
    marginLeft:5,
    marginRight:10,
    backgroundColor: 'white',
    borderRadius:3,
    borderWidth:0.5,
  },
  nhanviencs: {
    marginLeft:15,
    marginTop: 2,
  },
  nhanvien: {
    fontSize: 12,
    color: 'black',
    marginTop: 2,
  },
  tienChoAn: {
    fontSize: 12,
    color: 'red',
    marginTop: 2,
    fontWeight: 'bold',
    //fontStyle: 'unlined'
  },
  tienDauTu: {
    fontSize: 12,
    color: 'black',
    marginTop: 2,
    fontWeight: 'bold',
  },
  tienLoi: {
    fontSize: 12,
    color: 'black',
    marginTop: 2,
  },
  tienBan: {
    fontSize: 12,
    color: 'black',
    marginTop: 2,
  },
  tienNhapHang: {
    fontSize: 12,
    color: 'black',
    marginTop: 2,
  },

  nutChuyenTrang: {


  },
  nutChuyenTrang1: {
    flexDirection: 'row',
    textAlign:'center',
    alignItems:'center',

  },
  textNutChuyenTrang: {
    color: 'black',
    textAlign: 'center',
  },
  hinhLuu: {
    width: 19,
    height: 19,
    marginLeft: 8,
  },
  chiaLuu: {
    textAlign:'center',
    borderWidth:0.5,
    borderRadius:3,
    paddingTop:7,
    paddingBottom:7,
    marginRight:5,
    marginLeft:5,
    backgroundColor: '#E5EEDF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chiaHaiNut: {
  marginTop:10,
  marginRight:5,
  marginLeft:5,
  flexDirection: 'row',
  },

  main_5: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  khungKLVaDV: {
    flex: 1,
  },
  khoiLuong: {
    height: 38,
    marginTop: 5,
    marginRight: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  donVi: {
    height: 38,
    marginTop: 5,
    marginRight: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  khoiLuongVaDonVi: {
    marginTop: 2,
    fontSize: 15,
    color: 'black',
  },
});
