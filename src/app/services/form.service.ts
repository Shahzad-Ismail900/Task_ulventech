import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, map } from 'rxjs'
import { Mapper } from '../Interfaces/Mapper';
@Injectable({
  providedIn: 'root'
})
export class FormService {
  desc: string = '';
  listOfData:any[]=[];
  constructor(private http: HttpClient) { }

  getInstance(url: string): Observable<any> {
    return this.http.get(url).pipe(map((res: any) => {
      if (res) {
        let desc = res['description'];
        this.desc = desc;
        console.log('description', desc);
        let detailDesc = desc.split(" ");
        let wordMap = {} as any;
        detailDesc.forEach((x: any) => {
          wordMap[x] = (wordMap[x] || 0) + 1;
        });
        console.log('description', wordMap);

        const record = this.LoadTop10Words(wordMap);
             const finalArray = record.splice(0,10);
        return finalArray;
      }
    }))
  }


  // Mapper is interface class
  LoadTop10Words(res: any) :any{
     // now converting word object into Array 
    Object.entries(res).map((item: any) => {
      if (item[1] > 1) {
        let words: any = {
          count: item[1],
          word: item[0]
        }
        this.listOfData.push(words);  
        this.listOfData.sort((a, b) => b.count - a.count);// orderby descending on count property
        this.listOfData = [...this.listOfData];
      }
    });
    
    return this.listOfData;
  }
}

