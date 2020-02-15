import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/customers.service';
import { Customers } from 'src/app/customers.model';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

    editCustomerForm:FormGroup;
    id:string;

    constructor(
      private _customer : CustomersService,
      private route : ActivatedRoute,
      private router : Router
    ) { }

    ngOnInit() {
      this.editCustomerForm = new FormGroup ({
        fname: new FormControl (null, [Validators.required, Validators.maxLength(50)]),
        lname: new FormControl (null, [Validators.required, Validators.maxLength(50)]),
        gender: new FormControl (null, [Validators.required, Validators.maxLength(50)]),
        email: new FormControl (null, [Validators.required, Validators.maxLength(50)])
      });

      this.id = this.route.snapshot.paramMap.get("id");
      this.getCustomers();
    }

    getCustomers() {
      this._customer.getCustomerRow(this.id)
      .subscribe(res => {
        this.editCustomerForm.controls['fname'].setValue (res.payload.data()['fname']);
        this.editCustomerForm.controls['lname'].setValue (res.payload.data()['lname']);
        this.editCustomerForm.controls['gender'].setValue (res.payload.data()['gender']);
        this.editCustomerForm.controls['email'].setValue (res.payload.data()['email']);
      });  
    }


    updateCustomer(form){
      this._customer.updateCustomer(this.id, form.value)
      .then(
        res => {
          this.router.navigate(['customers']);
        }
      )
    }

}
