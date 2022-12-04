import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalBrandComponent } from 'src/app/components/modals/modal-brand/modal-brand.component';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {


  items: any[] = [];
  collection: string = 'brands';
  constructor(
    public MatDialog: MatDialog,
    public MainService: MainService
  ) { }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.items = [];
    this.MainService.get_collection(this.collection).subscribe(resp => {
      resp.forEach((doc: any) => {
        this.items.push({ ...doc.data(), id: doc.id });
      });
    })
  }

  modal(data: any = null) {
    const dialogRef = this.MatDialog.open(ModalBrandComponent, {
      minWidth: '40%',
      maxWidth: '80%',
      data: data != null ? data : null
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data.edit) {
          this.MainService.update(this.collection, data.payload.id, data.payload);
        } else {
          this.MainService.create(this.collection, data.payload);
        }
        this.get();
      }
    });
  }

}
