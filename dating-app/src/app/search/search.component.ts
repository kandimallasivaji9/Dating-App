import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SearchService} from "./search.service";
import {Response} from "@angular/http";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  searchData = [];
  displaySearchResults = [];
  age: number;
  phone: number;
  cell: number;
  email: string;
  selectedGender;
  newSearchData = [];
  ageFilteredData = [];


  constructor(private searchDataService: SearchService) {
  }

  ngOnInit() {
    this.searchDataService.getSearchData(this.searchData)
      .subscribe(
        (data: Response) => {
          this.searchData = data.json().results;
          console.log(this.searchData);
          for (let i = 0; i <= this.searchData.length; i++) {
            let dob = (this.searchData[i].dob).split('-');
            let currentTime = new Date();
            let year = currentTime.getFullYear();
            let birthYear = parseInt(dob[0]);
            this.searchData[i].age = year - birthYear;
            this.displaySearchResults = this.searchData;
          }
        }
      );
  }

  onButtonClick(event: any) {
    for (let i = 0; i <= this.displaySearchResults.length; i++) {
      if (parseInt(event.currentTarget.id) === i) {
        this.phone = this.displaySearchResults[i].phone;
        this.cell = this.displaySearchResults[i].cell;
        this.email = this.displaySearchResults[i].email;
      }

    }

  }


  filterList(form: NgForm) {
    this.newSearchData = [];
    this.displaySearchResults = [];
    this.ageFilteredData = [];
    if ((form.value.gender === 0 || !form.value.gender) && (!form.value.ageMin && !form.value.ageMax)) {
      this.selectedGender = 'any';
      if (this.selectedGender === 'any') {
        this.displaySearchResults = this.searchData
      }
    } else if (form.value.gender === 1 && (!form.value.ageMin && !form.value.ageMax)) {
      this.selectedGender = 'male';
      for (let details of this.searchData) {
        if ((details.gender.toLowerCase() === this.selectedGender) && this.selectedGender === 'male') {
          this.newSearchData.push(details);
          this.displaySearchResults = this.newSearchData;
        }
      }
    } else if (form.value.gender === 2 && (!form.value.ageMin && !form.value.ageMax)) {
      this.selectedGender = 'female';
      for (let details of this.searchData) {
        if ((details.gender.toLowerCase() === this.selectedGender) && this.selectedGender === 'female') {
          this.newSearchData.push(details);
          this.displaySearchResults = this.newSearchData;
        }
      }
    } else {
      if (form.value.gender === 0 || !form.value.gender) {
        this.selectedGender = 'any';
      } else if (form.value.gender === 1) {
        this.selectedGender = 'male';
      } else {
        this.selectedGender = 'female';
      }
    }
    if (form.value.ageMin && !form.value.ageMax) {
      for (let age in this.searchData) {
        for (let i = 0; i <= this.searchData.length; i++) {
          if (this.searchData[i].age >= form.value.ageMin && this.searchData[i].gender.toLowerCase() === this.selectedGender) {
            this.ageFilteredData.push(this.searchData[i]);
            this.displaySearchResults = this.ageFilteredData;
          } else if (this.searchData[i].age >= form.value.ageMin && (!this.selectedGender || this.selectedGender === 'any')) {
            this.ageFilteredData.push(this.searchData[i]);
            this.displaySearchResults = this.ageFilteredData;
          }
        }
      }
    } else if (!form.value.ageMin && form.value.ageMax) {
      for (let age in this.searchData) {
        for (let i = 0; i <= this.searchData.length; i++) {
          if (this.searchData[i].age <= form.value.ageMax && this.searchData[i].gender.toLowerCase() === this.selectedGender) {
            this.ageFilteredData.push(this.searchData[i]);
            this.displaySearchResults = this.ageFilteredData;
          } else if (this.searchData[i].age <= form.value.ageMax && (!this.selectedGender || this.selectedGender === 'any')) {
            this.ageFilteredData.push(this.searchData[i]);
            this.displaySearchResults = this.ageFilteredData;
          }
        }
      }
    } else if (form.value.ageMin && form.value.ageMax) {
      for (let age in this.searchData) {
        for (let i = 0; i <= this.searchData.length; i++) {
          if (this.searchData[i].age <= form.value.ageMax && this.searchData[i].age >= form.value.ageMin && this.searchData[i].gender.toLowerCase() === this.selectedGender) {
            this.ageFilteredData.push(this.searchData[i]);
            this.displaySearchResults = this.ageFilteredData;
          } else if (this.searchData[i].age <= form.value.ageMax && this.searchData[i].age >= form.value.ageMin && (!this.selectedGender || this.selectedGender === 'any')) {
            this.ageFilteredData.push(this.searchData[i]);
            this.displaySearchResults = this.ageFilteredData;
          }
        }
      }
    }
  }

  reset() {
    this.displaySearchResults = this.searchData;
  }

}
