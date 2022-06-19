//CAROUSEL

//get list and all cards
const list = document.querySelector('.carousel__list');
const cards = document.querySelectorAll('.carousel__item');

list.addEventListener('click', event => {

    update(event.target.dataset.pos);

});

const update = active => {

    cards.forEach(card => {
        let current = card.dataset.pos;
        //change all positions
        card.dataset.pos = Math.abs(Number(current) - Number(active)) > 3 ? Number(current) * -1 : "" + (Number(current) - Number(active));

    });
};

//INPUT NUMBER + -
const minus = document.querySelectorAll('.minus');
const plus = document.querySelectorAll('.plus');

minus.forEach(btn => btn.addEventListener('click', e => {
    e.preventDefault();
    e.target.nextElementSibling.stepDown();
}));

plus.forEach(btn => btn.addEventListener('click', e => {
    e.preventDefault();
    e.target.previousElementSibling.stepUp();
}));

//GETTING DATA

const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();

    const dice = Number(document.querySelector('.carousel__item[data-pos="0"]').dataset.dice);
    const bonus = Number(document.getElementById('bonus').value);
    const rolls = Number(document.getElementById('rolls').value);
    const eachRoll = document.getElementById('eachRoll');

    rollDice(dice,rolls,bonus,eachRoll);

    form.reset();
});

const rollDice = (dice,rolls,bonus,eachRoll) => {
    let sum = 0;
    let history = '';

    for(let i = 0; i < rolls; i++){
        let num = Math.floor(Math.random() * dice) + 1;

        history += ` ${num}`;

        if(eachRoll.checked){
            history += `${getBonus(bonus)}`;
            num += bonus;
        }

        sum += num;
    }

    if(!eachRoll.checked){
        sum += bonus;
        history += `${getBonus(bonus)}`;
    }

    history += ` = ${sum}`;
    
    console.log(history);

    updateUI(sum, history);
};

const getBonus = bonus => {
    return bonus !== 0 ? ` + (${bonus}),` : '';
};

const updateUI = (sum, history) => {
    const result = document.getElementById('result');
    //append history to the collapsible

    
    //ANIMATION
    let output = 0;

    const timer = setInterval(() => {
        result.textContent = output + '';

        if(output === sum){
            clearInterval(timer);
        }else{
            output++;
        }
    }, 10);
};