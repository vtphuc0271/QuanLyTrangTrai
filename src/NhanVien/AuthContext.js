import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import NhanVien from './NhanVien.tsx';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [itemUser, setItemUser] = useState(null);
    const [danhSachNhanVien, setDanhSachNhanVien] = useState([]);

    const login = (user) => {
        setUser(user);
    };
    const logout = () => {
        setUser(null);
    };
    const getDanhSachNhanVien = (search = '') => {
        getAPI(search);
        return danhSachNhanVien;
    };

    const getAPI = (search = '') => {
        fetch(`http://192.168.24.1/API_QuanLyNongTrai/APINhanVien/getData.php?search=${search}`)
        .then(response => response.json())
        .then(data => setDanhSachNhanVien(data))
        .catch(err => console.log(err));
    };

    const themNhanVien = async (nhanVien) => {
            try {
                const response = await fetch('http://192.168.24.1/API_QuanLyNongTrai/APINhanVien/addData.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(nhanVien),
                });
                if (response.ok) {
                    const newNhanVien = await response.json();
                    getAPI();
                    return true;
                } else {
                    Alert.alert('Lỗi context', 'Không thể thêm nhân viên. Vui lòng thử lại.', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
                    return false;
                }
            } catch (error) {
                Alert.alert('Lỗi', 'Đã xảy ra lỗi khi kết nối tới server.', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
                return false;
            }
    };

    const dangNhap = (tenDangNhap, pass) => {
        getAPI();
        const nhanVien = danhSachNhanVien.find(nv => nv.tenDangNhap === tenDangNhap);
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
    };

    const xoaNhanVien = async (tenDangNhap) => {
        try {
            const response = await fetch('http://192.168.24.1/API_QuanLyNongTrai/APINhanVien/delData.php', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Các headers khác nếu cần
                },
                body: JSON.stringify({ tenDangNhap: tenDangNhap }),
            });

            if (!response.ok) {
                throw new Error('Lỗi khi xóa nhân viên');
            }
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa nhân viên:', error);
            return false;
        }
    };


const suaNhanVien = async (thongTinMoi) => {
    try {
        // Gửi yêu cầu PUT đến API để cập nhật thông tin nhân viên
        const response = await fetch('http://192.168.24.1/API_QuanLyNongTrai/APINhanVien/editData.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(thongTinMoi)
        });

        // Kiểm tra xem phản hồi từ API có thành công không
        if (response.ok) {
            return true; // Trả về true nếu cập nhật thành công
        } else {
            // Trả về false nếu có lỗi trong quá trình cập nhật
            console.error('Error updating employee:', response.statusText);
            return false;
        }
    } catch (error) {
        // Xử lý lỗi nếu có lỗi trong quá trình gửi yêu cầu
        console.error('Error updating employee:', error.message);
        return false;
    }
};



    return (
        <AuthContext.Provider value={{getAPI,user, login, logout, themNhanVien, getDanhSachNhanVien, dangNhap ,xoaNhanVien, suaNhanVien}}>
            {children}
        </AuthContext.Provider>
    );
};
