import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  merge,
  of,
  retry,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'CodeSandbox';
  @ViewChild('inputElement') inputElement!: ElementRef;

  rxJsMap() {
    console.log('********* rxJsMap *******');
    const numbers$ = of(1, 2, 3, 4, 5);
    numbers$.pipe(map((num) => num * num)).subscribe((result) => {
      console.log(result); // Output: 1, 4, 9, 16, 25
    });
    console.log('********* rxJsMap *******');
  }

  rxJsFilter() {
    console.log('********* rxJsFilter *******');
    const numbers$ = of(1, 2, 3, 4, 5);
    numbers$.pipe(filter((num) => num % 2 === 0)).subscribe((result) => {
      console.log(result); // Output: 2, 4
    });
    console.log('********* rxJsFilter *******');
  }

  rxJsMerge() {
    console.log('********* rxJsMerge *******');
    const numbers1$ = of(1, 2, 3);
    const numbers2$ = of(4, 5, 6);

    merge(numbers1$, numbers2$).subscribe((result) => {
      console.log(result); // Output: 1, 2, 3, 4, 5, 6
    });
    console.log('********* rxJsMerge *******');
  }
  rxJsDebounceTime() {
    console.log('********* rxJsDebounceTime *******');

    const input$ = fromEvent(this.inputElement?.nativeElement, 'input');

    input$.pipe(debounceTime(300)).subscribe((event: any) => {
      console.log(event.target.value); // Output: Debounced input value
    });
    console.log('********* rxJsDebounceTime *******');
  }

  rxJsTap() {
    console.log('********* rxJsTap *******');

    const numbers$ = of(1, 2, 3, 4, 5);

    numbers$
      .pipe(
        tap((num) => {
          console.log('Emitting:', num);
        })
      )
      .subscribe((result) => {
        console.log(result); // Output: 1, 2, 3, 4, 5
      });

    console.log('********* rxJsTap *******');
  }

  rxJsSwitchMap() {
    console.log('********* rxJsSwitchMap *******');

    const input$ = fromEvent(this.inputElement.nativeElement, 'input');

    input$
      .pipe(
        switchMap((event: any) => {
          const searchTerm = event.target.value;
          return ajax.getJSON(
            `https://api.example.com/search?term=${searchTerm}`
          );
        })
      )
      .subscribe((response) => {
        console.log(response); // Output: Search results based on the latest input
      });
    console.log('********* rxJsSwitchMap *******');
  }

  rxJsTake() {
    console.log('********* rxJsTake *******');

    const numbers$ = of(1, 2, 3, 4, 5);

    numbers$.pipe(take(3)).subscribe((result) => {
      console.log(result); // Output: 1, 2, 3
    });

    console.log('********* rxJsTake *******');
  }

  rxJsCatchError() {
    console.log('********* rxJsCatchError *******');

    ajax
      .getJSON('https://api.example.com/data')
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return of([]);
        })
      )
      .subscribe((response) => {
        console.log(response); // Output: Empty array if an error occurs
      });
    console.log('********* rxJsCatchError *******');
  }

  rxJsRetry() {
    console.log('********* rxJsRetry *******');

    ajax
      .getJSON('https://api.example.com/data')
      .pipe(retry(3))
      .subscribe((response) => {
        console.log(response); // Output: Response data or error if all retries fail
      });
    console.log('********* rxJsRetry *******');
  }
  rxJsDistinctUntilChanged() {
    console.log('********* rxJsDistinctUntilChanged *******');

    const numbers$ = of(1, 1, 2, 2, 3, 3, 4, 5);

    numbers$.pipe(distinctUntilChanged()).subscribe((result) => {
      console.log(result); // Output: 1, 2, 3, 4, 5
    });
    console.log('********* rxJsDistinctUntilChanged *******');
  }
  ngOnInit(): void {
    this.rxJsMap();
    this.rxJsFilter();
    this.rxJsMerge();
    this.rxJsTap();
    this.rxJsTake();
    this.rxJsCatchError();
    this.rxJsRetry();
    this.rxJsDistinctUntilChanged();
  }
  ngAfterViewInit() {
    this.rxJsDebounceTime();
    this.rxJsSwitchMap();
  }
}
