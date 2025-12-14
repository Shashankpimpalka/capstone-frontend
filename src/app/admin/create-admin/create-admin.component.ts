import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../../admin';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {

  admin: Admin = new Admin();

  constructor(private adminService:AdminService,
    private router:Router){

    }

  ngOnInit(): void {
    
  }

  saveAdmin(){
    // this.adminService.createAdmin(this.admin).subscribe(data=>{
    //   console.log(data);
    //   this.goToAdminList();
    // },
    // error => console.log(error));

    this.adminService.createAdmin(this.admin).subscribe(
      {
        next : (data) =>  { console.log(data); 
          this.goToAdminList() },
        error : (error) => console.log("Error " , error)      }
    )
  }


  goToAdminList(){
    this.router.navigate(['/admin'])
  }

  saveAdminOnClick(){
    console.log(this.admin);
    this.saveAdmin();
  }



}
