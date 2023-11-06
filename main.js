"use strict";

const welcomeMsg = document.querySelector(".welcome");
const loginBtn = document.querySelector(".login__btn");
const loginInputUser = document.querySelector(".login__input--user");
const loginInputPin = document.querySelector(".login__input--pin");
const appContainer = document.querySelector(".App");
const movementsApp=document.querySelector(".movements");
const balanceLabel=document.querySelector(".balance__value");
const summaryValueIn=document.querySelector(".summary__value--in");
const summaryValueOut=document.querySelector(".summary__value--out");
const summaryValueInterest=document.querySelector(".summary__value--interest");
const transferTo=document.querySelector(".form__input--to");
const transferAmount=document.querySelector(".form__input--amount");
const transferBtn=document.querySelector(".form__btn--transfer");
const loanInputAmount=document.querySelector(".form__input--amount");
const loanBtn=document.querySelector(".form__btn--loan");
const closeInputUser=document.querySelector(".form__input--user");
const closeInputPIN=document.querySelector(".form__input--pin");
const closeBtn=document.querySelector(".form__btn--close");
// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//   username and pin
// convert username
const createUserNames = function (accs) {
  accs.forEach((acc) => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUserNames(accounts);

//btn login
let currentAccount;
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
 

currentAccount= accounts.find(acc=> loginInputUser.value === acc.userName)

console.log(currentAccount)
if(Number(loginInputPin.value)===currentAccount.pin){
   welcomeMsg.innerHTML=`Welcome back, ${currentAccount.owner}`;
    appContainer.style.opacity = "100";

    loginInputUser.value='';
    loginInputPin.value='';
    // displayMovements(currentAccount.movements)
    // calcDisplayBalance(currentAccount)
    // calcDisplaySummary(currentAccount)
    UIAPP(currentAccount)

}
else {
    welcomeMsg.innerHTML=`Wrong username or password`;
}
  
});
const UIAPP=function(acc){
    displayMovements(acc.movements)
    calcDisplayBalance(acc)
    calcDisplaySummary(acc)

}

// display movments
const displayMovements =function (movements, sort=false) {
    movementsApp.innerHTML='';

    const movs= sort ? movements.slice().sort((a,b)=> a-b ): movements;

    movs.forEach(function (mov,i){
        const type= mov > 0 ? "deposit" :"withdrawal";

        const html=` <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}💲</div>
      </div>`

      movementsApp.insertAdjacentHTML('afterbegin', html);


    });
    
}
// displaybalance

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    balanceLabel.textContent = `${acc.balance}€`;
  };

//  displaysummry

const calcDisplaySummary=function(acc){
// in deposit sum

 const incomes=acc.movements.filter(mov=> mov > 0).reduce((acc,cur)=> acc + cur,0);
 summaryValueIn.textContent=`${incomes}💲`;
// in withdraw sum
const outcomes=acc.movements.filter(mov=> mov < 0).reduce((acc,cur)=> acc + cur,0);
summaryValueOut.innerHTML=`${Math.abs(outcomes)}💲`;
// in interest sum
const interest = acc.movements
.filter(mov => mov > 0)
.map(deposit => (deposit * acc.interestRate) / 100)
.filter((int, i, arr) => {
  // console.log(arr);
  return int >= 1;
})
.reduce((acc, int) => acc + int, 0);
summaryValueInterest.textContent = `${interest}€`;
}  

// transfer money

transferBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const amount=Number(transferAmount.value)
    const transferror= accounts.find(acc=> transferTo.value === acc.userName)
    console.log(transferror)

    transferAmount.value=transferTo.value='';
    if(amount > 0 && transferror && currentAccount.userName !== transferror.userName){
        currentAccount.movements.push(-amount);
        transferror.movements.push(amount);
        UIAPP(currentAccount)

    }
});
// loan mony
loanBtn.addEventListener('click', function (e) {
    e.preventDefault();
  
    const amount = Number(loanInputAmount.value);
    console.log(amount);
    console.log(typeof(amount));
    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
      // Add movement
      currentAccount.movements.push(amount);
  
      // Update UI
      UIAPP(currentAccount);
    }
    loanInputAmount.value = '';
  });

//   close account
closeBtn.addEventListener('click', function(e){
    e.preventDefault();
    // const close=currentAccount.owner.find(own => own.value === own.userNames);
    // console.log(close)
    // if(Number(closeInputPIN.value)===currentAccount.pin && currentAccount.userNames === closeInputUser.value){
    //     const index=accounts.findIndex(acc=> acc.userNames === currentAccount.userNames);
    //     accounts.splice(index,1)
    //     console.log(index)
    //     appContainer.style.display=0;
    // }
    if(Number(closeInputPIN.value) === currentAccount.pin && closeInputUser.value === currentAccount.userName ){
        const index=accounts.findIndex(acc=>acc.userName === closeInputUser.value)
        accounts.splice(index,1)
        console.log(index)

        appContainer.style.opacity = "0";

        
    }

   
    closeInputPIN.value=closeInputUser.value='';
})
