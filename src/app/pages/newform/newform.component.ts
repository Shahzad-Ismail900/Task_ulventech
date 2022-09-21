import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-newform',
  templateUrl: './newform.component.html',
  styleUrls: ['./newform.component.css']
})
export class NewformComponent implements OnInit {
  desc: string = '';
  descCount: number = 0;
  passwordVisible: boolean = false;
  lazyItemLoad: boolean = false;
  listOfData: any[] = [];
  constructor(private fb: FormBuilder, private formService: FormService) { }
  validationForm: FormGroup = this.fb.group({
    'reactiveInput': new FormControl('', Validators.required),
    'urlInput': new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')])
  })

  ngOnInit(): void {
    // to set url on the input  when component loaded
    this.validationForm.controls['urlInput'].setValue('https://random-data-api.com/api/restaurant/random_restaurant');
  }

  LoadUrlData(form: any) {
    debugger;
    this.validateAllFields(form);
    if (!form.invalid) {
      this.listOfData = [];
      // this will call the API and load description and will check counting and then load top10 word.
      this.formService.getInstance(form.value.urlInput).subscribe((res) => {
        if (res) {

          this.desc = this.formService.desc;
          let descCount = this.formService.desc.split(" ");
          if (descCount.length > 0) {
            this.descCount = descCount.length;   /// To Get Word Counts
          }
          // res will be sorted description field all the logic written in Service
          this.listOfData = res;
        }
      });
    }
  }
onSubmitForm(validationForm:any){
  this.validateAllFields(validationForm);
    if(validationForm.valid)
    {
      // write your logic here
    }
}
  //Form Validations
  validateAllFields(form: FormGroup) {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty();
        control.updateValueAndValidity();
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }




}
