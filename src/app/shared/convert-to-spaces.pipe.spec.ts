import { async, TestBed } from '@angular/core/testing';
import { ConvertToSpacesPipe } from './convert-to-spaces.pipe';

describe('ConvertToSpaces', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConvertToSpacesPipe
      ]
    }).compileComponents();
  }));

  it('Should replace hyphen \'-\' with space \' \'', async(() => {
    const pipe = new ConvertToSpacesPipe();
    expect(pipe.transform('GDN-0011', '-')).toBe('GDN 0011');
  }));
});
