import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/customers.service';
import { Customers } from 'src/app/customers.model';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  editDocumentForm:FormGroup;
  id:string;

  constructor(
    private _customer : CustomersService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  customerRow;
  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get("id");
    this._customer.getCustomerRow(this.id)
    .subscribe(res => {
      this.customerRow = res.payload.data();
    });  
  }
  

}
