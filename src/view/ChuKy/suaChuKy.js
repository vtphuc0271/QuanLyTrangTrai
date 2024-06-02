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
  Modal,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SuaChuKy({ route, navigation }) {

  const { newItem,hienThiLaiDuLieu } = route.params;

  const [tienDauTu, setTienDauTu] = React.useState(newItem.tienDauTu);
  const [tienNhapGiong, setTienNhapGiong] = React.useState(newItem.tienNhapGiong);
  const [maChuKy, setMaChuKy] = React.useState(newItem.maCK);
  const [soLuong, setSoLuong] = React.useState(newItem.soLuong);
  const [maDongVat, setMaDongVat] = React.useState(newItem.maDV);
  const [maNhanVien, setMaNhanVien] = React.useState(newItem.tenDangNhap);
  const [tenDongVat, setTenDongVat] = React.useState(newItem.tenDongVat);
  const [ngayBatDau, setNgayBatDau] = React.useState(newItem.ngayBatDau);
  const [ngayKetThuc, setNgayKetThuc] = React.useState(newItem.ngayKetThuc);
  const [hinh, setHinh] = React.useState(newItem.hinhDV);


  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [thongBao, setThongBao] = useState('');

  const [hanhDong, setHanhDong] = React.useState('');
    const handleYesNo = (hanhDongThucHien) => {
         setModalVisible(true);
         setHanhDong(hanhDongThucHien);

    };

    const handleYes = () => {
        // Thực hiện hành động khi chọn Yes
         if(hanhDong == 'sua'){
              handleEdit();
         }
         if(hanhDong == 'xoa'){
              handleDelete();
         }
        setModalVisible(false);
    };

    const handleNo = () => {
        // Thực hiện hành động khi chọn No

        setModalVisible(false);
    };


   const showToast = (thongBao) => {
         setThongBao(""+thongBao);
         setModalVisible2(true);
            // Tự động ẩn thông báo sau 2 giây
         setTimeout(() => {
              setModalVisible2(false);

              navigation.goBack();
              hienThiLaiDuLieu();
            }, 1000);
   };


  const handleDelete = async () => {
    try {
        const response = await fetch('http://192.168.24.1/API_QuanLyNongTrai/ChuKy/delData.php', {
          method: 'DELETE', // or 'POST' if DELETE is not supported
          headers: {
            'Content-Type': 'application/json',
          },
         body: JSON.stringify({
                 maCK: maChuKy,
         }),
        });

        const data = await response.json();
        console.log(data); // Xử lý phản hồi từ file PHP tại đây

        if (data.success) {
          // Nếu xóa dữ liệu thành công, cập nhật giao diện hoặc thực hiện các thao tác khác
          showToast(data.message);
        } else {
          console.error('Failed to delete data:', data.message);
        }
      } catch (error) {
        console.error('Error deleting data:', error);
      }
  };

  const handleEdit = async () => {
    try {
        const response = await fetch('http://192.168.24.1/API_QuanLyNongTrai/ChuKy/editData.php', {
          method: 'PUT', // Sử dụng phương thức PUT cho yêu cầu chỉnh sửa
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            maCK: maChuKy,
            tienDauTu: tienDauTu,
            soLuongNuoi: soLuong,
            tienNhapGiong: tienNhapGiong,
            maDV: maDongVat,
            ngayBatDau: ngayBatDau,
            ngayKetThuc: ngayKetThuc,
            maNhanVien: maNhanVien,
          }),
        });

        const data = await response.json();
        console.log(data); // Xử lý phản hồi từ file PHP tại đây

        if (data.success) {
          // Nếu chỉnh sửa dữ liệu thành công, cập nhật giao diện hoặc thực hiện các thao tác khác
          showToast(data.message);
        } else {
          console.error('Failed to edit data:', data.message);
        }
      } catch (error) {
        console.error('Error editing data:', error);
      }
  };

  const setPhanCongNhanVien = (newPhanCong) => {
    setMaNhanVien(newPhanCong);
  };

  const [chonDongVat, setChonDongVat] = React.useState(newItem);

  const setChonDongVatNuoi = (chonDongVat) => {
    setChonDongVat(chonDongVat);
    setMaDongVat(chonDongVat.maDV);
    setHinh(chonDongVat.hinhDV);
  };

  // Hiển thị thông tin chi tiết dựa trên itemId
  return (
    <SafeAreaView style={{ backgroundColor: '#EDF9ED' }}>
      {/*Header_Top */}
        <Modal
         transparent={true}
         visible={modalVisible}
         onRequestClose={() => setModalVisible(false)}
         animationType="fade"
         >
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Thông báo</Text>
                  <Text style={styles.modalMessage}>Bạn có muốn thực hiện hành động này không?</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleYes}>
                      <Text style={styles.buttonText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.noButton]} onPress={handleNo}>
                      <Text style={[styles.buttonText, styles.noButtonText]}>No</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
         </Modal>
    <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible2}
        onRequestClose={() => setModalVisible2(false)}
      >
        <View style={{ flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',}}>
          <View style={{
              borderWidth:0.5,
              borderColor:'black',
              width: 300,
              padding: 20,
              backgroundColor: '#fff',
              borderRadius: 10,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 10,
              elevation: 5,
          }}>
            <Text style={{
                fontSize: 20,
                color: '#000',
                marginBottom: 10,
                textAlign:'center',
            }}>{thongBao}</Text>
          </View>
        </View>
      </Modal>
      {/*Noi dung */}
      {/*Ma chu ky */}
      <View style={styles.noiDungC}>
        <View style={styles.nhapDuLieu}>
          <Text style={styles.tieude_tb}>Mã chu kỳ: {maChuKy}</Text>
          {/* <TextInput style={styles.truongNhapDuLieu}></TextInput> */}
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{width:'49%'}}>
                <View style={styles.nhapDuLieu}>
                   <Text style={styles.tieude_tb}>Tiền đầu tư</Text>
                   <TextInput
                      style={styles.truongNhapDuLieu}
                      value={tienDauTu}
                      onChangeText={setTienDauTu}></TextInput>
               </View>
            </View>
            <View style={{width:'49%'}}>
                <View style={styles.nhapDuLieu}>
                   <Text style={styles.tieude_tb}>Tiền nhập giống</Text>
                   <TextInput
                      style={styles.truongNhapDuLieu}
                      value={tienNhapGiong}
                      onChangeText={setTienNhapGiong}></TextInput>
                </View>
            </View>
        </View>

        <View style={styles.nhapDuLieu}>
          <Text style={styles.tieude_tb}>Số lượng nuôi</Text>
          <TextInput
            style={styles.truongNhapDuLieu}
            value={soLuong}
            editable={false}
            onChangeText={setSoLuong}></TextInput>
        </View>

        {/*Thong tin dong vat */}
        <View style={styles.thongTinDV}>
          <Text style={styles.data_TT_DV}> Thông tin động vật</Text>
          <View>
            <View style={styles.truongNhap_date}>
              <TextInput
                style={styles.truongNhapDuLieu}
                placeholder="Mã động vật"
                value={maDongVat}
                editable={false}
                onChangeText={setMaDongVat}></TextInput>
              <TouchableOpacity
                style={styles.btnDate}
                onPress={() =>
                  navigation.navigate('Chọn động vật', {
                    onChonDongVatNuoi: setChonDongVatNuoi,
                  })
                }>
                <Image
                  style={styles.img_date}
                  source={require('../../image/dv_ck.png')}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.view_TT_DV}>
            <Image
              style={styles.img_TT_DV}
              source={{ uri: chonDongVat.hinhDV }}
              resizeMode="contain"></Image>
            <View>
              <Text style={styles.data_TT_DV}>
                {' '}
                Tên động vật: {chonDongVat.tenDV}
              </Text>
              <Text style={styles.data_TT_DV}>
                {' '}
                Nguồn gốc: {chonDongVat.noiSanXuat}
              </Text>
              <Text style={styles.data_TT_DV}>
                {' '}
                Ngày nhập hàng: {chonDongVat.ngayNhapHang}
              </Text>
              <Text style={styles.data_TT_DV}>
                {' '}
                Số lượng giống: {chonDongVat.soLuong} con
              </Text>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.nhapDuLieu}>
            <Text style={styles.tieude_tb}>Ngày bắt đầu</Text>
            <View style={styles.truongNhap_date}>
              <TextInput
                style={styles.truongNhapDuLieu}
                value={ngayBatDau}
                onChangeText={setNgayBatDau}></TextInput>
              <TouchableOpacity style={styles.btnDate}>
                <Image
                  style={styles.img_date}
                  source={require('../../image/date_ck.png')}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.nhapDuLieu}>
            <Text style={styles.tieude_tb}>Ngày kết thúc</Text>
            <View style={styles.truongNhap_date}>
              <TextInput
                style={styles.truongNhapDuLieu}
                value={ngayKetThuc}
                onChangeText={setNgayKetThuc}></TextInput>
              <TouchableOpacity style={styles.btnDate}>
                <Image
                  style={styles.img_date}
                  source={require('../../image/date_ck.png')}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.nhapDuLieu}>
            <Text style={styles.tieude_tb}>Nhân viên(Phân công)</Text>
            <View style={styles.truongNhap_date}>
              <TextInput
                style={styles.truongNhapDuLieu}
                value={maNhanVien}
                editable={false}
                onChangeText={setMaNhanVien}></TextInput>
              <TouchableOpacity
                style={styles.btnDate}
                onPress={() =>
                  navigation.navigate('Phân công nhân viên', {
                    onPhanCongNhanVien: setPhanCongNhanVien,
                  })
                }>
                <Image
                  style={styles.img_date}
                  source={require('../../image/tk_ck.png')}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.view_xoa_sua}>
        <View style={{ width: '47%', marginRight: '6%' }}>
          <TouchableOpacity style={styles.btn_ThemChuKyChanNuoi}>
            <Text style={styles.txt_ChuKyChanNuoi} onPress={()=>handleYesNo('sua')}>
              Sửa chu kỳ chăn nuôi
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: '47%' }}>
          <TouchableOpacity style={styles.btn_ThemChuKyChanNuoi}>
            <Text style={styles.txt_ChuKyChanNuoi} onPress={()=>handleYesNo('xoa')}>
              Xóa chu kỳ chăn nuôi
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
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

  btnDate: {
    position: 'absolute',
    right: 25,
    top: 12,
  },

  img_date: {
    height: 30,
    width: 30,
  },
  truongNhap_date: {
    justifyContent: 'center',
  },
  noiDungC: {},
  nhapDuLieu: {
    marginTop: 15,
    marginLeft: 15,
  },
  tieude_tb: {
    color: 'black',
    fontSize: 15,
  },
  truongNhapDuLieu: {
    width: 'auto',
    color: 'black',
    fontSize: 13,
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    marginTop: 7,
    marginRight: 15,
    borderRadius: 3,
  },
  thongTinDV: {
    height: 'auto',
    borderColor: 'black',
    width: 'auto',

    borderWidth: 1,
    marginLeft: 15,
    marginTop: 15,
    marginRight: 15,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },

  img_TT_DV: {
    marginTop: 3,
    height: 80,
    width: 130,
    marginRight: 10,
  },
  data_TT_DV: {
    color: 'black',
    fontSize: 12,
  },

  view_TT_DV: {
    marginTop: 5,
    flexDirection: 'row',
  },
  view_xoa_sua: {
    marginTop: 30,
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-around',
  },
  btn_ThemChuKyChanNuoi: {
    justifyContent: 'center',
    height: 35,
    backgroundColor: '#D9D9D9',
    borderColor: 'black',
    borderWidth: 0.5,
  },
  txt_ChuKyChanNuoi: {
    width: 'auto',
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
  },

  modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      modalMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
      },
      noButton: {
        backgroundColor: '#ff4d4d',
      },
      noButtonText: {
        color: '#fff',
      },
});
