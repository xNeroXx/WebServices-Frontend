import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataEditComponent } from './metadata-edit.component';

describe('MetadataEditComponent', () => {
  let component: MetadataEditComponent;
  let fixture: ComponentFixture<MetadataEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetadataEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetadataEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
