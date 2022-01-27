import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface DVL {
  value: string;
}


@Component({
  selector: 'hmw-editor-form',
  templateUrl: './editor-form.component.html'  
})
export class EditorFormComponent implements OnInit {


  editForm: FormGroup;

  public dropDownList: DVL[] = [
    { value: '10 Guy' },
    { value: '1950s Middle Finger' }
  ];

  dropDownValue = '10 Guy';


  constructor(private formGroup: FormBuilder, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {

    this.initForms();

    setTimeout(function () {
      window.dispatchEvent(new Event('resize'));
    }, 500);

  }

  initForms() {

    this.editForm = this.formGroup.group({
      topText: ['Top Text', { validators: [Validators.required] }],
      bottomText: ['Bottom Text', { validators: [Validators.required] }],
      link : ['', { disabled : true}]
    })

  }

  public onSubmit() {

  }

  public onDownload() {

  }


  ngOnDestroy() {


  }
}
