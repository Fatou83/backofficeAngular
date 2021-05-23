import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-form-rgister',
  templateUrl: './form-rgister.component.html',
  styleUrls: ['./form-rgister.component.css'],

})
export class FormRgisterComponent implements OnInit {
  minDate= new Date(1,1,1980);
  maxDate= new Date(1,1,2021);

  constructor( ) { }

  ngOnInit(): void {

  }


  telInputObject(obj: any) {
    console.log(obj);
    obj.setCountry('sn');
  }
  hasError(){

  }
getNumber(){

}
onCountryChange(){

}

}
