import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display form fields', () => {
    const firstnameInput = fixture.nativeElement.querySelector('#firstname');
    const lastnameInput = fixture.nativeElement.querySelector('#lastname');
    const usernameInput = fixture.nativeElement.querySelector('#username');
    const emailInput = fixture.nativeElement.querySelector('#email');
    const passwordInput = fixture.nativeElement.querySelector('#password');

    expect(firstnameInput).toBeTruthy();
    expect(lastnameInput).toBeTruthy();
    expect(usernameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should validate required fields', () => {
    component.signUpForm.patchValue({
      firstname: 'John',
      lastname: 'Doe',
      username: null,
    });

    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    expect(component.signUpForm.get('username')?.hasError('required')).toBe(true);
    expect(component.signUpForm.get('email')?.hasError('required')).toBe(true);
    expect(component.signUpForm.get('password')?.hasError('required')).toBe(true);
  });
});
