/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {SitescheduleDetailComponent} from './siteschedule-detail.component';

describe('SitescheduleDetailComponent', () => {
  let component: SitescheduleDetailComponent;
  let fixture: ComponentFixture<SitescheduleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SitescheduleDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitescheduleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
