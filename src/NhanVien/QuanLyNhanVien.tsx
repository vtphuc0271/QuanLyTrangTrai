import { Alert } from 'react-native';
import NhanVien from './NhanVien.tsx';

export default class QuanLyNhanVien {
    constructor() {
        this.danhSachNhanVien = [];
        this.danhSachNhanVien.push(new NhanVien("","","admin1","123","08/07/2003","0353047452","tkias123456@gmail.com","admin"));
        this.danhSachNhanVien.push(new NhanVien("","","admin2","123","00/00/0000","0000000000","00000000000@gmail.com","admin"));
    }

    getDanhSachNhanVien() {
        return this.danhSachNhanVien;
    }

    dangKyNhanVien(nhanVien) {
        const existingNhanVien = this.danhSachNhanVien.find(nv => nv.tenDangNhap === nhanVien.tenDangNhap);
        if (existingNhanVien) {
            Alert.alert(
                'Lỗi',
                'Nhân viên đã tồn tại.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
            return false;
        }else{
            this.danhSachNhanVien.push(nhanVien);
            Alert.alert(
                'Thành công',
                'Đăng ký nhân viên thành công.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
            return true;
        }
    }

    dangNhap(tenDangNhap, pass) {
        const nhanVien = this.danhSachNhanVien.find(nv => nv.tenDangNhap === tenDangNhap);
        if (!nhanVien) {
            Alert.alert(
                'Lỗi',
                'Nhân viên không tồn tại.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
            return false;
        } else {
            if (nhanVien.pass === pass) {
                Alert.alert(
                    'Thành công',
                    'Đăng nhập thành công.',
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
                );
                return true;
            } else {
                Alert.alert(
                    'Lỗi',
                    'Sai mật khẩu.',
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
                );
                return false;
            }
        }
    }

}
