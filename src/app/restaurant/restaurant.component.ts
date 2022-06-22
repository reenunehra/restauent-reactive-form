import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  NgForm
} from '@angular/forms';
import { MyserviceService } from '../services/myservice.service'; //{MyserviceService} is a class name in service file

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  menuList : any;
  postData : any = {};

  constructor(private formBuilder : FormBuilder, private myServices : MyserviceService ) { }

  ngOnInit(): void {
    this.menusList();
  }

  menusList(){
    this.menuList = this.formBuilder.group({
      dishName : ['',Validators.required],
      
      category : ['',Validators.required],


      tags : ['',Validators.required],

      size : this.formBuilder.array([
        this.formBuilder.group({          // array of object     
          type:['',Validators.required], // '' this is for default value in input field
          price:['',Validators.required],
          qty:['',Validators.required]
        })
      ]),      
      
      dishImage : [null], 

      dishImageGallery :  [null] 

    });
  }

  menuForm(form : NgForm){
    let data = form.value
    console.log("form",form);
    console.log("all",data);

    let menuData= {
      dishName: data.dishName,
      category: data.category,
      tags: data.tags,
      size: data.size,
      dishImage: data.dishImage,
      dishImageGallery: data.dishImageGallery
    }
    console.log("menuData",menuData);

    this.myServices.postData('/api/v1/addmenu',menuData).subscribe(

      (res:any)=>{
        console.log(res);
        if(res.sucess === true){
          this.ResetForm(form)
        }
      },
      (err:any)=>{
        console.log(err);
      }     
    )
  };

  ResetForm(form : any){
    form.reset();
    form.submitted = false
    }
    
// add new form group to size array
    addMenuField(){
      let control = <FormArray>this.menuList.controls.size;
      control.push(
        this.formBuilder.group({          // array of object     
          type:['',Validators.required], // '' this is for default value in input field
          price:['',Validators.required],
          qty:['',Validators.required]
        })
      );
    }  

    removeMenuField(index: any = 0){
      let control = <FormArray>this.menuList.controls.size;
      control.removeAt(index);
    }

// ----------------------------------------------
    get size() {
      return this.menuList.get('size') as FormArray;
    }

    get type(){
      return this.size.get('type');
    }

    get price(){
      return this.size.get('price');
    }

    get qty(){
      return this.size.get('qty');
    }

    get dishImageGallery() {
      return this.menuList.get('dishImageGallery') as FormArray;
    }
}
