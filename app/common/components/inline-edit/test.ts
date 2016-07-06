import {Component} from '@angular/core'
import {InlineEditComponent} from './inline-edit.component.ts'

@Component({
  selector: 'my-app',
  providers: [],
  template: `
    <div>
      <h2>Inline Editing with Angular 2</h2>

      <inline-edit [(ngModel)]="editableText" (onSave)="saveEditable($event)"></inline-edit>

    </div>
  `,
  directives: [InlineEditComponent]
})
export class Test {

  editableText = "Click to edit me!";

  // Save name to the server here.
  saveEditable(value){
      console.log(value);
  }
}
