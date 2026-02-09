import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWithPdfComponent } from './chat.with.pdf.component';

describe('ChatWithPdfComponent', () => {
  let component: ChatWithPdfComponent;
  let fixture: ComponentFixture<ChatWithPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatWithPdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatWithPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
