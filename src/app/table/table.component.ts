import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NetworkService } from '../service/network.service';

declare var $: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  title = 'datatable';
  users: any;
  dataTable: any;

  constructor(private svc:NetworkService,private chRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.LoadCurrentReport();
  }
   LoadCurrentReport() {
 
  this.svc.getTable().subscribe(data => {
      this.users = data;
      this.chRef.detectChanges();
      const table: any = $('table');
      this.dataTable = table.DataTable();
      console.log(this.users);
    });
  }

}
