import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'kirby-comment-modal',
  template: `
    <div mat-dialog-title>{{ data.title }}</div>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
      <mat-form-field class="w-full">
        <mat-label>Favorite Animal</mat-label>
        <textarea matInput [(ngModel)]="comment" rows="5" cdkFocusInitial></textarea>
      </mat-form-field>
    </div>
    <div mat-dialog-actions class="flex flex-row">
      <button mat-button mat-dialog-close>Cancelar</button>
      <div class="flex-grow"></div>
      <button mat-raised-button [disabled]="!commentIsValid" [mat-dialog-close]="comment" color="primary">
        Enviar
      </button>
    </div>
  `,
})
export class CommentModalComponent {
  comment = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  get commentIsValid() {
    return this.comment.trim().length > 5 && this.comment.trim().length < 255;
  }
}
