import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  frmList:any;
  _id:any;
  listData:any;
  arrayList: any = [];
  totalCount:any;

  constructor(private formBuilder: FormBuilder,
    private _common: CommonService) {
    this.listFormGroup();
   }

  ngOnInit(): void {
    this.formLoad();
    this.listLists();
  }
  listFormGroup(){
    this.frmList = this.formBuilder.group({
      listData: ['']
    });
  }

  formLoad(): any {
    this._id = null;
    this.listData = '';
  }

  onSubmit(formData: any) {
    console.log('inside create member',formData );
    if (this._id == null || this._id == 'null') {
      this._common.create('list', formData)
        .subscribe((res: any) => {
          console.log('res', res);
          if(res.isCreated){
            this.formLoad();
            this.listLists();
            alert(res.message);
          } else {
            alert(res.message);
          }
        });
    }else {
      this._common.update('list', this._id, formData)
      .subscribe((res: any) => {
        console.log('res', res);
        if(res.isUpdated){
          alert(res.message);
          this.formLoad();
          this.listLists()
        } else {
        alert(res.message);
        }
      });

    }
   
  }

  listLists(): any {
    // this.option = 0;
    this._common
      .list('list')
      .subscribe((res: any) => {
        console.log('res', res);
        this.arrayList = res.data;
        this.totalCount = res.count;
      });
  }

  updateStatus(status:any , id:any ) {
    alert('Are You sure ? you want to change Status of this record');
        this._common.updateStatus('list', id, status).subscribe((res:any) => {
          if (res.isUpdated) {
            this.listLists();
            alert(res.message);
          } else {
            alert(res.message);
          }
        });
      }
      
  onDelete(id: any) {
    alert('Are You sure ? you want to delete this record');
        this._common.delete('list', id).subscribe((res:any) => {
          if (res.isDelete) {
            this.listLists();
            alert(res.message);
          } else {
            alert(res.message);
          }
        });
  }

  onEdit(id: any) {
    this._common.getDetails('list', id).subscribe((res:any) => {
      console.log('res in edit', res);
      
      this._id = res._id;
      this.listData = res.list_name;
    });
  }


}
