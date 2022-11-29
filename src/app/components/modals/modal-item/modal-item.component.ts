import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss']
})
export class ModalItemComponent implements OnInit {

  isEdit: boolean = false;

  form = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    description: new FormControl(),
    image: new FormControl(),
    unit: new FormControl(),
    category: new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<ModalItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public MainService: MainService
  ) {
    this.isEdit = data != null ? true : false;
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadUnit();
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

  categories: any[] = [];
  loadCategories() {
    this.MainService.get_collection('categories').subscribe(resp => {
      resp.forEach((doc: any) => {
        this.categories.push({ ...doc.data(), id: doc.id });
      });
    })
  }

  units: any[] = [];
  loadUnit() {
    this.MainService.get_collection('units').subscribe(resp => {
      resp.forEach((doc: any) => {
        this.units.push({ ...doc.data(), id: doc.id });
      });
    })
  }

}
