let form = document.getElementById('form')
var benefits = document.getElementById("ben");
let period = document.getElementsByName('period');
let month = document.getElementById("month");
let year = document.getElementById("year");
var salary = document.getElementById("basic");
let nssfyes = document.getElementById("yes");
let nssfno = document.getElementById("no");
let nssfnewates = document.getElementById("newrate");
let oldRates = document.getElementById("oldrate");
let nhifyes = document.getElementById("nhifyes");
let nhifno = document.getElementById("nhifno");
let initial = document.getElementById('initial')


form.addEventListener('submit', find);


function find(e){
    e.preventDefault();
    console.log(salary.value)
    initial.innerText = `KSH ${salary.value}`;
    document.getElementById("box4").innerHTML = "KSH " + benefits.value;
    document.getElementById("box2").innerHTML = "KSH " + deductNSSF();
    document.getElementById("box3").innerHTML = "KSH " + incomeAfterPension();
    document.getElementById("box5").innerHTML = "KSH " + newtaxableIncome();
    document.getElementById("relief").innerHTML = "KSH " + personalRelief();
    document.getElementById("chargeable").innerHTML = "KSH " + newtaxableIncome();
    document.getElementById("nhifcontribution").innerHTML = "KSH " + deductNHIF();
    document.getElementById("tax").innerHTML = "KSH " + newtaxOnTaxableIncome();
    document.getElementById("taxrelief").innerHTML = "KSH " + getTaxOffRelief();
    document.getElementById("payetax").innerHTML = "KSH " + payeValue();
    document.getElementById("net").innerHTML = "KSH " + theNetPay();
}

const totalIncome = () => {
    let total = 0;
    let sal = parseInt(salary.value)
    let benefit = parseInt(benefits.value)

    if (sal !== null && benefit !== null) {
        if (sal >= 0 && benefit >= 0) {
            total = sal + benefit;
        }
    }

    return total;
}
let deduct_nssf;
let deduct_nhif;
let monthly = true;
let isNewRates;

nhifyes.addEventListener('change', function(){
    if(this.checked){
        deduct_nhif = true;
    }
})

nhifno.addEventListener('change', function () {
    if (this.checked) {
        deduct_nhif = false;
    }
})

nssfyes.addEventListener('change', function () {
    if (this.checked) {
        deduct_nssf = true;
    }
})

nssfno.addEventListener('change', function () {
    if (this.checked) {
        deduct_nssf = false;
    }
})

nssfnewates.addEventListener('change', function () {
    if (this.checked) {
        isNewRates = true;
    }
});

oldRates.addEventListener('change', function () {
    if (this.checked) {
        isNewRates = false;
    }
});

month.addEventListener('change', function () {
    if (this.checked) {
        monthly = true;
    }
});

year.addEventListener('change', function () {
    if (this.checked) {
        monthly = false;
    }
});

const nssfDeduction = () => {
let sal = salary.value;
    let nssfAmount = 0;

    if (isNewRates) {
        if (sal > 18000) { 
            nssfAmount += 2160;
        } else {
            nssfAmount += sal * 0.12;
        }
    } else { 
        nssfAmount += 200;
    }

    return nssfAmount;
}

  const deductNSSF = () => {
    let deduction = 0;
    if (deduct_nssf) { 
        deduction += nssfDeduction();

    } else {
        deduction = 0; 
    }

    return deduction;
}

const incomeAfterPension = () => {
    let sal = salary.value;

    let newIncome = sal - deductNSSF();

    return newIncome;
}

const newtaxableIncome = () => {

    let bens = benefits.value;
    let taxable = parseInt(incomeAfterPension()) + parseInt(bens);
    return taxable;
}
const personalRelief = () => {
    let relief = 0;

    if (monthly) {
        relief += 2400;
    } else {
        relief += 28800;
    }
    return relief;
}
const deductNHIF = () => {
    let deduction = 0;
    if (deduct_nhif) { //true
      
        deduction += nhifContribution();

    } else {
    
        deduction = 0;
      
    }

    return deduction;
}

const nhifContribution = () => {
    let sal = salary.value;
    let nhifAmount = 0;

    if (deduct_nhif) {

        if (sal >= 1000 && sal <= 5999) {
            nhifAmount += 150;
        } else if (sal >= 6000 && sal <= 7999) {
            nhifAmount += 300;
        } else if (sal >= 8000 && sal <= 11999) {
            nhifAmount += 400;
        } else if (sal >= 12000 && sal <= 14999) {
            nhifAmount += 500;
        }
         else if (sal >= 15000 && sal <= 19999) {
            nhifAmount += 600;
        } else if (sal >= 20000 && sal <= 24999) {
            nhifAmount += 750;
        } else if (sal >= 25000 && sal <= 29999) {
            nhifAmount += 850;
        } else if (sal >= 30000 && sal <= 34999) {
            nhifAmount += 900;
        } else if (sal >= 35000 && sal <= 39999) {
            nhifAmount += 950;
        } else if (sal >= 40000 && sal <= 44999) {
            nhifAmount += 1000;
        } else if (sal >= 45000 && sal <= 49999) {
            nhifAmount += 1100;
        } else if (sal >= 50000 && sal <= 59999) {
            nhifAmount += 1200;
        } else if (sal >= 60000 && sal <= 69999) {
            nhifAmount += 1300;
        } else if (sal >= 70000 && sal <= 79999) {
            nhifAmount += 1400;
        } else if (sal >= 80000 && sal <= 89999) {
            nhifAmount += 1500;
        } else if (sal >= 90000 && sal <= 99999) {
            nhifAmount += 1600;
        } else if (sal >= 100000) {
            nhifAmount += 1700;
        }

    } else {
        
        nhifAmount = 0;
    }

    return nhifAmount;
}

  //tax on taxable income
  const newtaxOnTaxableIncome = () => {

    let income = parseInt(newtaxableIncome());

    let amount = 0;

    if (income <= 12298) {
        amount = (income * (0.1));
    } else if (income >= 12999 && income <= 23885) {
        //val = income * 0.15;
        amount = (income * (0.15));
    } else if (income >= 23886 && income <= 35472) {
        //val = income * 0.2;
        amount = (income * (0.2));
    } else if (income >= 35473 && income <= 47059) {
        //val = income * 0.25;
        amount = (income * (0.25));
    } else if (income > 47059) {
        //val = income * 0.3;
        amount = (income * (0.3));
    }

    return amount;
}
   //tax net off relief also same to paye
   const getTaxOffRelief = () => {
    //Tax on taxable income - personal relief
    let amount = 0;
    let newtax = parseInt(newtaxOnTaxableIncome());
    let relief = parseInt(personalRelief());
    if(newtax < relief){
        amount = 0;
    }
    else{
        amount = newtax - relief;
    }

    return amount;
}
   // same to tax net off relief|
  
const payeValue = () => {
    let amount = 0;
    let newtax = parseInt(newtaxOnTaxableIncome());
    let relief = parseInt(personalRelief());
    if(newtax < relief){
        amount = 0;
    }
    else{
        amount = newtax - relief;
    }

    return amount;
   }

   const theNetPay = () => {

    let pay = 0;
    let tax = parseInt(newtaxableIncome())
    let finalAmount = parseInt(totalIncome());
    let paye = parseInt(payeValue());
    let nhif = parseInt(deductNHIF())
    let relief = parseInt(personalRelief());
    let nssf = parseInt(deductNSSF());
    
    let sum = paye + nhif + relief + nssf

    if(finalAmount<sum){
        pay = tax -nhif
    }else{
        pay = finalAmount - (paye + nhif + relief + nssf);
    }
    
    // let pay = finalAmount - (paye + nhif + relief + nssf);
    // document.querySelector(".val12").textContent = pay;
    return pay;
}