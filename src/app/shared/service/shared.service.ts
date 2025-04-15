import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class sharedservice {
  private numberBehav = new BehaviorSubject <number>(0)
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'warning' = 'success';

  NumberObserv = this.numberBehav.asObservable()

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading = this.loadingSubject.asObservable();

  constructor() {

    const storeNum = ( localStorage.getItem('num'))
    if(storeNum){
      this.numberBehav.next(Number(storeNum))
  }

}
show(message: string, type: 'success' | 'error' | 'warning' = 'success') {
  this.toastMessage = message;
  this.toastType = type;
  this.showToast = true;

  setTimeout(() => {
    this.showToast = false;
  }, 3000); // Auto-hide after 3 seconds
}





  incrementNum() {
    const incrementedNum = this.numberBehav.value + 1;
    this.numberBehav.next(incrementedNum);
    localStorage.setItem('num', incrementedNum.toString());
  }

  decrementNum() {
    const decNum = this.numberBehav.value - 1;
    this.numberBehav.next(decNum);
    localStorage.setItem('num', decNum.toString());
  }
  removeNum() {
    localStorage.removeItem('num'); // Remove from storage
    this.numberBehav.next(0); // Reset to zero
  }
  showSpinner() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }



  }



