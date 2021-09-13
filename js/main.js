const HEADER = document.querySelector('.header');

const NAV_ITEMS = document.querySelectorAll('.nav-item');
const NAV_CONTROL =document.querySelector('.nav-control')
const NAV =document.querySelector('.nav');

NAV_ITEMS.forEach((navitem)=>{
  if(window.location.hash == navitem.href){
    navitem.style.color='#000'
  }
})
function ScrollEvent(){
  if(window.scrollY > 100){
    HEADER.classList.add('fixed')
  }
  else{
        HEADER.classList.remove('fixed')

  }
}
window.addEventListener('scroll',()=>{
  ScrollEvent()
});


function toggleNav(){
  NAV.classList.toggle('open');
}

NAV_CONTROL.addEventListener('click',toggleNav);
