import { of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomePage } from './welcome.page';
import { emptyPagination } from '@kirby/shared';
import { createCategory, createProduct } from '@kirby/products/testing';
import { CategoriesFacade } from '@kirby/products/data-access';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Category } from '@kirby/products/data/src';
import { ShopFacade } from '../../+state/shop.facade';
import { ShoppingCart } from '../../models/shopping-cart';

describe('WelcomePage', () => {
  let template: HTMLDivElement;
  let component: WelcomePage;
  let shopFacade: ShopFacade;
  let categoriesFacade: CategoriesFacade;
  let fixture: ComponentFixture<WelcomePage>;
  const product = createProduct({ id: 'P1' });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomePage],
      providers: [
        {
          provide: ShopFacade,
          useValue: {
            shoppingCart$: of(ShoppingCart.fromJson({ products: [] })),
            addProductToShoppingCart: (product: any) => true,
            removeProductFromShoppingCart: (product: any) => true,
          },
        },
        {
          provide: CategoriesFacade,
          useValue: {
            paginated$: of({
              ...emptyPagination(),
              data: [createCategory({ id: 'C-1' })],
            }),

            search: () => true,
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    categoriesFacade = TestBed.inject(CategoriesFacade);
    fixture = TestBed.createComponent(WelcomePage);
    shopFacade = TestBed.inject(ShopFacade);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call categoriesFacade.search(...) on init', () => {
    spyOn(categoriesFacade, 'search');

    component.ngOnInit();

    expect(categoriesFacade.search).toHaveBeenCalledWith({
      query: {
        sort: 'position',
        filter: { active: true },
        include: 'firstTenProducts',
      },
    });
  });

  it('should show categories when available', () => {
    const product = createProduct({ id: 'P-A' });
    const category = createCategory({ id: 'C-1', firstTenProducts: [product] });
    component.categories$ = of({
      ...emptyPagination(),
      data: Category.fromJsonList([
        category,
        createCategory({
          id: 'C-2',
          firstTenProducts: [createProduct({ id: 'P-B' })],
        }),
        createCategory({
          id: 'C-3',
          firstTenProducts: [createProduct({ id: 'P-C' })],
        }),
      ]),
    });

    fixture.detectChanges();

    const categoriesList = template.querySelectorAll('.categories-list > div');
    expect(categoriesList.length).toBe(3);
    expect(categoriesList[0].textContent).toContain(category.name);
  });

  it('should show categories with first ten products', () => {
    const productA = createProduct({ id: 'P-A' });
    const productB = createProduct({ id: 'P-B' });
    const category = createCategory({
      id: 'C-1',
      firstTenProducts: [productA, productB],
    });
    component.categories$ = of({
      ...emptyPagination(),
      data: Category.fromJsonList([
        category,
        createCategory({
          id: 'C-2',
          firstTenProducts: [createProduct({ id: 'P-C' })],
        }),
        createCategory({
          id: 'C-3',
          firstTenProducts: [createProduct({ id: 'P-D' })],
        }),
      ]),
    });

    fixture.detectChanges();

    const categoryTitles = template.querySelectorAll('.category-products');
    expect(categoryTitles.length).toBe(3);
    expect(
      categoryTitles[0].querySelectorAll('.products shop-product').length
    ).toBe(2);
    expect(categoryTitles[1].querySelectorAll('.products').length).toBe(1);
  });

  it('should call shopFacade.addProductToShoppingCart(...)', () => {
    const addedProduct = { ...product, quantity: 2 };
    spyOn(shopFacade, 'addProductToShoppingCart');

    component.addProduct(addedProduct);

    expect(shopFacade.addProductToShoppingCart).toHaveBeenCalledWith(
      addedProduct
    );
  });

  it('should call shopFacade.removeProductFromShoppingCart(...)', () => {
    spyOn(shopFacade, 'removeProductFromShoppingCart');

    component.removeProduct(product);

    expect(shopFacade.removeProductFromShoppingCart).toHaveBeenCalledWith(
      product
    );
  });
});
