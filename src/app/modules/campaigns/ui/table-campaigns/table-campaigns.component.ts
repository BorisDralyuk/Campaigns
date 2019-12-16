import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Campaign } from '../../shared/interfaces';

@Component({
  selector: 'app-table-campaigns',
  templateUrl: './table-campaigns.component.html'
})
export class TableCampaignsComponent implements OnInit {

  btnCreate = 'Create campaign';
  dataSource: MatTableDataSource<Campaign>;
  
  @Input() loading: boolean;
  @Input() data: Campaign[];
  @Input() displayedColumns: string[];

  @Output() onEdit: EventEmitter<string> = new EventEmitter();
  @Output() onCreate: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {  
      this.dataSource = new MatTableDataSource<Campaign>(this.data);
      this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(key) {
    this.onEdit.emit(key)
  }

  create() {
    this.onCreate.emit()
  }

}
