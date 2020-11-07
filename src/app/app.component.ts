import { Component, OnInit } from '@angular/core';
import { NetworkService } from './service/network.service';
import { HttpEvent, HttpEventType, HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app1.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {

  constructor(private svc:NetworkService,private http: HttpClient, private sanitizer: DomSanitizer){
    // Usage

  
  }


  title = 'my-app';
  val:any[]=["http://192.168.0.128:8080/ipfs/QmZBEiRM5uHwmoebsanMvCeKBtziuQ7i1N2FGhgQhqxs6P"]
  res:any="";
  i:number=0;
  svcLatency:any;
  activeId:number=1;
  loader:boolean=false;
  ip="192.168.0.128";
  tarIp:any;
  $:any;

  ngOnInit(){
    //this.getSysIp();
    this.getIp();
  }

 
  //get IP
  ipPeer:any;
  getIp():any {
    //get ip of system
    this.svc.getSvcIpData()
      .subscribe(
        (data: any) => {
        this.ipPeer=data;
        this.IpAssign();
      });
  }
  
  //get latency
  getLatency(){
    this.loader=true;
    this.svc.getSvcLatencyData()
      .subscribe(
        (data: any) => {
        this.svcLatency =JSON.stringify(data);
        let rep=this.svcLatency.replace("{",'');
        let rep1=rep.replace("}",'');
        this.svcLatency=rep1.split(",");
        console.log("Ipeer",this.ipPeer)
       // this.tarIp=this.ipPeer[this.ip];
       this.tarIp=this.ipPeer['192.168.0.117'];
        this.res+="<br>Fired from <b>Peer 1</b> and connecting to <b>Peer 2</b>";
        this.activeId=3;
        this.i=0;
        this.myLoop1(this.svcLatency);
      });
  }


  myLoop1 (jsonData) { 
    //alert("Start");
    this.res+="<br><i>Connecting...</i>";
    document.getElementById("textarea").innerHTML = this.res;
    //  create a loop function
    setTimeout(()=>{ 
      this.myTimer1(jsonData[this.i]);
      this.i++;
      if (this.i < jsonData.length) {
       
        this.myLoop1(jsonData);
      }
      else{
        this.i=0;
        this.loader=false;
        let tmp=this.tarIp.replace(/\./g, "");
        let activeId=tmp;
        //this.activeId=2;  
        let text = document.getElementById(activeId);
        text.classList.add('active');
      }
      
    },500)
  }


  myTimer1(jsonData) {
    this.res=this.res.replace("<br><i>Connecting...</i>",'');
    this.res+="<br>Latency is <b>"+jsonData+"</b>";
    
    document.getElementById("textarea").innerHTML = this.res;
    var element = document.getElementById("textarea");
    element.scrollTop = element.scrollHeight;
  }

  //assign ip to peer
  IpAssign(){
    let a =JSON.stringify(this.ipPeer);
    let rep=a.replace("{",'');
    let rep1=rep.replace("}",'');
    let jsonData=rep1.split(",");
    for(let i=0;i<jsonData.length;i++){
      let keyIp=jsonData[i].split(":")
      let zerokey=keyIp[0].replace(/"/g, "");
      zerokey=zerokey.replace(/\./g, "");
      console.log(zerokey);
      let j=(i+1).toString();
      document.getElementById(j).setAttribute('id',zerokey);
    }
  }

  myLoop () { 
    //alert("Start");
    this.res+="<br><i>Connecting...</i>";
    document.getElementById("textarea").innerHTML = this.res;
              //  create a loop function
    setTimeout(()=>{
      //alert("Stop");
      
      this.myTimer(this.val[this.i]);
      this.i++;
      if (this.i < this.val.length) {
        
        this.myLoop();
      }
      else{
        this.i=0;
        this.activeId=1;
      }
      
    },500)
  }


  myTimer(val) {
    this.res=this.res.replace("<br><i>Connecting...</i>",'');
    var a=val.indexOf('ipfs/');
    var reg=val.match("[0-9].*.*.[:$]").toString();
    var c=reg.replace(":",'');
    this.res+= "<br>Peer 2</b>";
    this.res+="<br>Hash : <i>"+val.substr(a+5)+"</i>";
    document.getElementById("textarea").innerHTML = this.res;
    var element = document.getElementById("textarea");
    element.scrollTop = element.scrollHeight;
  }

  downloads: any[];
  percent:any;
  startDownloads() {
    //this.percent="0%";
    this.i=0;
    this.myLoop();
    this.animateBar();
    const names = ['one'];
    this.downloads = names.map((name, idx) => {
      this.downloadFile(name, idx).subscribe();
      return {
        name,
        style: null,
        percent: '0%',
      }
    });
  }
  
  animateBar(){
    this.res+=`<br>******fileName********memitypeapplication/octet-stream
      <br>File size: 520324
      <br>Part size: 65536
      <br>******fileName********memitypeapplication/octet-stream
      <br>File size: 520324
      <br>Part size: 65536
      <br>bytes=0-65535
      <br>bytes=65536-131071
      <br>File name: TEST0006789comp.7z
      <br>bytes=131072-196607
      <br>bytes=196608-262143
      <br>bytes=262144-327679
      <br>bytes=327680-393215
      <br>bytes=393216-458751
      <br>bytes=0-65535
      <br>bytes=65536-131071
      <br>bytes=131072-196607
      <br>bytes=196608-262143
      <br>bytes=262144-327679
      <br>bytes=327680-393215
      <br>bytes=393216-458751
      <br>bytes=458752-524287
      <br>bytes=458752-524287`
      document.getElementById("textarea").innerHTML = this.res;
      
      var i = 0;
      if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 1;
        var id = setInterval(frame, 100);
        function frame() {
          if (width >= 100) {
            clearInterval(id);
            i = 0;
          } else {
            width++;
            elem.style.width = width + "%";
          }
      } 
    }
  }


  downloadFile(name,idx) {
    const observable = new Observable((observer: Observer<any>) => {
      const headers = new HttpHeaders();
      headers.set('Access-Control-Allow-Origin', '*')
      const req = new HttpRequest('GET', 'http://192.168.0.128:8081/BoschApi/getFile', {
        headers,
        reportProgress: true,
        responseType: 'blob',
      });
      this.http.request(req).subscribe((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.DownloadProgress) {
          this.percent = `${Math.round(100 * (event.loaded / event.total))}%`;
          this.downloads[idx].percent = this.percent;
          this.downloads[idx].style = this.sanitizer.bypassSecurityTrustStyle(this.percent);
        } else if (event.type === HttpEventType.Response) {
          console.log(`${name} done.`);
          observer.complete();
        } else {
          console.log('Unhandled event, please ignore.');
        }
        
      },
      (err: any) => {
        console.log('Error:', err);
      });
    });
    return observable;
}

//get pushApi Result
getPushApi()  
{  
  this.svc.getPushApiData()
  .subscribe(
    (data: any) => {
      let jsonData=JSON.stringify(data);
      console.log(jsonData);
      this.activeId=2;
      var splitUrl = jsonData.split('/');
      this.res+="<br><b>"+splitUrl[2]+"</b>";
      let splitUrl1=splitUrl[4].replace("\"}",'');
      this.res+="<br><i>"+splitUrl1+"</i>";
      document.getElementById("textarea").innerHTML = this.res; 
      
        })
}


//getDecomp
getDecomp (){
this.svc.getDecompressData()
.subscribe(
(data:any)=>{
let jsonData=data.path;
this.res+="<br> Decompressed file is present in : <i>"+jsonData+"</i>";
document.getElementById("textarea").innerHTML = this.res;
}
)
}

}