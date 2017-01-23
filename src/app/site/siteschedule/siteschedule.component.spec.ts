/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {SitescheduleComponent} from './siteschedule.component';

describe('SitescheduleComponent', () => {
  let component: SitescheduleComponent;
  let fixture: ComponentFixture<SitescheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SitescheduleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitescheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
