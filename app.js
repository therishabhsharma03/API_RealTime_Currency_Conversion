const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const btn = document.querySelector("form button");
const dropdowns = document.querySelectorAll(".dropdown")
const fromCurr = document.querySelector("#from");
const toCurr = document.querySelector("#to");
for (let select of dropdowns){
  for(code in countryList){
    let newOption = document.createElement("option");
    newOption.innerHTML = code;
    newOption.value = code;
    if(select.name==="from" && code==="USD"){
      newOption.selected = "selected";
    }else if(select.name==="to" && code==="INR"){
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  })
}

const updateFlag =(element)=>{
  let currCode = element.value ;
  let countryCode = countryList[currCode];
  console.log(countryCode);
  let img = element.parentElement.querySelector("img");
  console.log(img);
  img.src = `https://flagsapi.com/${countryCode}/shiny/64.png` ;
}

btn.addEventListener("click",async(evt)=>{
  evt.preventDefault();
  let amount = document.querySelector("#amount");
  let amt = amount.value;
  if(amt=="" || amt<1){
    amt = 1;
    amount.value="1";
  }
  console.log(fromCurr.value.toLowerCase());
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response_rate = await fetch(URL);
  let data = await response_rate.json();
  rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalamt = rate*amt;
  let msg = document.querySelector(".msg");
  msg.innerText = `${amt} ${fromCurr.value} = ${finalamt} ${toCurr.value} `;
})