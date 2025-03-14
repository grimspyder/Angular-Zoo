import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css'],
})
export class DonationComponent {
  email: string = '';
  selectedAmount: string | null = null;
  customAmount: string = '';
  showMessage = false;
  isSuccess = false;
  messageText = '';

  onSubmit(event: Event): void {
    event.preventDefault();

    if ((this.email && this.selectedAmount) || this.customAmount) {
      this.messageText = 'Thank you for your donation!';
      this.isSuccess = true;
    } else {
      this.messageText = 'Why are you so cheap!';
      this.isSuccess = false;
    }

    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }
}
