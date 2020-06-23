import {
  OnInit,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'kirby-novelty-types-search-form',
  templateUrl: './novelty-types-search-form.component.html',
  styleUrls: ['./novelty-types-search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoveltyTypesSearchFormComponent implements OnInit {
  @Output() submitted = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      search: [],
      page: 1
    });
  }

  onSubmit() {
    this.submitted.emit(this.form.value);
  }
}
