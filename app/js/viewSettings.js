let inputs = document.querySelectorAll('.inputNumber');
inputs.forEach(inpt => {
    inpt.querySelector('.inc').addEventListener('click', () => {
        if (+inpt.querySelector('input').value < +inpt.querySelector('input').max)
            inpt.querySelector('input').value++;
    });

    inpt.querySelector('.dec').addEventListener('click', () => {
        if (+inpt.querySelector('input').value > +inpt.querySelector('input').min)
            inpt.querySelector('input').value--
    });
});