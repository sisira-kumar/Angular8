import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient) { }

  data1 = "http://192.168.0.117:8081/BoschApi/";
  data2 = "http://192.168.0.117:8081/BoschApi/getNetworkIP";
  pushApi="http://192.168.0.117:8081/BoschApi/pushFile/TEST0006789comp.7z";

  
  dataTab="http://192.168.0.117:8081/BoschApi/getAllRecords";
  
  getTable(){
    var b= this.http.get(this.dataTab);
    console.log(b);

    return b;
  }
  //get ip
  getSvcIpData() {
    

    var b= this.http.get(this.data2);
    console.log(b);

    return b;
  }

   //get pushApi
   getPushApiData() {
    const headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*')
    var b= this.http.get(this.pushApi);
    console.log(b);

    return b;
  }

  //get latency
  getSvcLatencyData(){
    var a= this.http.get(this.data1)

    console.log(a);

    return a;
  }

  decompUrl="http://192.168.0.117:8081/BoschApi/getDecomp";
  //get Decompress
  getDecompressData(){
  var a= this.http.get(this.decompUrl)
  console.log(a);
  return a;
  }
  

}
