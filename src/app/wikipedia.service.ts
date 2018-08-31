import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  constructor(private jsonp: Jsonp) {}

  search (term: string) {
    const search = new URLSearchParams()
    search.set('action', 'opensearch');
    search.set('search', term);
    search.set('format', 'json');
    return this.jsonp
      .get('https://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
      .pipe(
        map((response) => response.json()[1])
      );
  }
}
