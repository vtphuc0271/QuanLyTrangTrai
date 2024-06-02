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

export default function XemGhiChep({ route, navigation }) {
  const { itemCK } = route.params;
  const ip ="192.168.24.1";
  const [data, setData] = React.useState([]);

  const getAPI = (search = '') => {
    fetch(`http://${ip}/API_QuanLyNongTrai/ChuKy/getDataLichChamNuoi.php?search=${search}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  };

   useEffect(() => {
          getAPI(itemCK.maCK);
      },[]);
   console.log(data)

  const hienThiLaiDuLieu = () => {
      getAPI(itemCK.maCK);
    };


  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Sửa ghi chép chu kỳ chăn nuôi', {
          item: item,
          hienThiLaiDuLieu:hienThiLaiDuLieu,
        })
      }>
      <View style={styles.item}>
        <View style={styles.Item_DS_ChuKy}>
            <Text style={styles.view_TieuDe_nghieng}>
              Ngày ghi chép: {item.ngayChamSoc}
            </Text>
            <Text style={styles.view_TieuDe_nghieng}>
             Tiền cho ăn: {(parseFloat(item.tienDoAn)*parseFloat(item.khoiLuongAn)).toLocaleString('en-US')} VND
            </Text>
        </View>
        <View style={styles.Item_DS_ChuKy}>
          <View>
            <Text style={styles.thongTin_Item_ChuKy}>Buổi sáng: </Text>
            <Text style={styles.thongTin_Item_ChuKy2}>{item.thucan_buoisang}</Text>
            <Text style={styles.thongTin_Item_ChuKy2}>{item.nuoc_buoisang} </Text>
          </View>

          <View>
            <Text style={styles.thongTin_Item_ChuKy}>Buổi sáng: </Text>
            <Text style={styles.thongTin_Item_ChuKy2}>{item.thucan_buoitrua}</Text>
            <Text style={styles.thongTin_Item_ChuKy2}>{item.nuoc_buoitrua} </Text>
          </View>
          <View>
            <Text style={styles.thongTin_Item_ChuKy}>Buổi sáng: </Text>
            <Text style={styles.thongTin_Item_ChuKy2}>{item.thucan_buoitoi}</Text>
            <Text style={styles.thongTin_Item_ChuKy2}>{item.nuoc_buoitoi} </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <Text style={styles.view_TieuDe}>Thông tin chu kỳ</Text>
      <View style={styles.view_TT_DV}>
        <Image
          style={styles.img_TT_DV}
          source={{ uri: itemCK.hinh }}
          resizeMode="contain"></Image>
        <View>
          <Text style={styles.data_TT_DV}> Mã chu kỳ: {itemCK.maCK}</Text>
          <Text style={styles.data_TT_DV}>
            {' '}
            Tên động vật: {itemCK.tenDV}
          </Text>
          <Text style={styles.data_TT_DV}>
            {' '}
            Số lượng giống: {itemCK.soLuongNuoi} con
          </Text>
        </View>
      </View>
      <Text style={styles.data_TT_DV}>
        Ngày bắt đầu: {itemCK.ngayBatDau} - Ngày kết thúc: {itemCK.ngayKetThuc}
      </Text>
      <Text style={styles.data_TT_DV}>
        Nhân viên: Mã: {itemCK.maNhanVien} - Tên tài khoản: {itemCK.tenDangNhap}
      </Text>

      <TouchableOpacity
        style={styles.btn_ThemChuKyChanNuoi}
        onPress={() =>
          navigation.navigate('Ghi chép chu kỳ chăn nuôi', {
            item: itemCK,
            hienThiLaiDuLieu : hienThiLaiDuLieu,
          })
        }>
        <Text style={styles.txt_ChuKyChanNuoi}>
          Ghi chép chu kỳ chăn nuôi hôm nay +
        </Text>
      </TouchableOpacity>
      <Text style={styles.view_TieuDe}>
        Danh sách ghi chép chu kỳ chăn nuôi
      </Text>
      <FlatList style ={{height:'60%',backgroundColor:'#FFF',paddingRight:10,}}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.maChamSoc.toString()}
      />
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

  btn_ThemChuKyChanNuoi: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    height: 35,
    backgroundColor: '#D9D9D9',
    marginLeft: 12,
    marginRight: 12,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  txt_ChuKyChanNuoi: {
    width: 'auto',
    fontSize: 13,
    color: 'black',

    textAlign: 'center',
  },

  img_TT_DV: {
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 3,
    height: 60,
    width: 85,
    marginLeft: 7,
  },
  data_TT_DV: {
    color: 'black',
    fontSize: 12,
    marginLeft: 10,
  },

  view_TT_DV: {
    marginTop: 5,
    flexDirection: 'row',
  },
  view_TieuDe: {
    marginLeft: 10,
    marginTop: 10,
    color: 'black',
    fontWeight: 'bold',
  },

  item: {
    marginTop: 10,
    marginLeft: 10,
  },
  title: {
    fontSize: 12,
  },

  view_TieuDe_nghieng: {
    marginTop: 10,
    color: 'black',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },

  Item_DS_ChuKy: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 1,
    color: 'black',
    fontWeight: 'bold',
  },
  thongTin_Item_ChuKy: {
    marginTop: 10,
    color: 'black',
    fontWeight: 'bold',
  },

  thongTin_Item_ChuKy2: {
    marginTop: 10,
    color: 'black',
  },
});


