import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Holiday {
  hdate: string;
  holiday: string;
}

interface Event {
  date: string;
  title: string;
}

interface CalendarDay {
  day: number;
  dateText: string;
  isCurrentDay: boolean;
  event?: string;
  holiday?: string;
  isPlain: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  holidays: Holiday[] = [
    // 2024 US Holidays
    { hdate: '01-01-2024', holiday: "New Year's Day" },
    { hdate: '15-01-2024', holiday: 'Martin Luther King Jr. Day' },
    { hdate: '19-02-2024', holiday: "Presidents' Day" },
    { hdate: '27-05-2024', holiday: 'Memorial Day' },
    { hdate: '19-06-2024', holiday: 'Juneteenth' },
    { hdate: '04-07-2024', holiday: 'Independence Day' },
    { hdate: '02-09-2024', holiday: 'Labor Day' },
    { hdate: '14-10-2024', holiday: 'Columbus Day' },
    { hdate: '11-11-2024', holiday: 'Veterans Day' },
    { hdate: '28-11-2024', holiday: 'Thanksgiving Day' },
    { hdate: '25-12-2024', holiday: 'Christmas Day' },
    // 2025 US Holidays
    { hdate: '01-01-2025', holiday: "New Year's Day" },
    { hdate: '20-01-2025', holiday: 'Martin Luther King Jr. Day' },
    { hdate: '17-02-2025', holiday: "Presidents' Day" },
    { hdate: '26-05-2025', holiday: 'Memorial Day' },
    { hdate: '19-06-2025', holiday: 'Juneteenth' },
    { hdate: '04-07-2025', holiday: 'Independence Day' },
    // Zoo Exhibit Events
    {
      hdate: '08-04-2010',
      holiday:
        'Asia Exhibit Opening - Featuring tigers, pandas, and other diverse species',
    },
    {
      hdate: '15-06-2015',
      holiday: 'Africa Exhibit Opening - Featuring lions, giraffes, and zebras',
    },
    {
      hdate: '23-05-2018',
      holiday:
        'North America Exhibit Opening - Featuring bison, wolves, and bald eagles',
    },
    {
      hdate: '27-11-2020',
      holiday:
        'Australia Exhibit Opening - Featuring kangaroos, koalas, and wombats',
    },
    {
      hdate: '30-10-2022',
      holiday: 'Primates Exhibit Opening - New state-of-the-art habitats',
    },
    {
      hdate: '14-03-2025',
      holiday:
        "Children's Zoo Exhibit Opening - Interactive baby animal experiences",
    },
  ];

  navigation = 0;
  clicked: string | null = null;
  events: Event[] = [];
  calendarDays: CalendarDay[] = [];

  monthBanner = '';
  weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  isModalVisible = false;
  isAddEventFormVisible = false;
  isViewEventFormVisible = false;
  eventText = '';
  newEventTitle = '';
  showError = false;

  ngOnInit(): void {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      this.events = JSON.parse(storedEvents);
    }
    this.loadCalendar();
  }

  loadCalendar(): void {
    const dt = new Date();

    if (this.navigation !== 0) {
      dt.setMonth(new Date().getMonth() + this.navigation);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    this.monthBanner = `${dt.toLocaleDateString('en-us', {
      month: 'long',
    })} ${year}`;

    const dayInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayofMonth = new Date(year, month, 1);
    const dateText = firstDayofMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    const dayString = dateText.split(', ')[0];
    const emptyDays = this.weekdays.indexOf(dayString);

    this.calendarDays = [];
    for (let i = 1; i <= dayInMonth + emptyDays; i++) {
      const monthVal = month + 1 < 10 ? '0' + (month + 1) : month + 1;
      const dateVal =
        i - emptyDays < 10 ? '0' + (i - emptyDays) : i - emptyDays;
      const dateText = `${dateVal}-${monthVal}-${year}`;

      if (i > emptyDays) {
        const dayNum = i - emptyDays;
        const isCurrentDay = dayNum === day && this.navigation === 0;
        const eventOfTheDay = this.events.find((e) => e.date === dateText);
        const holidayOfTheDay = this.holidays.find((e) => e.hdate === dateText);

        this.calendarDays.push({
          day: dayNum,
          dateText,
          isCurrentDay,
          event: eventOfTheDay?.title,
          holiday: holidayOfTheDay?.holiday,
          isPlain: false,
        });
      } else {
        this.calendarDays.push({
          day: 0,
          dateText,
          isCurrentDay: false,
          isPlain: true,
        });
      }
    }
  }

  goToPrevMonth(): void {
    this.navigation--;
    this.loadCalendar();
  }

  goToNextMonth(): void {
    this.navigation++;
    this.loadCalendar();
  }

  showModal(dateText: string): void {
    this.clicked = dateText;
    const eventOfTheDay = this.events.find((e) => e.date === dateText);

    if (eventOfTheDay) {
      this.eventText = eventOfTheDay.title;
      this.isViewEventFormVisible = true;
    } else {
      this.isAddEventFormVisible = true;
    }

    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isViewEventFormVisible = false;
    this.isAddEventFormVisible = false;
    this.isModalVisible = false;
    this.clicked = null;
    this.loadCalendar();
  }

  saveEvent(): void {
    if (this.newEventTitle.trim()) {
      this.showError = false;
      this.events.push({
        date: this.clicked!,
        title: this.newEventTitle.trim(),
      });

      this.newEventTitle = '';
      localStorage.setItem('events', JSON.stringify(this.events));
      this.closeModal();
    } else {
      this.showError = true;
    }
  }

  deleteEvent(): void {
    this.events = this.events.filter((e) => e.date !== this.clicked);
    localStorage.setItem('events', JSON.stringify(this.events));
    this.closeModal();
  }
}
