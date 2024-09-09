import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { avatars } from './avatars-list';
import { CommonModule } from '@angular/common';
import { UserSessionService } from '../shared/services/user-session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'moon-sign-in-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in-view.component.html'
})
export class SignInViewComponent {
  avatars = avatars;

  signInForm = new FormGroup({
    nickname: new FormControl('', [Validators.required]),
    avatar: new FormControl('', [Validators.required])
  });

  get nicknameFormControl() { return this.signInForm.controls.nickname; }
  get nicknameIsTouchedOrDirty() { return this.nicknameFormControl.touched || this.nicknameFormControl.dirty; }
  get avatarFormControl() { return this.signInForm.controls.avatar; }
  get avatarIsTouchedOrDirty() { return this.avatarFormControl.touched || this.avatarFormControl.dirty; }

  constructor(
    private router: Router,
    private userSessionService: UserSessionService
  ) {};

  onSubmit() {
    this.signInForm.markAllAsTouched();
    if (this.signInForm.valid && this.nicknameFormControl.value !== null && this.avatarFormControl.value !== null) {
      this.userSessionService.initUserSession(this.nicknameFormControl.value, this.avatarFormControl.value)
        .subscribe({
          next: () => this.router.navigate(['']),
        });
    }
  }
}
