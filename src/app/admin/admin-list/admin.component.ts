import { Component, OnInit } from '@angular/core';
import { Admin } from '../../admin';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admins!:Admin[];

  constructor(private adminService:AdminService,
    private router:Router){}

  ngOnInit(): void {
    this.getAdmins();
      }

  private getAdmins(){
  this.adminService.getAdminList().subscribe(
    data=>{this.admins = data});
}


updateAdmin(){
  this.router.navigate(['create-admin']);
}

deleteAdmin(id: number){
  this.adminService.deleteAdmin(id).subscribe( data => {
    console.log(data);
    this.getAdmins();
  })
}

}
