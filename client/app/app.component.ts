import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ToastComponent } from './shared/toast/toast.component'; // Ensure ToastComponent is imported

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewChecked {

  constructor(public auth: AuthService,
              private changeDetector: ChangeDetectorRef,
              public toast: ToastComponent) { } // Inject ToastComponent

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  logout(): void {
    if (window.confirm('Are you sure you want to log out?')) {
      this.auth.logout();
      this.toast.setMessage('Logged out successfully.', 'success'); // Show a toast message on successful logout
    }
  }
}
