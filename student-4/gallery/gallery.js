/*  Author:     YASANTH DOLAMULLA
    Date:       March 20th, 2023
    Purpose:    Gallery and Slider */
const gallery = [
    {
        desc: "Popular surf spot in Sri Lanka with picturesque scenery and local culture.",
        Image: "../images/thumbnails/1.jpg",
        loc: "Midigama Beach"
    },
    {
        desc: "Northern city in Sri Lanka, known for its vibrant Tamil culture, Hindu temples, and delicious cuisine..",
        Image: "../images/thumbnails/2.jpg",
        loc: "Jaffna"
    },
    {
        desc: "Picturesque hilltop with a biodiversity complex, observation tower, and panoramic views of the surrounding landscapes.",
        Image: "../images/thumbnails/3.jpg",
        loc: "Ambuluwawa"
    },
    {
        desc: "Iconic railway bridge in Sri Lanka with nine arches, surrounded by lush greenery and tea plantations.",
        Image: "../images/thumbnails/4.jpg",
        loc: "Nine-Arches Bridge"
    },
    {
        desc: "Scenic town in central Sri Lanka, known for its tea plantations, waterfalls, and lush green landscapes.",
        Image: "../images/thumbnails/5.jpg",
        loc: "Nawalapitiya"
    },
    {
        desc: "Stunning cliff in Sri Lanka's Horton Plains National Park, offering panoramic views of the surrounding valleys and mountains.",
        Image: "../images/thumbnails/6.jpg",
        loc: "Mini-World's end"
    },
    {
        desc: "Ancient stupa in Anuradhapura, Sri Lanka, built by King Dutugemunu and considered one of the holiest Buddhist sites on the island.",
        Image: "../images/thumbnails/7.jpg",
        loc: "Ruwanweliseya"
    },{
        desc: "Scenic town in Sri Lanka's central highlands, known for its tea plantations, cool climate, and colonial architecture.",
        Image: "../images/thumbnails/8.jpg",
        loc: "Nuwaraeliya"
    },{
        desc: "Scenic area in Sri Lanka's central highlands, known for its dairy farms, lush green landscapes, and cool climate.",
        Image: "../images/thumbnails/9.jpg",
        loc: "Ambewela"
    },{
        desc: "Waterfall located in the Ella area of Sri Lanka, offering a serene and tranquil atmosphere with stunning views of the surrounding landscapes.",
        Image: "../images/thumbnails/10.jpg",
        loc: "Little Nayagara"
    },{
        desc: "Tallest self-supported structure in South Asia, located in Colombo, Sri Lanka. It serves as a communication and observation tower and offers panoramic views of the city.",
        Image: "../images/thumbnails/11.jpg",
        loc: "Lotus Tower"
    },{
        desc: "Ancient rock fortress located in central Sri Lanka, known for its stunning frescoes, landscaped gardens, and breathtaking views of the surrounding countryside.",
        Image: "../images/thumbnails/12.jpg",
        loc: "Sigiriya"
    }

];


const element = document.getElementById("image-container");


let s = "";

for (let x = 0; x<gallery.length; x++){
    s+=' <div class="photo-cont">  <img src="' + gallery[x].Image + '" alt="">  <div class="info">  <h4> ' + gallery[x].loc + '</h4> <p>' + gallery[x].desc + '</p> </div> </div>';
}

element.innerHTML=s;

const zoomBtn = document.querySelectorAll('.photo-cont');
const imageView = document.querySelector('.image-view');
const nextbtn = document.getElementById('next-btn');
const prevbtn = document.getElementById('prev-btn');
const imageBox = document.querySelector('.image-box');

let currentImageIdx = 0;

imageView.addEventListener('click', function(){
    this.style.display = "none";
    imageBox.style.display = "none";
});

zoomBtn.forEach(function(btn, index){
    btn.addEventListener('click',function(){
        imageView.style.display = "block";
        imageBox.style.display = "block"; 
        currentImageIdx = index + 1;
        currentImagedisplay (currentImageIdx);
    });
});

function currentImagedisplay(position){
    imageBox.style.background = `url(../images/pictures/${currentImageIdx}.jpg)center/cover no-repeat`;
    imageBox.style.background.width = '50%';
    //imageBox.style.background.height = 'auto';
}

prevbtn.addEventListener('click',function(){
    currentImageIdx--;
    if(currentImageIdx === 0){
        currentImageIdx = 12;
    }
    currentImagedisplay (currentImageIdx);
});

nextbtn.addEventListener('click',function(){
    currentImageIdx++;
    if(currentImageIdx === 13){
        currentImageIdx = 1;
    }
    currentImagedisplay (currentImageIdx);
});
