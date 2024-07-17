import { Component, OnDestroy } from '@angular/core';
import { filter, map, Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnDestroy{
  myFirstSubscription: Subscription;

  constructor() { 
    const customIntervalObservable = new Observable((observer:Observer<number>) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 3) {
          observer.error(new Error('Error! Count is now 3!'));
        }
        if (count === 5) {
          observer.complete();
        }
        count++;
      }, 1000);
    });

    this.myFirstSubscription = customIntervalObservable
    .pipe(
      filter((value) => {
      if (value % 2 == 0) {
        return true;
      }
      return false;
      }),

      map((data: number) => {
        return `The number is ${data}`;
      }
    ))
    .subscribe({
      next: (data: string) => {
        console.log(data);
      },
      error: (error: Error) => {
        console.log(error);
        // alert(error.message);
      },
      complete: () => {
        console.log('completed!');
      }
    });
  }

  ngOnDestroy(): void {
    this.myFirstSubscription.unsubscribe();
  }
}
