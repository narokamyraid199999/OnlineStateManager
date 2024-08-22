import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class StateManagerService {
  constructor() {}

  public redoElements: any[] = [];
  public undoElements: any[] = [];

  saveFormState(form: FormGroup): void {
    this.undoElements.push(JSON.stringify(form.getRawValue())); // save the form value in the undo elements
  }

  undo(form: FormGroup): void {
    if (this.undoElements.length === 0) return; // check if there's any undo elements befor continuing

    this.redoElements.push(JSON.stringify(form.getRawValue())); // save the form state so it can be retrieved later
    const previousFormState = JSON.parse(this.undoElements.pop()); // get the previous state
    form.setValue(previousFormState, { emitEvent: false }); // change form value and prevent valueChanges event
  }

  redo(form: FormGroup): void {
    if (this.redoElements.length === 0) return; // check if there's any redo elements befor continuing
    this.saveFormState(form); // save the form state to the undo elements
    const lastFormState = JSON.parse(this.redoElements.pop()); // get the last redo element
    form.setValue(lastFormState, { emitEvent: false }); // change form value and prevent valueChanges event
  }

  canUndo(): boolean {
    return this.undoElements.length > 0; // check if there's any undo elements for ths button visiblility
  }

  canRedo(): boolean {
    return this.redoElements.length > 0; // check if there's any redo elements for ths button visiblility
  }
}
