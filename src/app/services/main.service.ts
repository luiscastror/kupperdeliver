
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  // Create a document
  public create(collection: string, payload: any) {
    return this.firestore.collection(collection).add(payload);
  }

  // Update a document
  public update(collection: string, uid: string, payload: any) {
    return this.firestore.collection(collection).doc(uid).set(payload);
  }

  // Get collection one time
  public get_collection(collection: string) {
    return this.firestore.collection(collection).get();
  }

  // Get collection with params for where
  public get_collection_where(collection: string, query: any) {
    return this.firestore.collection(collection, ref =>
      ref.where('x_extra1', "==", query)
    ).get();
  }

  // Get collection realtime
  public get_realtime(collection: string) {
    return this.firestore.collection(collection).snapshotChanges();
  }

  //Obtiene un gato
  public getCat(documentId: string) {
    return this.firestore.collection('cats').doc(documentId).snapshotChanges();
  }



}
