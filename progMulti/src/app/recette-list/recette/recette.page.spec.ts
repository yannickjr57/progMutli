import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecettePage } from './recette.page';

describe('RecettePage', () => {
  let component: RecettePage;
  let fixture: ComponentFixture<RecettePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecettePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
