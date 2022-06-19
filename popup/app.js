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

        if(eachRoll.checked){
            history += ` ${num} ${getBonus(bonus)}`;
            num += bonus;
        }

        sum += num;
    }

    if(!eachRoll.checked){
        sum += bonus;
        history += `${getBonus(bonus)}`;
    }

    history += ` = ${sum}`;

    updateUI(sum, history);
};

const getBonus = bonus => {
    return bonus !== 0 ? ` + (${bonus}) ` : '';
};

const updateUI = (sum, history) => {
    //append history to the collapsible

    //ANIMATION
};