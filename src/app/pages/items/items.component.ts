import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalItemComponent } from 'src/app/components/modals/modal-item/modal-item.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  constructor(public MatDialog: MatDialog) { }

  ngOnInit(): void {
  }


  new() {
    const dialogRef = this.MatDialog.open(ModalItemComponent, {
      minWidth: '40%',
      maxWidth: '80%',
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log(data)
      }
      console.log('The dialog was closed');
    });
  }

}
