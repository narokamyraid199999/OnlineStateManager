import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { StateManagerService } from 'src/app/core/services/stateManager.service';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.css'],
})
export class ActionFormComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _stateManager: StateManagerService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.formInit();
    this.formChecker();
  }

  userForm: FormGroup = {} as FormGroup;

  formInit(): void {
    this.userForm = this._formBuilder.group({
      username: [''],
      email: [''],
      city: [''],
      tech: [''],
      feedback: [''],
    });
  }

  formChecker(): void {
    this.userForm.valueChanges.subscribe(() => {
      this._stateManager.saveFormState(this.userForm);
      // console.log('canUndo', this._stateManager.undoStack);
      // console.log('canRedo', this._stateManager.redoStack);
    });
  }

  cities: City[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];

  selectedCity: City | undefined;

  undo(): void {
    this._stateManager.undo(this.userForm);
    // console.log('redo stack', this._stateManager.redoStack);
    this._messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Undo changes',
    });
  }

  redo(): void {
    this._stateManager.redo(this.userForm);
    this._messageService.add({
      severity: 'success',
      summary: 'success',
      detail: 'Redo changes',
    });
  }

  canUndo(): boolean {
    return this._stateManager.canUndo();
  }

  canRedo(): boolean {
    return this._stateManager.canRedo();
  }
}
