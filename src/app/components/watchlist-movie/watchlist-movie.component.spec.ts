import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistMovieComponent } from './watchlist-movie.component';

describe('WatchlistMovieComponent', () => {
  let component: WatchlistMovieComponent;
  let fixture: ComponentFixture<WatchlistMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchlistMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchlistMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
