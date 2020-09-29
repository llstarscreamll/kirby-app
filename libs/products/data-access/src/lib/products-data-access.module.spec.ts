import { async, TestBed } from '@angular/core/testing';
import { ProductsDataAccessModule } from './products-data-access.module';

describe('ProductsDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ProductsDataAccessModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ProductsDataAccessModule).toBeDefined();
  });
});
