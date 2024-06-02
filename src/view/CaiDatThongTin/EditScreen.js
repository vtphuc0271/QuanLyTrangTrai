import React, {useState, useEffect} from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet,TouchableOpacity,Alert } from 'react-native';
import { NativeModules } from 'react-native';


const { ImagePickerManager } = NativeModules;

const EditScreen = ({ route, navigation }) => {
  const { data,hienThiLaiDuLieu } = route.params;
  const [image, setImage] = useState(data.avartaNV);
  const [maTK, setMaTK] = useState(data.tenDangNhap);
  const [tenTK, setTenTK] = useState(data.tenDangNhap);
  const [sdt, setSDT] = useState(data.sdt);
  const [email, setEmail] = useState(data.email);
  const [ngaySinh, setNgaySinh] = useState(data.ngaySinh);



  const handleSave = async () => {
    try {
        const response = await fetch('http://192.168.24.1/API_QuanLyNongTrai/CaiDatThongTin/editData.php', {
          method: 'PUT', // Sử dụng phương thức PUT cho yêu cầu chỉnh sửa
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            maNV: maTK,
                    tenTK: tenTK,
                    ngaySinh: ngaySinh,
                    soDienThoai: sdt,
                    email: email,
                    hinhNV: image,
          }),
        });

        const data = await response.json();
        console.log(data); // Xử lý phản hồi từ file PHP tại đây

        if (data.success) {
          // Nếu chỉnh sửa dữ liệu thành công, cập nhật giao diện hoặc thực hiện các thao tác khác
          console.log('Edit successful:', data.message);
          Alert.alert('Error', data.message);
          hienThiLaiDuLieu();
          navigation.goBack();

        } else {
          console.error('Failed to edit data:', data.message);
        }
      } catch (error) {
        console.error('Error editing data:', error);
      }
  };

  const pickImage = (hinh) => {
        setImage(hinh);
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chọn ảnh cài đặt thông tin',{pickImage:pickImage})}>
        <View style={styles.image}>
             {image ? (
               <Image
                style={styles.image2}
                 source={{ uri: image }}
                 style={styles.image2}
               />
             ) : (
               <Image
                style={styles.image2}
                 source={require('../../image/dv_ck.png')}
                 style={styles.image2}
               />
             )}

        </View>
        <Text style={{color:'black',alignItems:'center',textAlign:'center',marginBottom:10,}}>Chọn ảnh</Text>
    </TouchableOpacity>

      <Text style={styles.label}>Mã tài khoản: {maTK}</Text>
      <Text style={styles.label}>Tên tài khoản:</Text>
      <TextInput  editable={false} style={styles.input} value={tenTK} onChangeText={setTenTK} />
      <Text style={styles.label}>Số điện thoại:</Text>
      <TextInput style={styles.input} value={sdt} onChangeText={setSDT} />
      <Text style={styles.label}>Email:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text style={styles.label}>Ngày Sinh:</Text>
      <TextInput
        style={styles.input}
        value={ngaySinh}
        onChangeText={setNgaySinh}
      />


      <View style={styles.btn}>
            <TouchableOpacity style={styles.btn_xoa_sua} onPress={handleSave}>
             <Text style={{color:'black',}}>Sửa tài khoản</Text>
              </TouchableOpacity>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:10,
    flex: 1,
    backgroundColor: '#F3FFF3',
  },
  image: {
    height: 140,
    marginBottom: 10,
    width:'100%',
    alignItems: 'center',
  },

    image2: {
      marginBottom: 10,
      marginLeft: '30%',
      marginRight: '30%',
      width: 140,
      height: 140,
      alignItems: 'center',
      borderRadius: 80,
      borderWidth:0.5,
      borderColor:'black',

    },
  label: {
    fontSize: 15,
    color:'black',
    marginBottom: 10,
    marginLeft: '2%',
    marginRight: '2%',
  },
  input: {
    borderColor:'black',
    borderRadius: 4,
    borderWidth: 0.5,

    padding: 10,
    marginBottom: 10,
    marginLeft: '2%',
    marginRight: '2%',
  },
  btn:{
    marginTop: 5,
    alignItems:'center',
    padding: 10,
    justifyContent: 'center',


  },

  btn_xoa_sua: {
          backgroundColor:'#E5EEDF',
          padding:10,
          width:'100%',
          textAlign: 'center',
          alignItems: 'center',
          borderWidth:0.4,
          borderColor:'black',
          borderRadius:3,

     },
});

export default EditScreen;
