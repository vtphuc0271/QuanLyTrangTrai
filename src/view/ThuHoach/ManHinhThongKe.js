import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function ManHinhThongKe({ route, navigation }) {
  const { newItem } = route.params;



  const [maThuHoach, setMaThuHoach] = React.useState(newItem.maThuHoach);
  const [maChuKy, setMaChuKy] = React.useState(newItem.maChuKy);
  const [tenDongVat, setTenDongVat] = React.useState('Khi');
  const [soLuong, setSoLuong] = React.useState("newItem.soLuong");
  const [thietHai, setThietHai] = React.useState("newItem.thietHai");
  const [anhDongVat, setAnhDongVat] = React.useState('image_122.png');
  const [ngayBatDau, setNgayBatDau] = React.useState('12/11/2024');
  const [ngayKetThuc, setNgayKetThuc] = React.useState('11/02/2025');

  const [data, setData] = useState([]);
  const [maxTienChoAn, setMaxTienChoAn] = useState(0);
  const [tongTienChoAn, setTongTienChoAn] = useState(0);
  const [loading, setLoading] = useState(true);

  const [maxCacLoaiTien, setMaxCacLoaiTien] = React.useState(0);
  const [tienDauTuConDu, setTienDauTuConDu] = React.useState(0);
  const [tienBan, setTienBan] = React.useState(0);

  const getAPI = (search = '') => {
      fetch(`http://192.168.24.1/API_QuanLyNongTrai/ChuKy/getDataLichChamNuoi.php?search=${search}`)
        .then(response => response.json())
        .then(data => {
          setData(data);
          // Calculate the maximum feeding cost
          const maxCost = data.reduce((max, item) => {
            return parseFloat(item.tienDoAn) > parseFloat(max) ? parseFloat(item.tienDoAn) : parseFloat(max);
          }, 0);
          setMaxTienChoAn(maxCost);

          // Calculate the total feeding cost
          const totalCost = data.reduce((sum, item) => {
            return parseFloat(sum) + parseFloat(item.tienDoAn);
          }, 0);
          setTongTienChoAn(totalCost);
          setTienBan(parseFloat(newItem.soLuongBan) * parseFloat(newItem.khoiLuong) * parseFloat(newItem.giaThiTruong));
          setTienDauTuConDu(parseFloat(newItem.tienDauTu) - parseFloat(totalCost) - parseFloat(newItem.tienNhapGiong) - parseFloat(newItem.tienThietHai) );

          setMaxCacLoaiTien(parseFloat(totalCost) + parseFloat(newItem.tienThietHai)
          + parseFloat(newItem.tienNhapGiong) + parseFloat(newItem.tienDauTu)
          + parseFloat(tienDauTuConDu) + parseFloat(tienBan));

          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    };

    useEffect(() => {
        getAPI(newItem.maCK);
    });


  return (

    <SafeAreaView style={styles.container}>
      <Text style={styles.thongSo}>Thong tin chu ky</Text>

      <View style={styles.main_1}>
       <View style={styles.chiaDoi}>
        <View>
         <Image
              style={styles.hinhLuu}
              source={{ uri : newItem.hinhDV}}
            />
        </View>
        <View style={styles.thuocTinh}>
         <Text style={styles.thuocTinh1}>Ma thu hoach: {newItem.maThuHoach}</Text>
         <Text style={styles.thuocTinh1}>Ten dong vat: {newItem.tenDV}</Text>
         <Text style={styles.thuocTinh1}>So luong chan nuoi: {newItem.soLuongNuoi} con</Text>
        </View>
       </View>

       <View style={styles.chiaDoi2}>
          <Text style={styles.thuocTinh1}>Ngay bat dau: {newItem.ngayBatDau}</Text>
          <Text style={styles.thuocTinh1}> - </Text>
          <Text style={styles.thuocTinh1}>Ngay ket thuc: {newItem.ngayKetThuc}</Text>
       </View>

       <View style={styles.chiaDoi2}>
          <Text style={styles.thuocTinh1}>Nhan vien:  </Text>
          <Text style={styles.thuocTinh1}>Ma:  {newItem.tenDangNhap}</Text>
          <Text style={styles.thuocTinh1}> - </Text>
          <Text style={styles.thuocTinh1}>Ten:  {newItem.tenDangNhap}</Text>
       </View>
          <Text style={styles.thuocTinh1}>Ma chu ky:  {newItem.maCK}</Text>
      </View>

      <Text style={styles.thongSo}>Thong so thong ke</Text>
      <Text style={{marginLeft:10,color:'black',fontSize:13,marginTop:5,}}>Tổng tất cả các loại tiền: {parseFloat(maxCacLoaiTien).toLocaleString('en-US')} VND</Text>
      <View style={styles.main_2}>
          <Text style={styles.chuThich}>Chu thich:</Text>

          <View style={styles.chia2_2}>
           <View style={styles.chiaDoiCotTienChoAn}>
             <Text style={styles.cotTienAn}></Text>
             <View style={styles.nho}>
              <Text style={styles.thuocTinh2}>Tổng tiền cho ăn</Text>
              <Text style={styles.thuocTinh2}>({parseFloat(tongTienChoAn).toLocaleString('en-US')} VND)</Text>
             </View>
           </View>
      
           <View style={styles.chiaDoiCotTienThietHai}>
             <Text style={styles.cotTienThietHai}></Text>
             <View style={styles.nho}>
              <Text style={styles.thuocTinh2}>Tiền thiệt hại</Text>
              <Text style={styles.thuocTinh2}>({parseFloat(newItem.tienThietHai).toLocaleString('en-US')} VND)</Text>
             </View>
           </View>
          </View>

          <View style={styles.chia2_2}>
           <View style={styles.chiaDoiCotTienChoAn}>
             <Text style={styles.cotTienBan}></Text>
             <View style={styles.nho}>
              <Text style={styles.thuocTinh2}>Tiền bán</Text>
              <Text style={styles.thuocTinh2}>({parseFloat(tienBan).toLocaleString('en-US')} VND)</Text>
             </View>
           </View>
      
           <View style={styles.chiaDoiCotTienThietHai}>
             <Text style={styles.cotTienNG}></Text>
             <View style={styles.nho}>
              <Text style={styles.thuocTinh2}>Tiền nhập giống</Text>
              <Text style={styles.thuocTinh2}>({parseFloat(newItem.tienNhapGiong).toLocaleString('en-US')} VND)</Text>
             </View>
           </View>
          </View>

          <View style={styles.chia2_2}> 
           <View style={styles.chiaDoiCotTienChoAn}>
             <Text style={styles.cotVonDT}></Text>
             <View style={styles.nho}>
              <Text style={styles.thuocTinh2}>Tiền đầu tư</Text>
              <Text style={styles.thuocTinh2}>({parseFloat(newItem.tienDauTu).toLocaleString('en-US')} VND)</Text>
             </View>
           </View>
      
           <View style={styles.chiaDoiCotTienChoAn}>
             <Text style={styles.cotTienDu}></Text>
             <View style={styles.nho}>
              <Text style={styles.thuocTinh2}>Tiền đầu tư còn dư</Text>
              <Text style={styles.thuocTinh2}>({parseFloat(tienDauTuConDu).toLocaleString('en-US')} VND)</Text>
             </View>
           </View>
          </View>
          
      </View>

      <Text style={styles.thongSo}>So do thong ke:</Text>
      <View style={styles.main_3}>


         <View style={styles.chia3}>
           <Text style={styles.phanTram}>0%</Text>
           <Text style={styles.phanTram}>100%</Text>
         </View>

         <Image
              style={styles.soDo}
              source={require('../../image/sodo.png')}
            />

          <View style={styles.chiaSoDoCuoi}>

            <View style={{ ...styles.progressBar,width: `${(tongTienChoAn / maxCacLoaiTien) * 100}%`,
            backgroundColor: '#50C076',}}>

            </View>

            <View style={{ ...styles.progressBar,width: `${(newItem.tienThietHai / maxCacLoaiTien) * 100}%`,
            backgroundColor: '#14695F',}}>

            </View>

            <View style={{ ...styles.progressBar,width: `${(tienBan / maxCacLoaiTien) * 100}%`,
            backgroundColor: '#EA1111',}}>

            </View>

            <View style={{...styles.progressBar,width: `${(newItem.tienNhapGiong / maxCacLoaiTien) * 100}%`,
            backgroundColor: '#BF6666',}}>

            </View>

            <View style={{ ...styles.progressBar,width: `${(newItem.tienDauTu / maxCacLoaiTien) * 100}%`,
            backgroundColor: '#E5EEDF',}}>

            </View>

            <View style={{ ...styles.progressBar,width: `${(tienDauTuConDu / maxCacLoaiTien) * 100}%`,
            backgroundColor: '#8866BF',}}>

            </View>

          </View>
      </View>


      <View style={styles.main_2}>
                <Text style={styles.chuThich}>Chu thich:</Text>

                <View style={styles.chia2_2}>
                 <View style={styles.chiaDoiCotTienChoAn}>
                   <Text style={styles.cotTienAn}></Text>
                   <View style={styles.nho}>
                    <Text style={styles.thuocTinh2}>Tổng tiền cho ăn</Text>
                    <Text style={styles.thuocTinh2}>({parseFloat( (tongTienChoAn/maxCacLoaiTien)*100).toFixed(2) }%)</Text>
                   </View>
                 </View>

                 <View style={styles.chiaDoiCotTienThietHai}>
                   <Text style={styles.cotTienThietHai}></Text>
                   <View style={styles.nho}>
                    <Text style={styles.thuocTinh2}>Tiền thiệt hại</Text>
                    <Text style={styles.thuocTinh2}>({parseFloat( (newItem.tienThietHai/maxCacLoaiTien)*100).toFixed(2) }% )</Text>
                   </View>
                 </View>
                </View>

                <View style={styles.chia2_2}>
                 <View style={styles.chiaDoiCotTienChoAn}>
                   <Text style={styles.cotTienBan}></Text>
                   <View style={styles.nho}>
                    <Text style={styles.thuocTinh2}>Tiền bán</Text>
                    <Text style={styles.thuocTinh2}>({parseFloat((tienBan/maxCacLoaiTien)*100).toFixed(2) }%)</Text>
                   </View>
                 </View>

                 <View style={styles.chiaDoiCotTienThietHai}>
                   <Text style={styles.cotTienNG}></Text>
                   <View style={styles.nho}>
                    <Text style={styles.thuocTinh2}>Tiền nhập giống</Text>
                    <Text style={styles.thuocTinh2}>({parseFloat((newItem.tienNhapGiong/maxCacLoaiTien)*100).toFixed(2) }%)</Text>
                   </View>
                 </View>
                </View>

                <View style={styles.chia2_2}>
                 <View style={styles.chiaDoiCotTienChoAn}>
                   <Text style={styles.cotVonDT}></Text>
                   <View style={styles.nho}>
                    <Text style={styles.thuocTinh2}>Tiền đầu tư</Text>
                    <Text style={styles.thuocTinh2}>({parseFloat((newItem.tienDauTu/maxCacLoaiTien)*100).toFixed(2) }%)</Text>
                   </View>
                 </View>

                 <View style={styles.chiaDoiCotTienChoAn}>
                   <Text style={styles.cotTienDu}></Text>
                   <View style={styles.nho}>
                    <Text style={styles.thuocTinh2}>Tiền đầu tư còn dư</Text>
                    <Text style={styles.thuocTinh2}>({parseFloat((tienDauTuConDu/maxCacLoaiTien)*100).toFixed(2) }%)</Text>
                   </View>
                 </View>
                </View>

       </View>
    </SafeAreaView>



  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft:8,
    marginRight:8,
  },
  paragraph: {
    fontSize: 13,
    fontWeight: 'bold',
    margin: 10,
  },


  main_1: {
     marginLeft: 10,
  },
  hinhLuu: {
    marginTop:5,
    marginRight: 15,
    width: 100,
    height: 55,
    borderWidth:0.2,
    borderColor:'black',
  },
  chiaDoi: {
    flexDirection: 'row',
  },
  thuocTinh: {
    alignItems: 'cente',
  },
  thuocTinh1: {
    fontSize: 13,
    color:'black',
  },
  chiaDoi2: {
    flexDirection: 'row',
    marginTop: 3,
  },

  thongSo: {
    marginLeft: 10,
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 7,
    color:'black',
  },

  main_2: {
     marginLeft: 10,
     marginTop: 5,
  },
  chuThich: {
    fontSize: 12,
  },
  cotTienAn: {
    width: 35,
    height: 30,
    backgroundColor: '#50C076',
    marginTop: 5,
  },
  cotTienThietHai: {
    width: 35,
    height: 30,
    backgroundColor: '#14695F',
    marginTop: 5,
  },
  thuocTinh2: {
  color:'black',
   fontSize: 11,
  },
  chiaDoiCotTienChoAn: {
    flexDirection: 'row',
    width:'47%',
  },
  nho: {
    marginLeft: 7,
    marginTop: 4,
  },
  chia2: {
    flexDirection: 'row',
    marginTop: 10,
  },
  chiaDoiCotTienThietHai: {
    flexDirection: 'row',
  },
  chia2_1: {
    flexDirection: 'row',
    marginTop: 20,
  },
  chia2_2: {
    flexDirection: 'row',
    marginTop: 10,
  },
  cotTienBan: {
    width: 35,
    height: 30,
    backgroundColor: '#EA1111',
    marginTop: 5,
  },
  cotTienNG: {
    width: 35,
    height: 30,
    backgroundColor: '#BF6666',
    marginTop: 5,
  },
  cotVonDT: {
    width: 35,
    height: 30,
    backgroundColor: '#E5EEDF',
    marginTop: 5,
  },
  cotTienDu: {
    width: 35,
    height: 30,
    backgroundColor: '#8866BF',
    marginTop: 5,
  },

  main_3: {
     marginLeft: 10,
  },
  thongKe: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  chia3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  phanTram: {
    fontSize: 13,
    color:'black',
    fontWeight: 'bold',
  },
  soDo: {
    marginRight: 5,
    width: '100%',
    objectFit: 'cover'
  },
  chiaSoDoCuoi: {
    flexDirection: 'row',
    width:'100%',
    marginTop: 5,
    height:40,
    borderWidth:1,
  },
   cotTienAn1: {
      width: 35,
      backgroundColor: '#50C076',
    },
    cotTienThietHai1: {
      width: 35,
      backgroundColor: '#14695F',
    },

    cotTienBan1: {
        width: 35,
        backgroundColor: '#EA1111',
      },
      cotTienNG1: {
        width: 35,
        backgroundColor: '#BF6666',
      },
      cotVonDT1: {
        width: 35,
        backgroundColor: '#E5EEDF',
      },
      cotTienDu1: {
        width: 35,
        backgroundColor: '#8866BF',
      },
});


