function runMyCode() {
    const prepare = document.querySelector('.prepare');
    const choose = document.querySelector('.choose');
    const listOfDrinks = document.querySelector('.drink-list');
    const payment = document.querySelector('.pay');
    const status = document.querySelector('.info');
    const changeOfMoney = document.querySelector('.change');

    const drinkNames = []
    let chosenDrink = '';

    for (let item in drinks) {
        drinkNames.push(" " + item);
    }
    // console.log(drinkNames);
    function Machine(name, date, owner, repairs) {
        this.name = name;
        this.date = date;
        this.owner = owner;
        this.repairs = repairs;
    }

    function CoffeeMachine(name) {
        Machine.call(this, name);
    }

    CoffeeMachine.prototype.makeCoffee = function(drinkName, price) {
        let success = true;
        status.innerHTML = "";
        changeOfMoney.innerHTML = "";

        if (success) {
            if (price >= drinks[drinkName].price) { /* if , amount is greater or equal to its own pirce And its checking is greater than 0 show info */
                if (parseInt(price - drinks[drinkName].price) > 0) {
                    changeOfMoney.innerHTML = 'Your change: ' + parseInt(price - drinks[drinkName].price) + ' $';
                }

            } else {
                status.innerHTML = 'Noo, You should pay: ' + drinks[drinkName].price + ' $ for ' + drinkName;
                changeOfMoney.innerHTML = "";
                success = false;
            }
        }
        if (drinks[drinkName].count <= 0) {
            prepare.classList.add('disabled');
            drinkStatus.innerHTML = "There is no " + drinkName + " anymore! :( ";
            success = false;
        }
        if (success) {
            drinks[drinkName].count--
                status.innerHTML = 'Your coffee is getting ready!';
            setTimeout(() => {
                alert('Your ' + drinkName + ' is ready!');
                status.innerHTML = ''
            }, 100);
        }
    }

    choose.addEventListener('click', () => {
        if (!listOfDrinks.childNodes.length) {
            drinkNames.forEach(el => {
                let list = '<a href="" class="drink"><li>' + el + ' (count: ' + drinks[el.slice(1)].count + ')' + ' (price: ' + drinks[el.slice(1)].price + ')' + '</li></a>';
                listOfDrinks.innerHTML += list;
            })
        }
        prepare.classList.add('disabled'); /* if there is smth add disable again  */
        var remainder = changeOfMoney.textContent
        remainder ? null : payment.classList.remove('hide'); /* show input */
    })
    listOfDrinks.addEventListener('click', (e) => {

        chosenDrink = e.target.innerHTML;
        prepare.classList.remove('disabled');
        payment.classList.remove('hide');
        listOfDrinks.innerHTML = ''
        e.preventDefault()
    })

    prepare.addEventListener('click', () => {
        const drink = chosenDrink.substr(1, parseInt(chosenDrink.indexOf('(')) - 2); /* TAKE TILL braket */
        var remainder = changeOfMoney.textContent.match(/\d+/g)
        const price = remainder ? remainder[0] : parseInt(payment.value);
        // console.log(drink, price);
        prepare.classList.add('disabled');
        payment.classList.add('hide');

        newCoffeeMachine.makeCoffee(drink, price)
        payment.value = remainder ? remainder[0] : '';

        price = 0
        listOfDrinks.innerHTML = ""
    })
    const newCoffeeMachine = new CoffeeMachine('Coffee Machine');

}
let drinks;

async function getData() {
    const response = await fetch('../db.json')
    const data = await response.json();
    drinks = data.Drinks;
    // console.log(drinks);
    runMyCode();
}
getData()