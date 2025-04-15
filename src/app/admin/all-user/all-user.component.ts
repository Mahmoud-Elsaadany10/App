import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all-user',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule],
  templateUrl: './all-user.component.html',
  styleUrl: './all-user.component.css'
})
export class AllUserComponent implements OnInit, OnDestroy {
  user: any[] = [];
  filteredUsers: any[] = [];
  firstName: string = '';
  private userSubscription: Subscription | null = null;

  // **🔹 متغيرات الترقيم (Pagination)**
  page: number = 1; // رقم الصفحة الحالي
  pageSize: number = 10; // عدد العناصر في كل صفحة
  totalUsers: number = 0; // إجمالي عدد المستخدمين
  dynamicMaxSize: number=5;
  hide :boolean =false

  constructor(private admin: AdminService) {}

  ngOnInit(): void {
    this.getUsersByPage();
   this.hide =true


  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  // **🔹 تعديل جلب المستخدمين ليشمل الترقيم**
  getUsersByPage() {
    const skip = (this.page - 1) * this.pageSize; // لحساب عدد المستخدمين الذين يجب تخطيهم
    this.userSubscription = this.admin.getUsersByPage(skip, this.pageSize).subscribe({
      next: (res) => {
        this.user = res.users;
        this.filteredUsers = [...this.user];
        this.totalUsers = res.total; // تحديث العدد الإجمالي للمستخدمين
        console.log(res)
      },
    });
  }
  showButton(){
    this.hide =false
  }

  onClickButton(){
    this.getUsersByPage()
    this.page=1
    this.firstName=''
    this.hide=true
  }

  // **🔹 تحديث البحث بحيث لا يؤثر على الترقيم**
  onSearch() {
    if (this.firstName.trim() === '') {
      this.getUsersByPage(); // Reset pagination when clearing search

    } else {
      this.admin.searchByName(this.firstName).subscribe({
        next: (response) => {
          this.filteredUsers = response.users;

          // 🔹 Update totalUsers to match search results
          this.totalUsers = this.filteredUsers.length;
          console.log(this.totalUsers)

          // 🔹 Reset pagination when searching
          this.dynamicMaxSize = this.filteredUsers.length > 3 ? 5 : this.filteredUsers.length;
          this.page = 1;
        },
      });
    }
  }


  // **🔹 تحديث البيانات عند تغيير الصفحة**
  onPageChange(newPage: number) {
    this.page = newPage;
    this.getUsersByPage(); // جلب البيانات الجديدة عند تغيير الصفحة
  }
}
