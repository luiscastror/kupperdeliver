import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss']
})
export class ModalItemComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(),
    image: new FormControl(),
    unit: new FormControl(),
    category: new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<ModalItemComponent>
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

}
