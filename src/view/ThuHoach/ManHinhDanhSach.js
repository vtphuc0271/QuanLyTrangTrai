import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
  
} from 'react-native';

export default function ManHinhDanhSach({ navigation }) {
  const [serachText, setSerachText] = React.useState('');
  const [data, setData] = React.useState([]);

  const getAPI = (search = '') => {
      fetch(`http://192.168.24.1/API_QuanLyNongTrai/ThuHoach/getData.php?search=${search}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
  };



  useEffect(() => {
          getAPI();
  },[]);
  console.log(data)


  const hienThiLaiDanhSach = () => {
    setSerachText('');
    getAPI();
  };

  const handleSearch = (text) => {
      setSerachText(text);
      getAPI(text);
  };


  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Màn hình sửa thu hoạch', {
          newItem: item,
          hienThiLaiDanhSach:hienThiLaiDanhSach,
        })
      }>
      <View style={styles.main_2_1}>
        <View style={styles.khungTrong}>
          <View style={styles.chiaAnhVaThuocTinh}>
            <View style={styles.anh}>
              <Image
                style={styles.front}
                source={{uri : item.hinhDV}}
              />
            </View>

            <View style={styles.thuocTinh}>
              <Text style={styles.title}>Mã thu hoạch: {item.maThuHoach}</Text>
              <Text style={styles.title}>Tên động vật: {item.tenDV}</Text>
              <Text style={styles.title}>
                Số lượng thu được: {item.soLuongNuoi} {item.donVi}
              </Text>
              <Text style={styles.title}>Tiền thiệt hại: {item.tienThietHai} VND</Text>
            </View>
          </View>

          <View style={styles.chiaNgay}>
            <Text style={styles.ngay}>Ngày BĐ: {item.ngayBatDau}</Text>
            <Text style={styles.ngay}>Ngày KT: {item.ngayKetThuc}</Text>
          </View>
        </View>

      </View>
      <TouchableOpacity style={{width:'100%',textAlign:'center'
              ,alignItems:'center', backgroundColor:'#067E2F'
              , marginTop:7,marginBottom:7,padding:4
              }}
      onPress={() =>
              navigation.navigate('Màn hình thống kê tiền thu hoạch', {
                newItem: item,
              })
      }
      >
                  <Text style={{fontSize:13,color:'white',}}>Thống kê chi tiết tiền thu hoạch</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <View></View>

      <View style={styles.main_1}>
        <Text style={styles.qlNho}>Danh sách thu hoạch:</Text>

        <TextInput style={styles.search}
        value={serachText}
        onChangeText={handleSearch} placeholder="Tìm kiếm" />

      </View>

      <View style={styles.main_2}>
        <View style={styles.khung}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.maThuHoach.toString()}
          />
        </View>
      </View>

      <View style={styles.chiaLuu}>
        <TouchableOpacity
          style={styles.nutChuyenTrang}
          onPress={() =>
            navigation.navigate('Màn hình thêm thu hoạch',{ hienThiLaiDanhSach:hienThiLaiDanhSach})
          }>
          <View>
            <Text style={styles.textNutChuyenTrang}>Thêm thu hoạch</Text>
          </View>
          <View>
            <Image
              style={styles.hinhLuu}
              source={require('../../image/hinhLuu.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    margin: 5,
    marginBottom: 1,
  },
  qlNho: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  search: {
    height: 40,
    marginTop: 10,
    marginRight: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },

  main_2: {
    flex: 1,
    margin: 10,
    marginTop: StatusBar.currentHeight || 0,
  },
  chiaAnhVaThuocTinh: {
    flexDirection: 'row',
    margin: 8,
  },
  anh: {},
  thuocTinh: {},
  title: {
    fontSize: 12,
    color: 'black',
    marginLeft: 20,
  },
  front: {
    width: 70,
    height: 70,
  },
  khung: {
    height: 520,
    marginTop: 15,
    marginRight: 1,
    borderWidth: 1,
    backgroundColor: '#C1FFC1',
  },
  chiaNgay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ngay: {
    fontSize: 11,
    color: 'black',
    marginLeft: 9,
    marginRight: 10,
  },
  main_2_1: {
    marginRight:10,
    marginTop:10,
    marginLeft:10,
    paddingBottom:10,
    borderWidth: 1,
    backgroundColor: '#D6FDE3',
  },
  khungTrong: {
  },

  nutChuyenTrang: {
    height: 27,
    borderWidth: 1,
    backgroundColor: '#E5EEDF',
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 3,
    flexDirection: 'row',
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
});
