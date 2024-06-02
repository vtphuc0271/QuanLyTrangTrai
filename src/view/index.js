import * as React from 'react';
import { Button, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import dsChuKy from './ChuKy/dsChuKy';
import suaChuKy from './ChuKy/suaChuKy';
import xemGhiChep from './ChuKy/xemGhiChep';
import suaGhiChepChuKyChanNuoi from './ChuKy/suaGhiChepChuKyChanNuoi';

import themChuKy from './ChuKy/themChuKy';
import ghiChepChuKyChanNuoi from './ChuKy/ghiChepChuKyChanNuoi';
import phanCongNhanVien from './ChuKy/PhanCongNhanVien';
import chonDongVat from './ChuKy/chonDongVat';
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Danh sách chu kỳ" component={dsChuKy} />
      <Stack.Screen name="Sửa chu kỳ chăn nuôi" component={suaChuKy} />
      <Stack.Screen name="Xem ghi chép chăn nuôi" component={xemGhiChep} />
      <Stack.Screen
        name="Sửa ghi chép chu kỳ chăn nuôi"
        component={suaGhiChepChuKyChanNuoi}
      />
      <Stack.Screen name="Thêm chu kỳ" component={themChuKy} />
      <Stack.Screen
        name="Ghi chép chu kỳ chăn nuôi"
        component={ghiChepChuKyChanNuoi}
      />
      <Stack.Screen name="Phân công nhân viên" component={phanCongNhanVien} />
       <Stack.Screen name="Chọn động vật" component={chonDongVat} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
