import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/customers.service';
import { Customers } from 'src/app/customers.model';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
    addCustomerForm:FormGroup;

  constructor(
    private _customer : CustomersService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
    this.addCustomerForm = new FormGroup ({
      fname: new FormControl (null, [Validators.required, Validators.maxLength(50)]),
      lname: new FormControl (null, [Validators.required, Validators.maxLength(50)]),
      gender: new FormControl (null, [Validators.required, Validators.maxLength(50)]),
      email: new FormControl (null, [Validators.required, Validators.maxLength(50)])
    });
  }

  public saveCustomer(form):void{
    this._customer.addCustomer(form.value);
    this.router.navigate(['customers']);
  }
}
