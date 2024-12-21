import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecetteNewPage } from './recette-new.page';

describe('RecetteNewPage', () => {
  let component: RecetteNewPage;
  let fixture: ComponentFixture<RecetteNewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetteNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
