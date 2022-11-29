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

  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;


  isEdit: boolean = false;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    id: new FormControl(),
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


  // files: any[] = [];
  public cambioArchivo(event: any) {
    console.log(event)
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {

        this.files.push({
          file: event.target.files[i],
          name: event.target.files[i].name
        })

        // this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        // this.nombreArchivo = event.target.files[i].name;
        // this.datosFormulario.delete('image');
        // this.datosFormulario.append('image', event.target.files[i], event.target.files[i].name)
        this.datosFormulario.append('image', event.target.files[i], event.target.files[i].name)
      }
      console.log(this.files)

    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  //Sube el archivo a Cloud Storage
  public subirArchivo() {
    let archivo = this.datosFormulario.get('image');
    console.log(archivo)
    let tarea = this.MainService.tareaCloudStorage(this.nombreArchivo, archivo);
    console.log(tarea)
    // let referencia = this.MainService.referenciaCloudStorage(this.nombreArchivo);

    //Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje: any) => {
      console.log(porcentaje)
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;
      }
    });

    // referencia.getDownloadURL().subscribe((URL) => {
    //   this.URLPublica = URL;
    // });
  }




  isHovering: boolean = false;

  files: any[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
      this.saveFile(files.item(i))
    }
    console.log(this.files)
  }


  file: any;
  task: any;
  percentage: any;
  snapshot: any;
  downloadURL: any;
  saveFile(file: any) {

    this.file = file;
    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.MainService.storage.ref(path);

    // The main task
    this.task = this.MainService.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        // this.db.collection('files').add({ downloadURL: this.downloadURL, path });
      }),
    );
  }

  isActive(snapshot: any) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
}


