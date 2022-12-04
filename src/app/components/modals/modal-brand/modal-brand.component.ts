import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-brand',
  templateUrl: './modal-brand.component.html',
  styleUrls: ['./modal-brand.component.scss']
})
export class ModalBrandComponent implements OnInit {


  isEdit: boolean = false;

  form = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    description: new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<ModalBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data != null ? true : false;
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.form.setValue(this.data)
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close({
      payload: this.form.value,
      edit: this.isEdit
    });
  }

}
