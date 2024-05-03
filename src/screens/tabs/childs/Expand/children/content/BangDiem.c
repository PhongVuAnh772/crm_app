#include <stdio.h>
#include <string.h>

struct DiemSinhVien {
    int MaSo;
    char HoTen[50];
    float Diem;
};

struct BangDiem {
    struct DiemSinhVien A[100];
    int ts;
};

// Hàm nhập thông tin sinh viên
void NhapSinhVien(struct DiemSinhVien *sv) {
    printf("Nhap ma so sinh vien: ");
    scanf("%d", &sv->MaSo);
    printf("Nhap ho ten sinh vien: ");
    scanf(" %[^\n]s", sv->HoTen);
    printf("Nhap diem sinh vien: ");
    scanf("%f", &sv->Diem);
}

// Hàm thêm sinh viên mới vào đầu danh sách
void ThemSinhVien(struct BangDiem *bd) {
    if (bd->ts == 100) {
        printf("Bang diem da day!\n");
        return;
    }
    struct DiemSinhVien sv;
    NhapSinhVien(&sv);
    for (int i = bd->ts; i > 0; i--) {
        bd->A[i] = bd->A[i - 1];
    }
    bd->A[0] = sv;
    bd->ts++;
}

// Hàm sửa điểm theo tên sinh viên
void SuaDiemTheoTen(struct BangDiem *bd) {
    char ten[50];
    printf("Nhap ten sinh vien can sua diem: ");
    scanf(" %[^\n]s", ten);
    for (int i = 0; i < bd->ts; i++) {
        if (strcmp(bd->A[i].HoTen, ten) == 0) {
            printf("Nhap diem moi: ");
            scanf("%f", &bd->A[i].Diem);
            return;
        }
    }
    printf("Khong tim thay sinh vien co ten '%s'!\n", ten);
}

// Hàm sắp xếp bảng điểm theo điểm giảm dần
void SapXepBangDiem(struct BangDiem *bd) {
    for (int i = 0; i < bd->ts - 1; i++) {
        for (int j = bd->ts - 1; j > i; j--) {
            if (bd->A[j].Diem > bd->A[j - 1].Diem) {
                struct DiemSinhVien temp = bd->A[j];
                bd->A[j] = bd->A[j - 1];
                bd->A[j - 1] = temp;
            }
        }
    }
}

// Hàm in bảng điểm
void InBangDiem(struct BangDiem bd) {
    printf("Bang diem:\n");
    printf("%-10s %-30s %-10s\n", "Ma so", "Ho ten", "Diem");
    for (int i = 0; i < bd.ts; i++) {
        printf("%-10d %-30s %-10.2f\n", bd.A[i].MaSo, bd.A[i].HoTen, bd.A[i].Diem);
    }
}

int main() {
    struct BangDiem bd = {0};
    int choice;
    do {
        printf("\n1. Them sinh vien\n");
        printf("2. Sua diem theo ten\n");
        printf("3. Sap xep bang diem\n");
        printf("4. In bang diem\n");
        printf("0. Thoat\n");
        printf("Nhap lua chon: ");
        scanf("%d", &choice);
        switch (choice) {
            case 1:
                ThemSinhVien(&bd);
                break;
            case 2:
                SuaDiemTheoTen(&bd);
                break;
            case 3:
                SapXepBangDiem(&bd);
                break;
            case 4:
                InBangDiem(bd);
                break;
            case 0:
                break;
            default:
                printf("Lua chon khong hop le!\n");
        }
    } while (choice != 0);
    return 0;
}