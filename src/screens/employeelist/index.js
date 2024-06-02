import React, { useEffect, useState,useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../NhanVien/AuthContext';
import { useNavigation, useFocusEffect  } from '@react-navigation/native';



const EmployeeList = () => {
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();
    const {getDanhSachNhanVien } = useContext(AuthContext);
    const [nhanViens, setNhanViens] = useState([]);
    const [fetchedData, setFetchedData] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    useFocusEffect(() => {
        if (!fetchedData) {
            fetchData();
            setFetchedData(true);
        }
    });

    const fetchData =  () => {
        const danhSachNhanVien = getDanhSachNhanVien();
        setNhanViens(danhSachNhanVien);
    };
    const handleSearch = (text) => {
        setSearchText(text);
        const danhSachNhanVien = getDanhSachNhanVien(text);
        setNhanViens(danhSachNhanVien);
    };


    const handleItemPress = (tenDangNhap) => {
        // Chuyển hướng đến màn hình chi tiết của item được nhấn và truyền thông tin của item đó
        const nhanVien = getDanhSachNhanVien().find(nv => nv.tenDangNhap === tenDangNhap);
        navigation.navigate('EmployeeEdit', {employee: nhanVien});
    };
    const EmployeeItem = ({tenDangNhap, email, sdt, viTriCongViec }) => {
        return (
            <TouchableOpacity onPress={() => handleItemPress(tenDangNhap)}>
                <View style={styles.itemContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../../../assets/avartauser.png')}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{tenDangNhap}</Text>
                        <Text style={styles.department}>{email}</Text>
                        <Text style={styles.birthdate}>{sdt}</Text>
                        <Text style={styles.position}>{viTriCongViec}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const themNv =  () => {
        navigation.navigate('EmployeeAdd');
    };

    const loadDanhSach =  () => {
        setFetchedData(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Danh sách nhân viên</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm..."
                value={searchText}
                onChangeText={handleSearch}
            />
            <FlatList
                data={nhanViens}
                renderItem={({ item }) => (
                    <EmployeeItem
                        tenDangNhap={item.tenDangNhap}
                        email={item.email}
                        sdt={item.sdt}
                        viTriCongViec={item.viTriCongViec}
                    />
                )}
                keyExtractor={(item) => item.tenDangNhap}
            />
            <View style={styles.addButtonContainer}>
                <TouchableOpacity style={styles.addButton} onPress={loadDanhSach}>
                    <Image source={require('../../../assets/load.png')} style={styles.addButtonIcon} />
                    <Text style={styles.addButtonLabel}>Load</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={themNv}>
                    <Image source={require('../../../assets/themNV.png')} style={styles.addButtonIcon} />
                    <Text style={styles.addButtonLabel}>Thêm nhân viên</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF9ED',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 15,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        marginHorizontal : 15,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        padding: 10,
        margin: 15,
        backgroundColor: '#D6FDE3',
    },
    imageContainer: {
        width: 78,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    image: {
        width: 78,
        height: 80,
        borderRadius: 5,
    },
    textContainer: {
        flex: 1,
        paddingLeft: 25,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    department: {
        fontSize: 14,
    },
    birthdate: {
        fontSize: 14,
    },
    position: {
        fontSize: 14,
    },
    addButtonContainer: {
        flexDirection:"row",
        position: 'absolute',
        bottom: 20, // Khoảng cách từ dưới cùng của màn hình
        width: '100%',
        alignItems: 'center',
        justifyContent: "space-between",
        padding: 20,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#E5EEDF',
        borderWidth: 0.3,
        borderColor: '#000000',
        borderRadius: 3,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    addButtonIcon: {
        width: 15,
        height: 15,
        marginRight: 5,
    },
    addButtonLabel: {
        fontFamily: 'Rubik',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 15,
        textAlign: 'center',
        color: '#042710',
    },
});

export default EmployeeList;
