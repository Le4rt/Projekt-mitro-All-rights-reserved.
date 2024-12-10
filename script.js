let toggle = true;

document.querySelectorAll('.lh-place').forEach(place => {
    place.addEventListener('click', () => {
        place.style.backgroundColor = toggle ? '#FFFFFF' : '#000000';
        toggle = !toggle;
    });
});

document.querySelectorAll('.lh-place12').forEach(place => {
    place.addEventListener('click', () =>{
        place.style.backgroundColor = getRandomColor();
    });
});

function getRandomColor(){
    const letters ='0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i<6; i++){
        color +=letters[Math.floor(Math.random() * 16)];
    }
    return color;
}