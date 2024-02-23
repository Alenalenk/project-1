


const cards = [...document.querySelectorAll('.image__box')];
const menu = document.querySelector('.menu-list');
const menuLinks = document.querySelectorAll('.menu-link');
const button = document.querySelector('.more');
const imageBox = document.querySelector('.image__wrapper');
const COUNT_SHOW = 9;

sliceCards(cards);
menu.addEventListener("click", filterButtons);
button.addEventListener("click", showMore);
imageBox.addEventListener("click", openPopup);


function getCards(data){
    if (data.length < COUNT_SHOW){button.classList.add('hidden')};
    imageBox.innerHTML = ''
   
    data.forEach(item => {
        imageBox.appendChild (item);
        
    });
     
   
}

function sliceCards(data){
    
    let activeLink = getSessionStorage();
    console.log(activeLink)

    for(let item of menuLinks){
        item.classList.remove('active');
        if(item.id == activeLink ){
            item.classList.add('active');
        } 
    }
        
    const filterArr = filterCards(data, activeLink );
    const newArr = filterArr.slice(0, COUNT_SHOW);
    console.log(COUNT_SHOW)
    
    getCards(newArr);
}


function getSessionStorage(){
    if(sessionStorage.getItem("activeLink")){
        let activeLink = sessionStorage.getItem("activeLink");
        return activeLink;
        
            
    }
    else {
        return 'all'
    }
}



function filterButtons(e){
    const menuLink = e.target.closest('.menu-link');
    
    if(!menuLink) return;
    button.classList.remove('hidden');
    for(let item of menuLinks){
        item.classList.remove('active');
    }

 menuLink.classList.add('active');
 const activeLink = menuLink.id;
sessionStorage.setItem("activeLink", activeLink);

sliceCards(cards);

    


}

function filterCards(data, link){
    if(link !== 'all') {

let newArr = data.filter(item => item.dataset.name == link )
return newArr;
} else{
    
    return data;
}

}




// button show more 



let count = 1;

function showMore(e){

    count++;
    
    let countShowMore = COUNT_SHOW * count;
    
    const activeLink = getSessionStorage();
    const newArr = filterCards(cards, activeLink );
    if (newArr.length < countShowMore){button.classList.add('hidden')};
    
    const newSliceCards = newArr.slice(0, countShowMore );
    
    getCards(newSliceCards);
    

}

//gallery

function openPopup(e){
    const image = e.target.closest('.image__box');
    const popup = document.querySelector('.popup');
    if(!image) return;
    document.body.classList.add('open');
    popup.querySelector('img').src = image.querySelector('img').src;
    const close = popup.querySelector('.close');
    close.addEventListener('click', () => {
        document.body.classList.remove('open');
    })
    
}
