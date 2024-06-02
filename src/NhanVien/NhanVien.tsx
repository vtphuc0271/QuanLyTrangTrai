export default class NhanVien {
    constructor(avartaNV, maNV, tenDangNhap, pass, ngaySinh, sdt, email, viTriCongViec) {
        this.avartaNV = avartaNV;
        this.maNV = maNV;
        this.tenDangNhap = tenDangNhap;
        this.pass = pass;
        this.ngaySinh = ngaySinh;
        this.sdt = sdt;
        this.email = email;
        this.viTriCongViec = viTriCongViec;
    }

    setMaNV(maNV) {
        this.maNV = maNV;
    }

    getMaNV() {
        return this.maNV;
    }

    setTenDangNhap(tenDangNhap) {
        this.tenDangNhap = tenDangNhap;
    }

    getTenDangNhap() {
        return this.tenDangNhap;
    }

    setPass(pass) {
        this.pass = pass;
    }

    getPass() {
        return this.pass;
    }

    setNgaySinh(ngaySinh) {
        this.ngaySinh = ngaySinh;
    }

    getNgaySinh() {
        return this.ngaySinh;
    }

    setSdt(sdt) {
        this.sdt = sdt;
    }

    getSdt() {
        return this.sdt;
    }

    setEmail(email) {
        this.email = email;
    }

    getEmail() {
        return this.email;
    }

    setViTriCongViec(viTriCongViec) {
        this.viTriCongViec = viTriCongViec;
    }

    getViTriCongViec() {
        return this.viTriCongViec;
    }

    checkLogin(){
        if(this.maNV=='Admin'){
            return true
        }
        return false
    }
}
