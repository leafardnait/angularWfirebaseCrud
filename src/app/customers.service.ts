import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Customers } from 'src/app/customers.model';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(public firestore: AngularFirestore) { }
  
  public getCustomers() {
    return this.firestore.collection('customers').snapshotChanges();
  }
  public getCustomerRow(id: string) {
    return this.firestore.collection("customers").doc(id).snapshotChanges();
  }
  public addCustomer(customer : Customers){
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection("customers").add(customer)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }
  public updateCustomer(id, _data){
    return this.firestore.collection('customers').doc(id).set(_data);
  }
  public deleteCustomer(id) {
    return this.firestore.collection("customers").doc(id)
      .delete();
  }
}
