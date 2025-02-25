document.addEventListener("DOMContentLoaded", () => {
    const square = document.querySelector('.square');
    const top = document.querySelector('.top');

    if (window.innerWidth < 768) {
        return; 
    }

    const reklamaWidth = 200 * 2; 
    const maxSquareWidth = window.innerWidth - reklamaWidth; 

    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;

        let newWidth = Math.max(700, Math.min(maxSquareWidth, 500 + scrollPosition * 5)); 
        let newHeight = Math.max(300, Math.min(window.innerHeight, 100 + scrollPosition * 4)); 

        square.style.width = `${newWidth}px`;
        square.style.height = `${newHeight}px`;
        square.style.borderRadius = `${Math.max(scrollPosition / 50, 30)}px ${Math.max(scrollPosition / 50, 30)}px 0px 0px`; 
        square.style.background = `rgba(177, 176, 176, ${Math.min(0.8 + scrollPosition / 240, 1)})`;
        top.style.opacity = Math.min(0.8 + scrollPosition / 240, 1); 
    });
});


function Error() {
    alert("Извините, технические неполадки. Скоро исправим.");
}

let count=0
function Bonus() {
document.getElementById('bonus').textContent = count
count++;

}


setTimeout(showBanner, 3000);

function showBanner() {
    const banner = document.getElementById('banner');
    const banner1 = document.getElementById('banner1');
    const banner2 = document.getElementById('banner2');


    banner.classList.add('show');
    banner1.classList.add('show1');
    banner2.classList.add('show2');


    setRandomPosition(banner);
    setRandomPosition(banner1);
    setRandomPosition(banner2);


    setTimeout(() => {
        banner1.classList.remove('show1');
    }, 15500);
    setTimeout(() => {
        banner2.classList.remove('show2');
    }, 5000);
}


function setRandomPosition(el) {


    el.style.left = `${Math.random() * (window.innerWidth - el.offsetWidth)}px`;
    el.style.top = `${Math.random() * (window.innerHeight - el.offsetHeight)}px`;
}
