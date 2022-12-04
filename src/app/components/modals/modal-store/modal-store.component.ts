import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-store',
  templateUrl: './modal-store.component.html',
  styleUrls: ['./modal-store.component.scss']
})
export class ModalStoreComponent implements OnInit {

  isEdit: boolean = false;

  form = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    address: new FormControl(),
    neighborhood: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
    latitud: new FormControl(),
    longitud: new FormControl(),

  });

  constructor(
    public dialogRef: MatDialogRef<ModalStoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data != null ? true : false;
  }

  ngOnInit(): void {
    this.loadPosition();
    if (this.isEdit) {
      this.form.setValue(this.data)
    }
  }

  loadPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      this.form.patchValue({
        latitud: position.coords.latitude,
        longitud: position.coords.longitude
      });
    });
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
