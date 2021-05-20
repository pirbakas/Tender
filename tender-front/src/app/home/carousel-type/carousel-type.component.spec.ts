import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselTypeComponent } from './carousel-type.component';

describe('CarouselTypeComponent', () => {
  let component: CarouselTypeComponent;
  let fixture: ComponentFixture<CarouselTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
