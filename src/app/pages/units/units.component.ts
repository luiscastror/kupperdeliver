import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalUnitComponent } from 'src/app/components/modals/modal-unit/modal-unit.component';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {

  items: any[] = [];
  collection: string = 'units';
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
    const dialogRef = this.MatDialog.open(ModalUnitComponent, {
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
