import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-distance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.css'],
})
export class DistanceComponent {
  startPoint: string = '';
  endPoint: string = '';
  distance: string = '';
  time: string = '';

  startCount = 0;
  endCount = 0;

  locations = [
    '---Choose your Starting Point---',
    'Entrance/Exit',
    'Asia',
    'Africa',
    "Children's Zoo",
    'Australia',
    'North America',
    'Patagonia',
    'Primates',
  ];

  onStartPointChange(event: Event): void {
    const selectedText = (event.target as HTMLSelectElement).value;
    this.startCount = selectedText.length;
    this.calculateDistance();
  }

  onEndPointChange(event: Event): void {
    const selectedText = (event.target as HTMLSelectElement).value;
    this.endCount = selectedText.length;
    this.calculateDistance();
  }

  private calculateDistance(): void {
    if (this.startCount && this.endCount) {
      const distance = this.startCount + this.endCount;
      let walkingDistance = this.startCount + this.endCount * 115;
      let time = distance * 0.6;

      this.distance = `${walkingDistance} meters`;
      this.time = `${time} minutes`;
    }
  }
}
