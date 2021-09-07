const tabControlsContainer=document.querySelector('.tab-controls-container')
const tabContentsContainer=document.querySelector('.tab-contents-container')
const tabControls = tabControlsContainer.querySelectorAll('.tab-control')
const tabContents = tabContentsContainer.querySelectorAll('.tab-content');

tabControls.forEach((tabControl,index)=>{
  tabControl.addEventListener('click',tabController(index),false);
});

function tabController(index) {
  
  return function() {
const activeTab=tabControlsContainer.querySelector('.active--tab');
activeTab.classList.remove('active--tab');
tabControls[index].classList.add('active--tab');

const activeContent=tabContentsContainer.querySelector('.active--content');
 activeContent.classList.remove('active--content');
 tabContents[index].classList.add('active--content');
 
  }
}