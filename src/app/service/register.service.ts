import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  closeResult = '';
  u?:User;
  user =new  User();
  selectUser? :  User;
  i?: number;
  vall: boolean=false;
  listUser: User[]=[];
  searchValue: string='';
  idMax: number=0;
  activeindex : any;
  setCurrentUser?:any;
  isUpdate: Boolean= false;
  statusName='';
  statusValue: Boolean=false;
  fileName= 'ExcelSheet.xlsx';

  minDate?: Date;
  maxDate?: Date;

  containerClass?: string;
  showWeekNumbers?: boolean;
  dateInputFormat?: string;


 //userid: number[];
 //setCurrentSurvey_id:number;
 //uc:number;


 //unamePattern = "^[ a-zA-Z0-9 ]$";
 unamePattern = "[A-Za-z0-9éè ]*";
 //namePattern = "[a-zA-Z]*";
  //pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{9}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  element?: ElementRef;
  hh:any;

  private _url: string="/assets/liste-pays.json";



  constructor(private formbuilder: FormBuilder, private router: Router,
    private modalService: NgbModal,private activemodal:NgbActiveModal
     , private activeRoute: ActivatedRoute,private httpClient: HttpClient) {

    // this.listUser=[
    //   {firstName:'Ablaye', lastName: 'Dia',email: 'ablaye@gmail.com' , telephone: '772348595', adresse: 'Parcelle unite 3',dateNai: "1/3/1988" , code:123},
    //    {firstName:'Zoubeida', lastName: 'Ndiaye',email: 'zou@gmail.com' , telephone: '703398899',dateNai:"09/07/1993", adresse: 'Grand mbour' , code:291}
    //    ];
    //   this.registerForm = this.formbuilder.group({


    //     firstName: ['', [Validators.required,Validators.minLength(2),Validators.pattern(this.unamePattern)] ],
    //     lastName:['', [Validators.required,Validators.minLength(2), Validators.pattern(this.unamePattern)]],
    //     email: ['',[Validators.required, Validators.pattern(this.emailPattern)]],
    //     telephone: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
    //     adresse: ['', [Validators.required,Validators.minLength(3)]],
    //     dateNai: ['', Validators.required]





    //   });


  }

  // getstatus(): string{
  //   if(this.statusValue === false){
  //     this.statusName= 'Ajouter';
  //   }else{
  //     this.statusName= 'Modifier';
  //   }
  //    return this.statusName;
  //   }

  //   editData(user: User , i: number){
  //     //this.isUpdate= true;

  //     this.setCurrentUser=i;
  //     //this.listUser[setCurrentUser]= this.u[i];

  //     this.registerForm = this.formbuilder.group({


  //       firstName: [this.listUser[this.setCurrentUser].firstName, [Validators.required,Validators.minLength(2),Validators.pattern(this.unamePattern)] ],
  //       lastName:[this.listUser[this.setCurrentUser].lastName, [Validators.required,Validators.minLength(2), Validators.pattern(this.unamePattern)]],
  //       email: [this.listUser[this.setCurrentUser].email,[Validators.required, Validators.pattern(this.emailPattern)]],
  //       telephone: [this.listUser[this.setCurrentUser].telephone, [Validators.required, Validators.pattern(this.mobnumPattern)]],
  //       adresse: [this.listUser[this.setCurrentUser].adresse, Validators.required],
  //       dateNai: [this.listUser[this.setCurrentUser].dateNai, Validators.required]

  //       });


  //       }



      // reset(){
      //   this.registerForm = this.formbuilder.group({


      //     firstName: ['', [Validators.required,Validators.minLength(2),Validators.pattern(this.unamePattern)] ],
      //     lastName:['', [Validators.required,Validators.minLength(2), Validators.pattern(this.unamePattern)]],
      //     email: ['',[Validators.required, Validators.pattern(this.emailPattern)]],
      //     telephone: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
      //     adresse: ['', Validators.required],
      //     dateNai: ['', Validators.required]





      //   });

      // }


  //     OnSelect(user: User)
  // {
  //  this.selectUser=user;

  //   console.log(this.selectUser)
  // }

  // open(content: any) {
  //   this.activemodal=this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  //   }

  //   open1(content: any) {
  //    this.activemodal=this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  //    }

// addUser(){


//       this.vall = true;

//       this.listUser.push(this.registerForm?.value);
//       console.log("user",this.registerForm?.value)
//       this.reset();
//       this.activemodal.close();

// }

// onUpdate(user: User,i:number){

//     const index =this.listUser.indexOf(user,0);
//     this.listUser.unshift(this.registerForm.value);
//     i=index;
//     this.listUser.splice(i,1);
//     this.reset();
//     this.activemodal.close();


//   }







  // onSubmit() {

  //   user: User;
  //   this.vall= true;

  //   if(this.registerForm.valid){

  //               if(this.isUpdate==false){

  //                   this.addUser();


  //               }else{
  //                 this.onUpdate(this.user, this.setCurrentUser);
  //               }
  //               this.isUpdate=false;
  //             }



  //           }

  //           telInputObject(obj: any) {
  //             console.log(obj);
  //             obj.setCountry('sn');
  //           }


  //           hasError(obj: any) {
  //             console.log(obj);
  //             //obj.setCountry('in');
  //           }
  //          getNumber(obj: any) {
  //             console.log(obj);
  //             //obj.setCountry('in');
  //           }


  //           onCountryChange(obj: any) {
  //             console.log(obj);
  //            // obj.setCountry('in');
  //           }
















  // getAllData(): User[]{

  //   return this.listUser;
  //  }



   getPays(){

    //Headers
  //Get the http get method working for me
  return  this.httpClient.get(this._url);


}



//  onDelete(u: User){

//         const index = this.listUser.indexOf(u , 0);
//         if(index> -1){
//           this.listUser.splice(index,1);
//         }

//       }






}
