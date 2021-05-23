import { RegisterService } from './../service/register.service';
import { ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormRgisterComponent } from '../form-rgister/form-rgister.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/User';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';







/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],


})



export class HomeComponent implements OnInit  {

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
    paysList: any;
    pat: string='';
    errorMessage='';
    messagePiece= '';
    //listeTypePiece<an
  minDate= new Date(1,1,1980);
  maxDate= new Date(1,1,2021);
  @Input() deviceXS?: boolean;

  isPopupOpened = true;
  registerForm: FormGroup;
  //@ViewChild(MatSort) sort: MatSort;
  constructor(private formbuilder: FormBuilder, private router: Router,
    private modalService: NgbModal,private activemodal:NgbActiveModal
     , private activeRoute: ActivatedRoute,private uservice: RegisterService ) {

      this.listUser=[
        {firstName:'Ablaye', lastName: 'Dia',email: 'ablaye@gmail.com' , telephone: '772348595',
        adresse: 'Parcelle unite 3',dateNai: "1/3/1988" , genre:"M",ville: "Thies", pays: "Senegal",tPiece: "CNI",
         numPiece: 12345678912345},

         {firstName:'Zoubeida', lastName: 'Ndiaye',email: 'zou@gmail.com' , telephone: '703398899',dateNai:"09/07/1993", adresse: 'Grand mbour',
         genre:"F" ,ville: "Dakar", pays: "Senegal" , tPiece: "CNI",
          numPiece: 2012345678912
         }
         ];
        this.registerForm = this.formbuilder.group({


          firstName: ['', [Validators.required,Validators.minLength(2),Validators.pattern(this.unamePattern)] ],
          lastName:['', [Validators.required,Validators.minLength(2), Validators.pattern(this.unamePattern)]],
          email: ['',[Validators.required, Validators.pattern(this.emailPattern)]],
          telephone: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
          adresse: ['', [Validators.required,Validators.minLength(3)]],
          dateNai: ['', Validators.required],
          genre: ['', Validators.required],
          ville: ['', Validators.required],
          pays: ['', Validators.required],
          tPiece: ['', Validators.required],
          numPiece: [null, [Validators.required]]


        });
    }

    reset(){
      this.registerForm = this.formbuilder.group({


        firstName: ['', [Validators.required,Validators.minLength(2),Validators.pattern(this.unamePattern)] ],
        lastName:['', [Validators.required,Validators.minLength(2), Validators.pattern(this.unamePattern)]],
        email: ['',[Validators.required, Validators.pattern(this.emailPattern)]],
        telephone: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
        adresse: ['', Validators.required],
        dateNai: ['', Validators.required],
        genre: ['', Validators.required],
        ville: ['', Validators.required],
        pays: ['', Validators.required],
        tPiece: ['', Validators.required],
        numPiece: [null, [Validators.required]]
      });

    }


  ngOnInit() {
    //this.dataSource.sort= this.sort;
    this.uservice.getPays().subscribe(data =>{
      this.paysList=data;
    });

  }


  getstatus(): string{
    if(this.statusValue === false){
      this.statusName= 'Ajouter';
    }else{
      this.statusName= 'Modifier';
    }
     return this.statusName;
    }

  open(content: any) {
    this.activemodal=this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    open1(content: any) {
     this.activemodal=this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
     }

editData(user: User , i: number){
  //this.isUpdate= true;

  this.setCurrentUser=i;
  //this.listUser[setCurrentUser]= this.u[i];

  this.registerForm = this.formbuilder.group({


    firstName: [this.listUser[this.setCurrentUser].firstName, [Validators.required,Validators.minLength(2),Validators.pattern(this.unamePattern)] ],
    lastName:[this.listUser[this.setCurrentUser].lastName, [Validators.required,Validators.minLength(2), Validators.pattern(this.unamePattern)]],
    email: [this.listUser[this.setCurrentUser].email,[Validators.required, Validators.pattern(this.emailPattern)]],
    telephone: [this.listUser[this.setCurrentUser].telephone, [Validators.required, Validators.pattern(this.mobnumPattern)]],
    adresse: [this.listUser[this.setCurrentUser].adresse, Validators.required],
    dateNai: [this.listUser[this.setCurrentUser].dateNai, Validators.required],
    genre: [this.listUser[this.setCurrentUser].genre, Validators.required],
    ville: [this.listUser[this.setCurrentUser].ville, Validators.required],
    pays: [this.listUser[this.setCurrentUser].pays, Validators.required],
    tPiece: [this.listUser[this.setCurrentUser].tPiece, Validators.required],
    numPiece: [this.listUser[this.setCurrentUser].numPiece, Validators.required]
    });
    }



// applyFilter(filterValue: string){
//   this.listData?.filter= filterValue.trim().toLowerCase();

// }





checkPiece(){

  //erreurMessag == vide
  this.errorMessage='';
  let numPiece=this.registerForm?.get('numPiece')?.value;
  let genre=this.registerForm?.get('genre')?.value;
  let tPiece=this.registerForm?.get('tPiece')?.value;

  let value = numPiece.toString();
  if(genre!='' && numPiece!='' && tPiece!=''){



  if(value[0]!='1' && value[0] !='2'){
    this.errorMessage='Ce champs doit commencer par 1 ou 2';
  }else{

    if(value[0]==='1' && this.registerForm?.get('genre')?.value!='M'){
      this.errorMessage="Le numéro de pièce de l'homme doit commencer par 1";

    }
    if(value[0]==='2' && this.registerForm?.get('genre')?.value!='F'){
      this.errorMessage='Le numéro de pièce de la femme doit commencer par 2';

    }
  }

  }



  //verification si le numero de piece est differnt de vide et le genre , le type de piece et le num de piece
//recuperer l numero de piece



}

selectPiece(){
  //SI cest !vide
 let val= this.registerForm?.get('tPiece')?.value;


 if(val!=''){


  if( val==='Passeport'){
    this.setValidatorsMethode(this.registerForm,['numPiece'], 8,8);
    this.messagePiece='Ce champs doit prendre 8 caractères';
  }else if(val==='CNI'){
    this.setValidatorsMethode(this.registerForm,['numPiece'], 13,14);
    this.messagePiece='Ce champs doit prendre 13 ou 14 caractères';
  }else{
    this.setValidatorsMethode(this.registerForm,['numPiece'], 17,17);
    this.messagePiece='Ce champs doit prendre 17 caractères';

  }

  //recuperer la valeur du type de piece
  //si c'est un passeport minlength =8 et maxlength)=8
  // messagePiece prend le numbr de caractere(ou ce champ doit prendre nbr carat)
  //si c'est un CNI minlength =13 et maxlength)=14

   //si c'est un CEDEAO minlength =17 et maxlength)=17



 }
}




clearValidatorsMethode(registerForm: any, tab: any) {
  for (const key in registerForm.controls) {
    if (tab.indexOf(key) != -1) {
      registerForm.get(key).clearValidators();

      registerForm.get(key).updateValueAndValidity();
      // form.get(key).setValue('');
    }
  }
}


setValidatorsMethode(registerForm: any, tab: any, minLength:any, maxLength: any) {
  for (const key in registerForm.controls) {
    if (tab.indexOf(key) != -1) {
      registerForm.get(key).setValidators(Validators.required, Validators.maxLength, Validators.minLength);
      // Validators.compose([
      // ]);

      registerForm.get(key).updateValueAndValidity();
      // form.get(key).setValue('');
    }
  }
}








addUser(){


  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "De vouloir ajouter un utilisateur",
    icon: 'info',
    showCancelButton: true,
    cancelButtonText: 'Annuler',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmer'
  }).then((result) => {
    if (result.isConfirmed) {

this.vall = true;

this.listUser.push(this.registerForm?.value);
 console.log(this.registerForm?.value.dateNai);
 console.log(this.registerForm?.value.genre);
 console.log(this.registerForm?.value.pays);
this.reset();
this.activemodal.close();
Swal.fire(
  'Ajouter',
  'Votre utilisateur a été ajouté',
  'success'
)
}
})





}

onUpdate(user: User,i:number){


Swal.fire({
title: 'Êtes-vous sûr?',
text: "vous ne pourrez pas annuler cela!",
icon: 'warning',
showCancelButton: true,
cancelButtonText: 'Annuler',
confirmButtonColor: '#3085d6',
cancelButtonColor: '#d33',
confirmButtonText: 'Confirmer'
}).then((result) => {
if (result.isConfirmed) {

const index =this.listUser.indexOf(user,0);
this.listUser.unshift(this.registerForm?.value);
i=index;
this.listUser.splice(i,1);
this.reset();
this.activemodal.close();

Swal.fire(
'Modifier',
'Votre utilisateur a été modifié',
'success'
)
}
})




}



 onSubmit() {

    user: User;
    this.vall= true;

    if(this.registerForm?.valid){

                if(this.isUpdate==false){

                    this.addUser();


                }else{
                  this.onUpdate(this.user, this.setCurrentUser);
                }
                this.isUpdate=false;
              }



            }










telInputObject(obj: any) {
  console.log(obj);
  obj.setCountry('sn');
}
hasError(obj: any){

}
getNumber(obj: any){

}
onCountryChange(obj: any){

}
OnSelect(user: User)
  {
   this.selectUser=user;

    console.log(this.selectUser)
  }

  getAllData(): User[]{

    return this.listUser;
   }



 onDelete(u: User){


    Swal.fire({
      title: 'Supprimer un utilisateur?',
      text: "Vous etes sur de vouloir supprimer un utilisateur?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmer!'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.listUser.indexOf(u , 0);
        if(index> -1){
          this.listUser.splice(index,1);
        }
        Swal.fire(


          'utilisateur supprimé',
          'success'
        )
      }
    });
  }



}
