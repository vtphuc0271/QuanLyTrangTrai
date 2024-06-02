import React, {useEffect, useState, useContext} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    Image,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import NhanVien from '../../NhanVien/NhanVien';
import { Alert } from 'react-native';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../NhanVien/AuthContext';

//
const SwitchButton = ({ onPress, isLogin }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.switchButton]}>
            <View style={[styles.switchTextContainer, { backgroundColor: isLogin ? '#fff' : '#287341' }]}>
                <Text style={[styles.switchText, { color: isLogin ? '#000' : '#ccc' }]}>Đăng nhập</Text>
            </View>
            <View style={[styles.switchTextContainer, { backgroundColor: isLogin ? '#287341' : '#fff' }]}>
                <Text style={[styles.switchText, { color: isLogin ? '#ccc' : '#000' }]}>Đăng ký</Text>
            </View>
        </TouchableOpacity>
    );
};

const LoginScreen = () => {
    const { login, themNhanVien, dangNhap, getDanhSachNhanVien,getAPI } = useContext(AuthContext);

    const [fetchedData, setFetchedData] = useState(false);

    useEffect(() => {
        getAPI();
    },[]);

    const navigation = useNavigation();
    // Check tab login, register
    const [isLogin, setIsLogin] = useState(true);
    const handleSwitch = () => {
        setIsLogin(!isLogin);
    };

    // Tab login
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    // Tab register
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerAgainPassword, setRegisterAgainPassword] = useState('');
    const [registerSDT, setRegisterSDT] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [isRegisterPasswordVisible, setIsRegisterPasswordVisible] = useState(false);
    const [isRegisterAgainPasswordVisible, setIsRegisterAgainPasswordVisible] = useState(false);
    const toggleRegisterPasswordVisibility = () => {
        setIsRegisterPasswordVisible(!isRegisterPasswordVisible);
    };
    const toggleRegisterAgainPasswordVisibility = () => {
        setIsRegisterAgainPasswordVisible(!isRegisterAgainPasswordVisible);
    };

    // DateTimePickerModal
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(null);

    const handleDateChange = (e,selectedDate) => {
        if(e.type === 'set'){
            const currentDate = selectedDate || date
            console.log(currentDate);
            setDate(currentDate)
        }
        setShow(false)
    }
    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    }

    const dangKy = () => {
        if (registerPassword !== registerAgainPassword) {
            Alert.alert(
                'Lỗi',
                'Nhập lại mật khẩu không đúng',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
            return;
        }
        const existingNhanVien = getDanhSachNhanVien().find(nv => nv.tenDangNhap === registerUsername);
        if (existingNhanVien) {
            Alert.alert('Lỗi', 'Nhân viên đã tồn tại.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
            return;
        }
    //avartaNV, maNV, tenDangNhap, pass, ngaySinh, sdt, email, viTriCongViec
        const nhanVien = new NhanVien("","",registerUsername, registerPassword, date ? formatDate(date) : '', registerSDT, registerEmail, "");
        const issucces = themNhanVien(nhanVien);
        if (issucces) {
            Alert.alert('Thành công', 'Đã thêm nhân viên thành công.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
        }
    };

    const dangNhapLoginScreen = () => {
        const issucces = dangNhap(loginUsername, loginPassword);
        if(issucces){
            const nhanVien = getDanhSachNhanVien().find(nv => nv.tenDangNhap === loginUsername);
            login(nhanVien);
            navigation.navigate('Home',{loginUsername:loginUsername});
        }
    };


    return (
        <ImageBackground source={require('../../../assets/banner.png')} style={styles.container}>
            <View style={[styles.outerContainer, isLogin ? null : { marginTop: 200 }]}>
                <SwitchButton onPress={handleSwitch} isLogin={isLogin} />
                {isLogin ? (
                    <View style={styles.loginContent}>
                        <View style={styles.inputContainer}>
                            <Image source={require('../../../assets/username_icon.png')} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Tên đăng nhập"
                                value={loginUsername}
                                onChangeText={setLoginUsername}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Image source={require('../../../assets/pass_icon.png')} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Mật khẩu"
                                secureTextEntry={!isPasswordVisible}
                                value={loginPassword}
                                onChangeText={setLoginPassword}
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                <Image
                                    source={isPasswordVisible ? require('../../../assets/hidepass_icon.png') : require('../../../assets/showpass_icon.png')}
                                    style={styles.passwordVisibilityIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.loginButton} onPress={dangNhapLoginScreen}>
                            <Text style={styles.loginButtonText}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.registerContent}>
                        <View style={styles.inputContainer}>
                            <Image source={require('../../../assets/username_icon.png')} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Tên đăng nhập"
                                value={registerUsername}
                                onChangeText={setRegisterUsername}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Image source={require('../../../assets/pass_icon.png')} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Mật khẩu"
                                secureTextEntry={!isRegisterPasswordVisible}
                                value={registerPassword}
                                onChangeText={setRegisterPassword}
                            />
                            <TouchableOpacity onPress={toggleRegisterPasswordVisibility}>
                                <Image
                                    source={isRegisterPasswordVisible ? require('../../../assets/hidepass_icon.png') : require('../../../assets/showpass_icon.png')}
                                    style={styles.passwordVisibilityIcon}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputContainer}>
                            <Image source={require('.../../../assets/pass_icon.png')} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập lại mật khẩu"
                                secureTextEntry={!isRegisterAgainPasswordVisible}
                                value={registerAgainPassword}
                                onChangeText={setRegisterAgainPassword}
                            />
                            <TouchableOpacity onPress={toggleRegisterAgainPasswordVisibility}>
                                <Image
                                    source={isRegisterAgainPasswordVisible ? require('../../../assets/hidepass_icon.png') : require('../../../assets/showpass_icon.png')}
                                    style={styles.passwordVisibilityIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <Image source={require('../../../assets/phone.png')} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Số điện thoại"
                                value={registerSDT}
                                onChangeText={setRegisterSDT}
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Image source={require('../../../assets/email.png')} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={registerEmail}
                                onChangeText={setRegisterEmail}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Image source={require('../../../assets/birthday.png')} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Ngày sinh"
                                value={date ? formatDate(date) : ''}
                                editable={false}
                            />
                            <TouchableOpacity onPress={() => setShow(true)}>
                                <Image source={require('../../../assets/calendar.png')} style={styles.icon} />
                                {
                                    show && (
                                        <DateTimePicker
                                            value={date || new Date()}
                                            mode={'date'}
                                            onChange={handleDateChange}
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Dismiss"
                                        />
                                    )
                                }
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.loginButton} onPress={dangKy}>
                            <Text style={styles.loginButtonText}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    outerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    switchButton: {
        width: 240,
        height: 50,
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#287341',
        elevation: 10,
        marginBottom: 20,
        marginTop: 100,
    },
    switchTextContainer: {
        flex: 1,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    switchText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginContent: {
        alignItems: 'center',
        backgroundColor: '#fff',
        width: 300,
        height: 150,
        borderRadius: 10,
        elevation: 10,
    },
    registerContent: {
        alignItems: 'center',
        backgroundColor: '#fff',
        width: 300,
        height: 395,
        borderRadius: 10,
        elevation: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 10,
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    passwordVisibilityIcon: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
    loginButton: {
        marginTop: 8,
        backgroundColor: '#287341',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
