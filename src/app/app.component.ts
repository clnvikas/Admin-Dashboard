import { Component, OnInit } from '@angular/core';
import { UserDataService } from './user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AdminUi';
  
  constructor(
    private uds: UserDataService
  ){

  }

  ngOnInit(){
  this.getData();
  }

  pageNumber:number = 1;
  userData: any = [];
  name: any;
  key: string = 'name';
  reverse:boolean = false;
  isMasterSel:boolean = false;

  getData() {
    this.uds.getUserData().subscribe(data=>{
      this.userData = data;
      console.log('data',this.userData);
      this.userData.forEach((element: any) => {
        element.isEdit = false;
      });
      console.log('data edited',this.userData);
    })
   
  }

  search(){
    if(this.name == ""){
      this.ngOnInit();
    }else{
      this.userData = this.userData.filter((res:any) =>{
        return res.email.toLocaleLowerCase().match(this.name.toLocaleLowerCase()) 
        || res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
        || res.role.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
      })
    }
    
  }

  sort(key: any){
    this.key = key;
    this.reverse = !this.reverse;
  }

  removeItem(item: any){
    console.log('Delete',item);
    
    const index = this.userData.indexOf(item, 0);
    if (index > -1) {
      this.userData.splice(index, 1);
    }
  }

  editUser(item: any){
    item.isEdit = !item.isEdit;
    console.log('edit value', item.isEdit);
    
  }

  checkUncheckAll(ev: any){
    this.userData.forEach( (data: any) => {
        return data.checked = ev.target.checked;
      });
  }

  isAllCheckBoxChecked() {
		return this.userData.every((p: { checked: any; }) => p.checked);
	}

  deleteSelected(){
    let selectedArr: any[] = [];
    this.userData.forEach((user: any) => {
      if (!user.checked) {
        selectedArr.push(user);
      }
    });
    console.log('selectedArr',selectedArr);
    this.userData = selectedArr;
    selectedArr = [];
  }
}
