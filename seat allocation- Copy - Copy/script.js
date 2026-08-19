
let regNumbers = [];

/* ADMIN PAGE */

function showAdmin(){
document.getElementById("adminPage").style.display="block";
document.getElementById("studentPage").style.display="none";
}

function showStudent(){
document.getElementById("studentPage").style.display="block";
document.getElementById("adminPage").style.display="none";
}

function goHome(){
location.reload();
}

/* ALLOCATE SEATS */

function allocateSeats(){

let classroom=document.getElementById("classroom").value;
let benches=parseInt(document.getElementById("benches").value);
let side=document.getElementById("side").value;
let inputMethod=document.getElementById("inputMethod").value;

regNumbers=[];

/* MANUAL INPUT */

if(inputMethod==="manual"){

let data=document.getElementById("manualInput").value;

regNumbers=data.split(",").map(x=>x.trim()).filter(x=>x!="");

generateSeats(classroom,benches,side);

}

/* EXCEL INPUT */

else{

let file=document.getElementById("excelFile").files[0];

if(!file){
alert("Please upload Excel file");
return;
}

let reader=new FileReader();

reader.onload=function(e){

let data=new Uint8Array(e.target.result);

let workbook=XLSX.read(data,{type:"array"});

let sheet=workbook.Sheets[workbook.SheetNames[0]];

let json=XLSX.utils.sheet_to_json(sheet,{header:1});

regNumbers=json.flat().filter(x=>x!=null && x!="").map(x=>x.toString().trim());

generateSeats(classroom,benches,side);

};

reader.readAsArrayBuffer(file);

}

}

/* GENERATE SEATS (LOGIC IMPROVED) */

function generateSeats(classroom,benches,side){

let layout=document.getElementById("classroomLayout");

document.getElementById("className").innerText="Classroom : "+classroom;

/* CREATE BENCHES FIRST TIME */

if(layout.children.length===0){

for(let i=1;i<=benches;i++){

let bench=document.createElement("div");
bench.className="bench";

let title=document.createElement("div");
title.className="bench-title";
title.innerText="Bench "+i;

bench.appendChild(title);

let desk=document.createElement("div");
desk.className="desk";

/* LEFT SEAT */

let leftSeat=document.createElement("div");
leftSeat.className="seat";
leftSeat.innerText="L : Empty";
leftSeat.dataset.reg="Empty";

desk.appendChild(leftSeat);

/* RIGHT SEAT */

let rightSeat=document.createElement("div");
rightSeat.className="seat";
rightSeat.innerText="R : Empty";
rightSeat.dataset.reg="Empty";

desk.appendChild(rightSeat);

bench.appendChild(desk);

layout.appendChild(bench);

}

}

let index=0;

let benchesList=document.querySelectorAll(".bench");

benchesList.forEach(bench=>{

let seats=bench.querySelectorAll(".seat");

/* LEFT SIDE */

if(side==="left"){

let reg=regNumbers[index] || "Empty";

seats[0].innerText="L : "+reg;
seats[0].dataset.reg=reg;

index++;

}

/* RIGHT SIDE */

if(side==="right"){

let reg=regNumbers[index] || "Empty";

seats[1].innerText="R : "+reg;
seats[1].dataset.reg=reg;

index++;

}

/* BOTH SIDES */

if(side==="both"){

let left=regNumbers[index] || "Empty";
seats[0].innerText="L : "+left;
seats[0].dataset.reg=left;
index++;

let right=regNumbers[index] || "Empty";
seats[1].innerText="R : "+right;
seats[1].dataset.reg=right;
index++;

}

});

}

/* FIND SEAT */

function findSeat(){

let reg=document.getElementById("searchReg").value.trim();

let found=false;

document.querySelectorAll(".seat").forEach(seat=>{
seat.classList.remove("highlight");
});

document.querySelectorAll(".seat").forEach(seat=>{

if(seat.dataset.reg && seat.dataset.reg.trim()===reg){

seat.classList.add("highlight");
found=true;

}

});

if(!found){
alert("Seat not found");
}

}