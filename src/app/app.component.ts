import { Component } from '@angular/core';
import {WikipediaService} from './wikipedia.service';
import {Observable} from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mts-app';

items: Observable<Array<string>>;
  term = new FormControl();

  constructor(private wikipediaService: WikipediaService) {
    this.items = this.term.valueChanges
      .pipe(
          debounceTime(400),
          distinctUntilChanged(),
          switchMap(term => this.wikipediaService.search(term))
        );
  }
}
