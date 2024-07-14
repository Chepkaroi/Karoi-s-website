// navigation menu 

(()=>{
 const hamburgerBtn = document.querySelector('.hamburger-btn'),
 navMenu = document.querySelector('.nav-menu'),
 closeNav = navMenu.querySelector('.close-nav-menu');

 hamburgerBtn.addEventListener('click', showNav);
 closeNav.addEventListener('click', hideNav);

 function showNav() {
     navMenu.classList.toggle('open');
     bodyScrollingToggle();
     fadeOutEffect();
 }
 function hideNav() {
     navMenu.classList.toggle('open');
     bodyScrollingToggle();
 }
 function fadeOutEffect() {
     document.querySelector('.fade-out-effect').classList.add('active');
     setTimeout(()=>{
        document.querySelector('.fade-out-effect').classList.remove('active');
     }, 1000)
 }
//  play with the dom 
document.addEventListener('click', (e)=>{
 if(e.target.classList.contains('link-item')){
     if(e.target.hash !== ''){
         e.preventDefault();
         const hash = e.target.hash;
        //  console.log(hash);
         document.querySelector('.section.active').classList.add('hide');
         document.querySelector('.section.active').classList.remove('active');
         document.querySelector(hash).classList.add('active');
         document.querySelector(hash).classList.remove('hide');
        //  remove existing active class from section 
        // navMenu.querySelector('.active').classList.add('outer-shadow','hover-in-shadow');
        // navMenu.querySelector('.active').classList.remove('active','inner-shadow');
        if(navMenu.classList.contains('open')){
          

        // add active class to link-item 
        e.target.classList.add('active','inner-shadow');
        e.target.classList.remove('outer-shadow','hover-in-shadow');
        // hide nav menu 
        hideNav();
        
        }else{
            
            let navItems = navMenu.querySelectorAll('link-item');
            navItems.forEach((item)=>{
                if(hash === item.hash){
                    // add new nav menu 
                    item.classList.add('active','inner-shadow');
                    item.classList.remove('outer-shadow','hover-in-shadow');
                }
            })
            fadeOutEffect();
        }
        window.location.hash = hash;
     }
 }
})
})();



function bodyScrollingToggle() {
    document.body.classList.toggle("stop-scrolling");
}
// Portfolio filter and popup 
(()=>{
const filterContainer = document.querySelector('.portfolio-filter'),
portfolioItemsContainer = document.querySelector('.portfolio-items'),
portfolioItems = document.querySelectorAll('.portfolio-item'),
popup = document.querySelector('.portfolio-popup'),
prevBtn = popup.querySelector('.pp-prev'),
nextBtn = popup.querySelector('.pp-next'),
closeBtn = popup.querySelector('.pp-close'),
projectDetailsContainer = popup.querySelector('.pp-details'),
projectDetailsBtn = popup.querySelector('.pp-project-details-btn');

let itemIndex, slideIndex, screenShots;

// filter portfolio items 
filterContainer.addEventListener('click', (e)=>{
if(e.target.classList.contains('filter-item') && !e.target.classList.contains('active')){
    // remove existing 'filter-item' 
    filterContainer.querySelector('.active').classList.remove('outer-shadow', 'active')
    // add new 'filter-item' 
    e.target.classList.add('active', 'outer-shadow');
    const target = e.target.getAttribute('data-target');
    portfolioItems.forEach((item) => {
        if(target === item.getAttribute('data-category') || target === 'all'){
            item.classList.remove('hide');
            item.classList.add('show');
        }else{
            item.classList.remove('show');
            item.classList.add('hide');
        }
    })
}
});

portfolioItemsContainer.addEventListener('click', (e)=>{
  if(e.target.closest('.portfolio-item-inner')){
      const portfolioItem = e.target.closest('.portfolio-item-inner').parentElement;
    //   get porfolio itemIndex 
  itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
  screenShots = portfolioItems[itemIndex].querySelector('.portfolio-item-img img').getAttribute('data-screenshots');
//   convert screenshots into array 
     screenShots = screenShots.split(',');
     if(screenShots.length === 1){
         prevBtn.style.display ="none";
         nextBtn.style.display ="none";
     }else{
        prevBtn.style.display ="block";
        nextBtn.style.display ="block";
     }
     slideIndex = 0;
      popupToggle();
      popupSlideShow();
      popupDetails();
  }
});
closeBtn.addEventListener('click', ()=>{
    popupToggle();
    if(projectDetailsContainer.classList.contains('active')){
        popupDetailsToggle();
    }
})

function popupToggle() {
    popup.classList.toggle('open');
    bodyScrollingToggle();
}
function popupSlideShow() {
   const imgSrc = screenShots[slideIndex];
   const popupImg = popup.querySelector('.pp-img');
   popup.querySelector('.pp-loader').classList.add('active');
   popupImg.src = imgSrc;
   popupImg.onload = ()=>{
    //    remove active class after successful load 
    popup.querySelector('.pp-loader').classList.remove('active');
   }
  popup.querySelector('.pp-counter').innerHTML = (slideIndex+1) + " of " + (screenShots.length) ;

}

//   nexslide 
nextBtn.addEventListener('click', ()=>{
    if(slideIndex === screenShots.length-1){
        slideIndex = 0;
    }else{
        slideIndex++;
    }
    popupSlideShow();
})
// prev slide 
prevBtn.addEventListener('click', ()=>{
    if(slideIndex === 0){
        slideIndex = screenShots.length - 1;
    }else{
        slideIndex--;
    }
    popupSlideShow();
})

projectDetailsBtn.addEventListener('click', ()=>{
    popupDetailsToggle();
})
  function popupDetails() {
      projectDetailsBtn.style.display = "block";
      if(!portfolioItems[itemIndex].querySelector('.portfolio-items-details')){
          projectDetailsBtn.style.display = 'none';
          return;
      }
    //   get the project deatails 
    const details = portfolioItems[itemIndex].querySelector('.portfolio-items-details').innerHTML;
    popup.querySelector('.pp-project-details').innerHTML = details;
    const title = portfolioItems[itemIndex].querySelector('.portfolio-item-title').innerHTML;
    popup.querySelector('.pp-title h2').innerHTML = title;
    const category = portfolioItems[itemIndex].getAttribute('data-category');
    popup.querySelector('.pp-project-category').innerHTML = category.split("-").join(' ');
  }
  function popupDetailsToggle() {
      if(projectDetailsContainer.classList.contains('active')){
        projectDetailsBtn.querySelector('i').classList.remove('fa-minus');
        projectDetailsBtn.querySelector('i').classList.add('fa-plus');
        projectDetailsContainer.classList.remove('active'); 
        projectDetailsContainer.style.maxHeight = 0 + 'px';
    }else{
        projectDetailsBtn.querySelector('i').classList.remove('fa-plus');
        projectDetailsBtn.querySelector('i').classList.add('fa-minus');
        projectDetailsContainer.classList.add('active');  
        projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + 'px';
        popup.scrollTo(0, projectDetailsContainer.offsetTop);
      }
  }

})();

// testimonial slider 
(()=>{
const sliderContainer = document.querySelector('.testi-slider-container'),
slides = sliderContainer.querySelectorAll('.testi-item'),
slideWidth = sliderContainer.offsetWidth,
prevBtn = document.querySelector('.testi-slider-nav .prev'),
activeSlider = sliderContainer.querySelector('.testi-item.active')
nexBtn = document.querySelector('.testi-slider-nav .next');
let slideIndex = Array.from(activeSlider.parentElement.children).indexOf(activeSlider);
// console.log(slideIndex);
slides.forEach((slide)=>{
    slide.style.width = slideWidth + "px";
});
// set the width of the slider sliderContainer 
sliderContainer.style.width = slideWidth * slides.length + 'px';

nexBtn.addEventListener("click", ()=>{
    if(slideIndex === slides.length - 1){
        slideIndex = 0;
    }else{
        slideIndex++;
    }
  slider();
})
prevBtn.addEventListener('click', ()=>{
    if(slideIndex === 0){
        slideIndex = slides.length - 1;
    }else{
        slideIndex--;
    }
    slider();
})

function slider(){
    sliderContainer.querySelector('.testi-item.active').classList.remove('acitve');
    slides[slideIndex].classList.add('active');
    sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + 'px';
}
slider();
})();

// Hide all sections except home 
(()=>{
 const sections = document.querySelectorAll('.section');
 sections.forEach((section)=>{
     if(!section.classList.contains('active')){
         section.classList.add('hide');
     }
 })
})();


// preloader 
window.addEventListener('load', ()=>{
    setTimeout(()=>{
        document.querySelector(".preloader").style.display = 'none';
    }, 2000)
})