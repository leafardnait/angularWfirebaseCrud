import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/customers.service';
import { Customers } from 'src/app/customers.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers;
  listCustomers;

  constructor(private customersService: CustomersService) { }

  ngOnInit() {
    this.customersService.getCustomers().subscribe(data => {
        this.customers = data.map(e => {
          return {
            id: e.payload.doc.id,
            data: e.payload.doc.data()
          };
        })
    });
  }
  public deleteCustomer = data => this.customersService.deleteCustomer(data);
}
