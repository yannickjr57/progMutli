import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecetteModifPage } from './recette-modif.page';

describe('RecetteModifPage', () => {
  let component: RecetteModifPage;
  let fixture: ComponentFixture<RecetteModifPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetteModifPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
