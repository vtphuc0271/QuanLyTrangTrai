import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const ChangePasswordScreen = ({route, navigation }) => {
  const { data,hienThiLaiDuLieu } = route.params;
   const [maNV, setMaNV] = useState(data.tenDangNhap);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [hardCodedOldPassword, setHardCodedOldPassword] = useState(data.pass);

  const kiemTraMatKhau = () => {
    if (oldPassword == '') {
      Alert.alert('Error', 'Vui lòng điền vào mật khẩu cũ');
      return false;
    }


    if (oldPassword !== hardCodedOldPassword) {
      Alert.alert('Error', 'Mật khẩu cũ không đúng');
      return false;
    }
    if (newPassword == '') {
          Alert.alert('Error', 'Mật khẩu mới không được để trống !');
          return false;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'Mật khẩu mới không khớp');
      return false;
    }
    return true;
    // Thực hiện hành động đổi mật khẩu ở đây, ví dụ như gọi API
    // Giả sử đổi mật khẩu thành công

  };

  const handleChangePassword = () => {
    if(kiemTraMatKhau() == true){
        handleSave();

    }
  };

  const handleSave = async () => {
    try {
        const response = await fetch('http://192.168.24.1/API_QuanLyNongTrai/CaiDatThongTin/editPass.php', {
          method: 'PUT', // Sử dụng phương thức PUT cho yêu cầu chỉnh sửa
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

           maNV: maNV,
                   password: newPassword,
          }),
        });

        const data = await response.json();
        console.log(data); // Xử lý phản hồi từ file PHP tại đây

        if (data.success) {
          // Nếu chỉnh sửa dữ liệu thành công, cập nhật giao diện hoặc thực hiện các thao tác khác
         Alert.alert('Success',data.message);
          hienThiLaiDuLieu();
          navigation.goBack();

        } else {
          console.error('Failed to edit data:', data.message);
        }
      } catch (error) {
        console.error('Error editing data:', error);
      }
  };


  return (
    <View style={styles.container}>
        <Text style={styles.label}>Mã nhân viên: {maNV}</Text>
      <Text style={styles.label}>Nhập mật khẩu cũ</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
      />
      <Text style={styles.label}>Nhập mật khẩu mới</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Text style={styles.label}>Nhập lại mật khẩu mới</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
      />
      <Button title="Đổi mật khẩu" onPress={handleChangePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F3FFF3',
  },
  label: {
    color:'black',
    marginTop: 10,
    fontSize: 15,
    marginBottom: 10,
  },
  input: {
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    marginBottom: 20,
  },
});

export default ChangePasswordScreen;
