import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import Pet from './Pet.tsx';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const AddPet = async (VatNuoi) => {
        try {
            const response = await fetch('http://192.168.1.2/APIDongVat/addDongVat.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(VatNuoi),
            });
            if (response.ok) {
                const newNhanVien = await response.json();
                return true;
            } else {
                Alert.alert('Lỗi context', 'Không thể thêm động vật. Vui lòng thử lại.', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
                return false;
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi kết nối tới server.', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
            return false;
        }
    };

    const removePet = async (maDV) => {
        try {
            const response = await fetch('http://192.168.1.2/APIDongVat/delDongVat.php', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Các headers khác nếu cần
                },
                body: JSON.stringify({ maDV: maDV }),
            });

            if (!response.ok) {
                throw new Error('Lỗi khi xóa động vật');
            }
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa động vật:', error);
            return false;
        }
    };

    const updatePet = async (thongTinMoi) => {
        try {
            // Gửi yêu cầu PUT đến API để cập nhật thông tin nhân viên
            const response = await fetch('http://192.168.1.2/APIDongVat/editDongVat.php', {
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
        <AuthContext.Provider 
            value={{AddPet,removePet,updatePet}}>{children}
        </AuthContext.Provider>
    );
};