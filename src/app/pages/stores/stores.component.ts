import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalStoreComponent } from 'src/app/components/modals/modal-store/modal-store.component';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {


  items: any[] = [];
  collection: string = 'stores';
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
    const dialogRef = this.MatDialog.open(ModalStoreComponent, {
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
