import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.css'],
})
export class ActionFormComponent {
  constructor() {}

  cities: City[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];

  selectedCity: City | undefined;

  markAllAsTouched(form: any) {
    Object.values(form).forEach((control: any) => {
      control?.markAsTouched();
    });
  }

  userForm: FormGroup = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(16),
    ]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    city: new FormControl<City | null>(null, [Validators.required]),
    tech: new FormControl<string | null>(null),
    feedback: new FormControl<string | null>(null),
  });

  loading: boolean = false;
}
