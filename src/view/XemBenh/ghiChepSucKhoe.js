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

export default function GhiChepChuKy({ route, navigation }) {
  const ip ="192.168.24.1";
  const { item,hienThiLaiDuLieu } = route.params;
  const [thongBao, setThongBao] = useState('');
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const currentDateTime = `${date}/${month}/${year}`;
    return currentDateTime;
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const [ngayGhiChep, setNgayGhiChep] = React.useState(getCurrentDateTime());
  const [tienDA, setTienDA] = React.useState('0');
  const [luongDA, setLuongDA] = React.useState('0');
  const [DoAn_BS, setDoAn_BS] = React.useState('Chưa cho ăn');
  const [BS, setBS] = React.useState('');
  const [Nuoc_BS, setNuoc_BS] = React.useState('Chưa cho uống');

  const [DoAn_BTrua, setDoAn_BTrua] = React.useState('Chưa cho ăn');
  const [BT, setBT] = React.useState('');
  const [Nuoc_BTrua, setNuoc_BTrua] = React.useState('Chưa cho uống');

  const [DoAn_BToi, setDoAn_BToi] = React.useState('Chưa cho ăn');
  const [BToi, setBToi] = React.useState('');
  const [Nuoc_BToi, setNuoc_BToi] = React.useState('Chưa cho uống');

  const [maChuKy, setMaChuKy] = React.useState(item.maCK);

  const choAnBuaSang = () => {
    setDoAn_BS(BS + ' - Đã cho ăn');
  };

  const choUongNuocBuaSang = () => {
    setNuoc_BS('Đã uống nước');
  };

  const lamMoiBuaSang = () => {
    setDoAn_BS('Chưa cho ăn');
    setNuoc_BS('Chưa cho uống');
  };

  const choAnTrua = () => {
    setDoAn_BTrua(BT + ' - Đã cho ăn');
  };

  const choUongNuocBuaTrua = () => {
    setNuoc_BTrua('Đã uống nước');
  };

  const lamMoiBuaTrua = () => {
    setDoAn_BTrua('Chưa cho ăn');
    setNuoc_BTrua('Chưa cho uống');
  };

  const choAnToi = () => {
    setDoAn_BToi(BToi + ' - Đã cho ăn');
  };

  const choUongNuocBuaToi = () => {
    setNuoc_BToi('Đã uống nước');
  };

  const lamMoiBuaToi = () => {
    setDoAn_BToi('Chưa cho ăn');
    setNuoc_BToi('Chưa cho uống');
  };

  const [hanhDong, setHanhDong] = React.useState('');
  const handleYesNo = (hanhDongThucHien) => {
         setModalVisible(true);
         setHanhDong(hanhDongThucHien);

  };

    const handleYes = () => {
        // Thực hiện hành động khi chọn Yes
         if(hanhDong == 'them'){
              handleAdd();
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
              hienThiLaiDuLieu();
              navigation.goBack();
            }, 1000);
         };

  const handleAdd = async () => {
      try {
          const response = await fetch(`http://${ip}/API_QuanLyNongTrai/ChuKy/addDataLichGhiChep.php`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ngayChamSoc: ""+getCurrentDateTime(),
              tienDoAn: ""+tienDA,
              maChuKy: ""+item.maCK,
              thucan_buoisang: ""+DoAn_BS,
              nuoc_buoisang: ""+Nuoc_BS,
              thucan_buoitrua: ""+DoAn_BTrua,
              nuoc_buoitrua: ""+Nuoc_BTrua,
              thucan_buoitoi: ""+DoAn_BToi,
              nuoc_buoitoi: ""+Nuoc_BToi,
              khoiLuongAn: ""+luongDA,
            }),
          });

          const data = await response.json();
          console.log(data); // Xử lý phản hồi từ file PHP tại đây

          if (data.success) {
            // Nếu thêm dữ liệu thành công, quay lại màn hình trước đó

           showToast(data.message);
          } else {
            console.error('Failed to add data:', data.message);
          }
        } catch (error) {
          console.error('Error adding data:', error);
        }
    };

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
        <Text
          style={{
            marginLeft: 15,
            marginTop: 5,
            color: 'black',
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          Thông tin
        </Text>
        <View style={styles.nhapDuLieu}>
          <Text style={styles.tieude_tb}>Mã chu kỳ: {item.maCK}</Text>
          <Text style={styles.tieude_tb}>Bắt đầu: {item.ngayBatDau}</Text>
          {/* <TextInput style={styles.truongNhapDuLieu}></TextInput> */}
        </View>

        <View style={styles.nhapDuLieu}>
          <Text style={styles.tieude_tb}>Mã động vật: {item.maDV}</Text>
          <Text style={styles.tieude_tb}>Số lượng nuôi: {item.soLuong} con</Text>
          {/* <TextInput style={styles.truongNhapDuLieu}></TextInput> */}
        </View>

        {/*Thong tin dong vat */}
        <View style={styles.thongTinDV}>
          <Text style={styles.data_TT_DV}> Thông tin động vật</Text>

          <View style={styles.view_TT_DV}>
            <Image
              style={styles.img_TT_DV}
              source={{uri : item.hinh}}
              resizeMode="contain"></Image>
            <View>
              <Text style={styles.data_TT_DV}>
                {' '}
                Tên động vật: {item.tenDV}
              </Text>
              <Text style={styles.data_TT_DV}> Ngày nhận: {item.ngayNhan}</Text>
              <Text style={styles.data_TT_DV}> Loại động vật: {item.loaiDV}</Text>
              <Text style={styles.data_TT_DV}> Số lượng nuôi: {item.soLuongNuoi} con</Text>
            </View>
          </View>
        </View>
      </View>
      <Text
        style={{
          marginLeft: 15,
          color: 'black',
          fontWeight: 'bold',
          fontSize: 15,
        }}>
        Ngày chăm sóc: {getCurrentDateTime()}
      </Text>

        <View style={{flexDirection:'row',justifyContent:"space-between",marginRight:15,marginTop:5,}}>

           <View
            style={{
              width:'45%',
              marginLeft: 15,

            }}>
            <Text style={{color:'black',}}>Tiền cho ăn ({parseFloat(tienDA).toLocaleString('en-US')}VND):</Text>
            <TextInput
                style={{width:'auto',borderWidth:1,borderColor:'black',height:38,frontsize:15,paddingLeft:10,}}
                placeholder="Tiền cho ăn"
                value={tienDA}
                onChangeText={setTienDA}
                ></TextInput>
            </View>

            <View
            style={{
              width:'45%',
            }}>
            <Text style={{color:'black',}}>Lượng cho ăn ({luongDA}kg):</Text>
            <TextInput
                style={{width:'auto',borderWidth:1,borderColor:'black',height:38,frontsize:15,paddingLeft:10,}}
                placeholder="Lượng cho ăn"
                 value={luongDA}
                 onChangeText={setLuongDA}
                ></TextInput>
            </View>
        </View>

      {/*Buoi Sang */}
      <View>
        <Text
          style={{
            marginLeft: 15,
            marginTop: 10,
            color: 'black',
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          Buối sáng:
        </Text>
        <View style={styles.nhapDuLieu}>
          <TextInput
            style={styles.truongNhapDuLieu}
            placeholder="Đồ ăn chăm nuôi"
            value={BS}
            onChangeText={setBS}></TextInput>
          <View style={{ width: '47%' }}>
            <Text style={styles.tieude_tb}>Thức ăn : {DoAn_BS}</Text>
            <Text style={styles.tieude_tb}>Nước: {Nuoc_BS}</Text>
          </View>
        </View>

        <View style={styles.view_xoa_sua_CK_CN}>
          <View style={{ width: '30%', marginRight: '5%' }}>
            <TouchableOpacity style={styles.btn_CK_CN} onPress={choAnBuaSang}>
              <Text style={styles.txt_CK_CN}>Cho ăn</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: '30%', marginRight: '5%' }}>
            <TouchableOpacity
              style={styles.btn_CK_CN}
              onPress={choUongNuocBuaSang}>
              <Text style={styles.txt_CK_CN}>Cho uống nước</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: '30%' }}>
            <TouchableOpacity style={styles.btn_CK_CN} onPress={lamMoiBuaSang}>
              <Text style={styles.txt_CK_CN}>Làm mới</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/*Buoi Trưa */}
      <View>
        <Text
          style={{
            marginLeft: 15,
            marginTop: 10,
            color: 'black',
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          Buối trưa:
        </Text>
        <View style={styles.nhapDuLieu}>
          <TextInput
            style={styles.truongNhapDuLieu}
            placeholder="Đồ ăn chăm nuôi"
            value={BT}
            onChangeText={setBT}></TextInput>
          <View style={{ width: '47%' }}>
            <Text style={styles.tieude_tb}>Thức ăn: {DoAn_BTrua}</Text>
            <Text style={styles.tieude_tb}>Nước: {Nuoc_BTrua}</Text>
          </View>
        </View>

        <View style={styles.view_xoa_sua_CK_CN}>
          <View style={{ width: '30%', marginRight: '5%' }}>
            <TouchableOpacity style={styles.btn_CK_CN} onPress={choAnTrua}>
              <Text style={styles.txt_CK_CN}>Cho ăn</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: '30%', marginRight: '5%' }}>
            <TouchableOpacity
              style={styles.btn_CK_CN}
              onPress={choUongNuocBuaTrua}>
              <Text style={styles.txt_CK_CN}>Cho uống nước</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: '30%' }}>
            <TouchableOpacity style={styles.btn_CK_CN} onPress={lamMoiBuaTrua}>
              <Text style={styles.txt_CK_CN}>Làm mới</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/*Buoi Tối */}
      <View>
        <Text
          style={{
            marginLeft: 15,
            marginTop: 10,
            color: 'black',
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          Buối tối:
        </Text>
        <View style={styles.nhapDuLieu}>
          <TextInput
            style={styles.truongNhapDuLieu}
            placeholder="Đồ ăn chăm nuôi"
            value={BToi}
            onChangeText={setBToi}></TextInput>
          <View style={{ width: '47%' }}>
            <Text style={styles.tieude_tb}>Thức ăn: {DoAn_BToi}</Text>
            <Text style={styles.tieude_tb}>Nước: {Nuoc_BToi}</Text>
          </View>
        </View>

        <View style={styles.view_xoa_sua_CK_CN}>
          <View style={{ width: '30%', marginRight: '5%' }}>
            <TouchableOpacity style={styles.btn_CK_CN} onPress={choAnToi}>
              <Text style={styles.txt_CK_CN}>Cho ăn</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: '30%', marginRight: '5%' }}>
            <TouchableOpacity
              style={styles.btn_CK_CN}
              onPress={choUongNuocBuaToi}>
              <Text style={styles.txt_CK_CN}>Cho uống nước</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: '30%' }}>
            <TouchableOpacity style={styles.btn_CK_CN} onPress={lamMoiBuaToi}>
              <Text style={styles.txt_CK_CN}>Làm mới</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.view_xoa_sua}>
        <View style={{ width: '100%' }}>
          <TouchableOpacity
            style={styles.btn_ThemChuKyChanNuoi}
            onPress={()=>handleYesNo('them')}>
            <Text style={styles.txt_ChuKyChanNuoi}>Ghi lại </Text>
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
    marginTop: 7,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tieude_tb: {
    color: 'black',
    fontSize: 13,
    textAlign: 'right',
  },
  truongNhapDuLieu: {
    width: '47%',
    color: 'black',
    fontSize: 13,
    borderWidth: 1,
    height: 38,
    paddingLeft: 10,
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
   alignItems:'center',
   textAlign:'center',
    height: 55,
    width: 100,
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
  view_xoa_sua_CK_CN: {
    marginTop: 10,
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-around',
  },
  view_xoa_sua: {
    marginTop: 15,
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-around',
  },
  btn_CK_CN: {
    justifyContent: 'center',
    height: 35,
    backgroundColor: '#067E2F',
    borderColor: 'black',
    borderWidth: 0.5,
  },
  txt_CK_CN: {
    width: 'auto',
    fontSize: 13,
    color: 'white',
    textAlign: 'center',
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
