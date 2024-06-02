import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqdiE5JMT0U3evsc5-5Bmvg1ahf6TWoUUvWQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT099VKUszc4VaSvHJkWBnqRiJVYDHQJ-EZ4g&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZcWB3UQ3QsejFmja276RL_GeliapFWOiIuA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0OpTy6CnJGo0JmqjCxSJCflJnjHHaSeNetQ&s"
];

export default function TrangChu({ navigation }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [maTK, setMaTK] = useState("1");


  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); // Thay đổi hình ảnh sau mỗi 2 giây

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.txt_ChucNang}>Chức năng</Text>
      <View style={styles.view_full_chucnang}>
        <View style={styles.view_chucnang}>
          <TouchableOpacity>
            <Image
              style={styles.img_chucnang}
              source={require('../../image/dongvat_trangchu.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.txt_btnChuNang}>Động vật</Text>
        </View>

        <View style={styles.view_chucnang}>
          <TouchableOpacity  onPress={() => navigation.navigate('Danh sách chu kỳ')}>
            <Image
              style={styles.img_chucnang}
              source={require('../../image/chuky_trangchu.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.txt_btnChuNang}>Chu kỳ</Text>
        </View>

        <View style={styles.view_chucnang}>
          <TouchableOpacity style={styles.btn}>
            <Image
              style={styles.img_chucnang}
              source={require('../../image/nhanvien_trangchu.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.txt_btnChuNang}>Nhân viên</Text>
        </View>

        <View style={styles.view_chucnang}>
          <TouchableOpacity onPress={() => navigation.navigate('Màn hình danh sách thu hoạch')}>
            <Image
              style={styles.img_chucnang}
              source={require('../../image/thuhoach_trangchu.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.txt_btnChuNang}>Thu hoạch</Text>
        </View>
      </View>

      <View style={styles.view_full_chucnang}>
        <View style={styles.view_chucnang}>
          <TouchableOpacity onPress={() => navigation.navigate('Thông tin tài khoản',{maTK:maTK,})}>
            <Image
              style={styles.img_chucnang}
              source={require('../../image/taikhoan_trangchu.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.txt_btnChuNang}>Tài khoản</Text>
        </View>
      </View>

      <Text style={styles.txt_ChucNang}>Giới thiệu</Text>

      <View style={styles.view_gioithieu}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Image
              style={styles.img_gioithieu}
              source={{ uri: images[imageIndex] }}
            />
            <Text style={styles.text_gioithieu}>Cây phát triển nhanh</Text>
          </View>

          <View>
            <Image
              style={styles.img_gioithieu}
              source={{ uri: images[(imageIndex + 1) % images.length] }}
            />
            <Text style={styles.text_gioithieu}>Vật nuôi khỏe mạnh</Text>
          </View>
        </View>
      </View>

      <View style={styles.view_gioithieu}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Image
              style={styles.img_gioithieu}
              source={{ uri: images[(imageIndex + 2) % images.length] }}
            />
            <Text style={styles.text_gioithieu}>Nắm bắt được thời gian</Text>
          </View>

          <View>
            <Image
              style={styles.img_gioithieu}
              source={{ uri: images[(imageIndex + 3) % images.length] }}
            />
            <Text style={styles.text_gioithieu}>Thu hoạch trên mong đợi</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  container:{
    height:'100%',
    paddingLeft:15,
    paddingRight:10,
    paddingTop:10,
    backgroundColor: '#EDF9ED',
  },

  img_chucnang: {
    backgroundColor:'#FFF',
    height:80,
    width:80,
  },

  btn: {

  },

  view_full_chucnang: {
     marginBottom:10,
     width:'100%',
     justifyContent: 'space-between',
     flexDirection: 'row',
     textAlign: 'center',
     alignItems: 'center',
  },

  view_chucnang: {
    borderRadius:3,
    backgroundColor:'#FFF',
    padding:10,
    borderColor: 'black',
    borderWidth: 0.5,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },

  txt_ChucNang: {
    marginTop:10,
    marginBottom:10,
    fontWeight:'bold',
    fontSize: 15,
    color: 'black',
  },

  txt_btnChuNang: {
      fontSize: 10,
      color: 'black',
    },

  img_gioithieu: {
     borderRadius:10,
     backgroundColor:'#FFF',
     height:120,
     width:220,
   },

   view_gioithieu: {
        marginBottom:10,

   },

   text_gioithieu: {
        marginTop:5,
        color:'#103C1F',
        alignItems: 'center',
        textAlign:'center',
   },
});


