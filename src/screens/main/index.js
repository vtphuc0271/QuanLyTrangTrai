import React, { useState } from 'react';
import {
    View,
    Text,
} from 'react-native';
import LoginScreen from "../login"
import HomeScreen from "../home"
import EmployeeAddScreen from "../employeeadd"
import EmployeeListScreen from "../employeelist"
import EmployeeEditScreen from "../employeeedit"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from '../../NhanVien/AuthContext';

import dsChuKy from '../../view/ChuKy/dsChuKy';
import themChuKy from '../../view/ChuKy/themChuKy';
import phanCongNhanVien from '../../view/ChuKy/PhanCongNhanVien';
import chonDongVat from '../../view/ChuKy/chonDongVat';
import suaChuKy from '../../view/ChuKy/suaChuKy';
import xemGhiChep from '../../view/ChuKy/xemGhiChep';
import GhiChepChuKyChanNuoi from '../../view/ChuKy/ghiChepChuKyChanNuoi';
import SuaGhiChepChuKyChanNuoi from '../../view/ChuKy/SuaGhiChepChuKyChanNuoi';
import thongKeLichGhiChep from '../../view/ChuKy/thongKeLichGhiChep';

import TrangChu from '../../view/TrangChu/TrangChu';

import ThongTinTaiKhoan from '../../view/CaiDatThongTin/HomeScreen';
import EditScreen from '../../view/CaiDatThongTin/EditScreen';
import ChangePasswordScreen from '../../view/CaiDatThongTin/ChangePasswordScreen';
import ChonAnhCaiDatThongTin from '../../view/CaiDatThongTin/ChonAnhCaiDatThongTin'

import ManHinhDanhSachThuHoach from '../../view/ThuHoach/ManHinhDanhSach'
import ManHinhSuaThuHoach from '../../view/ThuHoach/ManHinhSua'
import ManHinhThemThuHoach from '../../view/ThuHoach/ManHinhThem'

import ChonChuKy from '../../view/ThuHoach/ChonChuKy'
import ManHinhThongKeTienThuHoach from '../../view/ThuHoach/ManHinhThongKe'


import PetListScreen from "../PetDetailScreen/index"
import AddPetScreen from "../AddPetScreen/index"
import PetDetailScreen from "../PetDetailScreen/index"

const Stack = createNativeStackNavigator();

const MainScreen = () => {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown:true,
                }}>

                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="EmployeeList" component={EmployeeListScreen} />
                    <Stack.Screen name="EmployeeAdd" component={EmployeeAddScreen} />
                    <Stack.Screen name="EmployeeEdit" component={EmployeeEditScreen} />

                    <Stack.Screen name="Thông tin tài khoản" component={ThongTinTaiKhoan} />
                    <Stack.Screen name="Sửa thông tin tài khoản" component={EditScreen} />
                    <Stack.Screen name="Đổi mật khẩu" component={ChangePasswordScreen} />
                    <Stack.Screen name="Chọn ảnh cài đặt thông tin" component={ChonAnhCaiDatThongTin} />

                    <Stack.Screen name="Danh sách chu kỳ" component={dsChuKy} />
                    <Stack.Screen name="Thêm chu kỳ" component={themChuKy} />
                    <Stack.Screen name="Sửa chu kỳ chăn nuôi" component={suaChuKy} />
                    <Stack.Screen name="Phân công nhân viên" component={phanCongNhanVien} />
                    <Stack.Screen name="Chọn động vật" component={chonDongVat} />

                    <Stack.Screen name="Xem ghi chép chăn nuôi" component={xemGhiChep} />
                    <Stack.Screen
                                   name="Ghi chép chu kỳ chăn nuôi"
                                   component={GhiChepChuKyChanNuoi}
                     />
                    <Stack.Screen
                                  name="Sửa ghi chép chu kỳ chăn nuôi"
                                  component={SuaGhiChepChuKyChanNuoi}
                    />
                     <Stack.Screen name="Thống kê lịch ghi chép chăn nuôi" component={thongKeLichGhiChep} />


                    <Stack.Screen name="Màn hình danh sách thu hoạch" component={ManHinhDanhSachThuHoach} />
                    <Stack.Screen name="Màn hình sửa thu hoạch" component={ManHinhSuaThuHoach} />
                    <Stack.Screen name="Màn hình thêm thu hoạch" component={ManHinhThemThuHoach} />

                    <Stack.Screen name="Chọn chu kỳ" component={ChonChuKy} />
                    <Stack.Screen name="Màn hình thống kê tiền thu hoạch" component={ManHinhThongKeTienThuHoach} />

                     <Stack.Screen name="PetListScreen" component={PetListScreen} />
//
//                     <Stack.Screen name="AddPetScreen" component={AddPetScreen} />
//                     <Stack.Screen name="PetDetailScreen" component={PetDetailScreen} />

                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    )
}
export default MainScreen;


