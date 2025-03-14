import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DonationComponent } from './components/donation/donation.component';
import { GameComponent } from './components/game/game.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { DistanceComponent } from './components/distance/distance.component';
import { TimelineComponent } from './components/timeline/timeline.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DonationComponent,
    GameComponent,
    CalendarComponent,
    FeedbackComponent,
    DistanceComponent,
    TimelineComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-zoo';
}
