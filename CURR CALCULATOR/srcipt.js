const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const  fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(curCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=curCode;
        newOption.value=curCode;
        if(select.name ==="from" && curCode === "USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && curCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });

}
const updateFlag=(element)=>{
    let curCode=element.value;
    // console.log(curCode);
    let cCode=countryList[curCode];
   
    let newSrc=`https://flagsapi.com/${cCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    // console.log(amtVal);
    if(amtVal==="" || isNaN(amtVal) || amtVal<=0){
        amtVal=1;
        amount.value="1";
    }

    // console.log(fromCurr.value,toCurr.value);
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    // console.log(URL);
    let response = await fetch(URL);
    // console.log(response);

    let data = await response.json();

    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    // console.log(rate);
    let result = amtVal * rate;
    //1USD=84.4INR
    msg.innerText=`${amtVal} ${fromCurr.value}=${result} ${toCurr.value}`;
});