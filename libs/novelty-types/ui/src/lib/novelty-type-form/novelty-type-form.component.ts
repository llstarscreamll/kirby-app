import {
  Input,
  OnInit,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'kirby-novelty-type-form',
  templateUrl: './novelty-type-form.component.html',
  styleUrls: ['./novelty-type-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoveltyTypeFormComponent implements OnInit {
  @Input() defaults;

  @Output() submitted = new EventEmitter();

  form: FormGroup;

  operators = [
    { id: 'addition', name: 'Adición' },
    { id: 'subtraction', name: 'Sustracción' },
  ];

  timeZones = [
    { id: 'UTC', name: 'UTC' },
    { id: 'America/Bogota', name: 'America/Bogota' },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      code: [, [Validators.required]],
      name: [, [Validators.required]],
      operator: [, [Validators.required]],
      time_zone: ['UTC', [Validators.required]],
      requires_comment: [true],
      keep_in_report: [true],
    });

    if (this.defaults) {
      this.form.patchValue(this.defaults);
    }
  }

  onSubmit() {
    this.submitted.emit(this.form.value);
  }
}
