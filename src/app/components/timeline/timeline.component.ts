import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements AfterViewInit {
  timelineItems: TimelineItem[] = [
    {
      date: 'April 8, 2010',
      title: 'Asia Exhibit Opening',
      description:
        'The Asia exhibit was opened featuring tigers, pandas, and other diverse species from across the continent.',
    },
    {
      date: 'June 15, 2015',
      title: 'Africa Exhibit Opening',
      description:
        'The Africa exhibit opened featuring diverse savanna wildlife, including lions, giraffes, and zebras.',
    },
    {
      date: 'May 23, 2018',
      title: 'North America Exhibit Opening',
      description:
        'The North America exhibit launched showcasing native species like bison, wolves, and bald eagles.',
    },
    {
      date: 'November 27, 2020',
      title: 'Australia Exhibit Opening',
      description:
        'The Australia exhibit debuted with unique marsupials including kangaroos, koalas, and wombats.',
    },
    {
      date: 'October 30, 2022',
      title: 'Primates Exhibit Opening',
      description:
        'The Primate Center opened with state-of-the-art habitats for various monkey and ape species.',
    },
    {
      date: 'March 14, 2025',
      title: "Children's Zoo Exhibit Opening",
      description:
        "This is a planned expansion for Children's Zoo. Where children will be able to interact with baby animals.",
    },
  ];

  activeTimelineItemIndex: number | null = null;

  ngAfterViewInit(): void {
    this.setupMouseMoveHandler();
  }

  toggleTimelineItem(index: number, event: MouseEvent): void {
    event.stopPropagation();

    if (this.activeTimelineItemIndex === index) {
      this.activeTimelineItemIndex = null;
    } else {
      this.activeTimelineItemIndex = index;
    }
  }

  closeTimelineItem(event: MouseEvent): void {
    event.stopPropagation();
    this.activeTimelineItemIndex = null;
  }

  setupMouseMoveHandler(): void {
    const timelineWrapper = document.querySelector('.timeline-wrapper');
    if (timelineWrapper) {
      timelineWrapper.addEventListener('mousemove', (event: Event) => {
        // Cast the generic Event to MouseEvent inside the function
        const mouseEvent = event as MouseEvent;

        const timeline = document.querySelector(
          '.timeline-items'
        ) as HTMLElement;
        const wrapperWidth = (timelineWrapper as HTMLElement).clientWidth;
        const timelineWidth = timeline.scrollWidth;

        if (timelineWidth > wrapperWidth) {
          const scrollPosition =
            (mouseEvent.pageX / wrapperWidth) * (timelineWidth - wrapperWidth);
          (timelineWrapper as HTMLElement).scrollLeft = scrollPosition;
        }
      });
    }
  }
}
