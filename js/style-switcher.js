// Toggle Style Switcher 
const styleSwitcherToggler = document.querySelector('.style-switcher-toggler');
styleSwitcherToggler.addEventListener('click', ()=>{
    document.querySelector('.style-switcher').classList.toggle('open');
});
// hide style switcher on scroll 
window.addEventListener('scroll',()=>{
    if(document.querySelector('.style-switcher').classList.contains('open')){
        document.querySelector('.style-switcher').classList.remove('open');
    }
})

// theme colors 
const altStyle = document.querySelectorAll('.alternate-style');

function setActiveStyle(color) {
    localStorage.setItem('color', color);
    changeColor();
    
}
function changeColor() {
    altStyle.forEach((style)=>{
        if(localStorage.getItem('color') === style.getAttribute('title')){
            style.removeAttribute('disabled');
            document.querySelector('.style-switcher').classList.toggle('open');
        }else{
            style.setAttribute('disabled', 'true');
        }
    })
}
if (localStorage.getItem('color') !== null) {
    changeColor();
    if(document.querySelector('.style-switcher').classList.contains('open')){
        document.querySelector('.style-switcher').classList.remove('open');
    };
}

// light and dark modes 
const dayNight = document.querySelector('.day-night');
dayNight.addEventListener('click', ()=>{
    
    

    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    }else{
        localStorage.setItem('theme', 'light');
    }
    updateIcons();
    
})


function updateIcons() {
    const logoDark = document.querySelector('#img-dark');
    const logoLight = document.querySelector('#img-light');
    const logoDarkReload = document.querySelector('#img-dark-reload');
    const logoLightReload = document.querySelector('#img-light-reload');
    console.log(logoDark, logoLight);
    if (document.body.classList.contains('dark')) {
  dayNight.querySelector('i').classList.add('fa-sun');
    dayNight.querySelector('i').classList.remove('fa-moon');
    logoLight.classList.add('active');
    logoDark.classList.remove('active');
    logoLightReload.classList.add('active');
    logoDarkReload.classList.remove('active');
    }else{
        dayNight.querySelector('i').classList.add('fa-moon');
    dayNight.querySelector('i').classList.remove('fa-sun');
    logoDark.classList.add('active');
    logoLight.classList.remove('active');
    logoDarkReload.classList.add('active');
    logoLightReload.classList.remove('active');
    }
}
function themeMode() {
    // check if theme key exists 
    if (localStorage.getItem('theme') !== null) {
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.remove('dark');
        }else{
            document.body.classList.add('dark');
        }
    }
    updateIcons();
}
themeMode();
window.addEventListener('load', ()=>{
    if(document.body.classList.contains('dark')){
        dayNight.querySelector('i').classList.add('fa-sun');
    }else{
        dayNight.querySelector('i').classList.add('fa-moon');
    }
})


