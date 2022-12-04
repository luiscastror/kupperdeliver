import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';


import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss']
})
export class ModalItemComponent implements OnInit {

  isEdit: boolean = false;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    id: new FormControl(),
    description: new FormControl(),
    image: new FormControl(),
    unit: new FormControl(),
    category: new FormControl(),
    brand: new FormControl(),
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
    this.loadUnits();
    this.loadBrands();
    if (this.isEdit) {
      this.form.patchValue(this.data);
      this.files = this.data.image;
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (this.files) {
      this.files.map((f: any) => {
        delete f.file;
      })
      this.form.value['image'] = this.files;
    }
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
  loadUnits() {
    this.MainService.get_collection('units').subscribe(resp => {
      resp.forEach((doc: any) => {
        this.units.push({ ...doc.data(), id: doc.id });
      });
    })
  }

  brands: any[] = [];
  loadBrands() {
    this.MainService.get_collection('brands').subscribe(resp => {
      resp.forEach((doc: any) => {
        this.brands.push({ ...doc.data(), id: doc.id });
      });
    })
  }

  files: any = [];
  public cambioArchivo(event: any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.files.push({
          file: event.target.files[i],
          name: event.target.files[i].name,
          url: null
        })
      }
      this.files.forEach((element: any) => {
        if (element.file) {
          const path = 'items/' + Date.now() + element.name;
          this.MainService.storage.upload(path, element.file);
          setTimeout(() => {
            const ref = this.MainService.storage.ref(path);
            ref.getDownloadURL().subscribe((URL) => {
              element.url = URL
            }, err => {
              console.log(err)
            });
          }, 1000);
        }
      });
    }
  }



}


