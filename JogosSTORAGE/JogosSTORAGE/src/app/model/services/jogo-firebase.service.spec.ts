import { TestBed } from '@angular/core/testing';
import { JogoFirebaseService } from './jogo-firebase.service';

describe('JogoFirebaseService', () => {
  let service: JogoFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JogoFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
