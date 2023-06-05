// console.log("Welcome to Music App")
//closures
//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/Ranjha.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
//since its an html collection so cannot use for each loop

let songs = [
    {songName: "Ranjha", filePath:"songs/Ranjha.mp3", coverPath:"covers/1.jpg"},
    {songName: "Kalla-Sohna-Nai", filePath:"songs/Kalla-Sohna-Nai.mp3", coverPath:"covers/2.jpg"},
    {songName: "Insane", filePath:"songs/Insane.mp3", coverPath:"covers/3.jpg"},
    {songName: "Excuses", filePath:"songs/Excuses.mp3", coverPath:"covers/4.jpg"},
    {songName: "Desires", filePath:"songs/Desires.mp3", coverPath:"covers/5.jpg"},
    {songName: "Bijlee", filePath:"songs/Bijlee.mp3", coverPath:"covers/6.jpg"},
]


songItems.forEach((element,i)=>{
    
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;

    audioElement = new Audio(`${songs[i].filePath}`);
    console.log(audioElement.duration)
    // element.getElementsByClassName('time').textContent = audioElement.duration;
})

//handle play/pause click

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    //Update Seekbar
    progress = ((audioElement.currentTime/audioElement.duration)*100)
    // console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
    
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        // element.classList.remove('fa-play-circle')
        element.classList.add('fa-play-circle')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{

        makeAllPlays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        // restOfName = e.target.parentElement.parentElement.parentElement.children[1].textContent;
        // audioElement.src = 'songs/'+restOfName+'.mp3';

        // console.log(songIndex)
        songIndex = e.target.parentElement.parentElement.parentElement.children[1].id;
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        // console.log(songIndex)

        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

        document.getElementById('songSinger').innerText = songs[songIndex].songName;
    })
})

document.querySelector("#next").addEventListener('click',()=>{
    // console.log(songIndex)
    if(songIndex >= 5){
        songIndex = 0;
    }else{
        songIndex = parseInt(songIndex)+1;
    }
    // console.log(songIndex)
    // a = document.querySelector(`#${songIndex}`)

    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    document.getElementById('songSinger').innerText = songs[songIndex].songName;
})

document.querySelector("#previousBtn").addEventListener('click',(e)=>{
    
    // console.log(e.target)

    // console.log(songIndex)
    if(songIndex <= 0){
        songIndex = 5;
    }else{
        songIndex = parseInt(songIndex)-1;
    }
    // console.log(songIndex)

    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    document.getElementById('songSinger').innerText = songs[songIndex].songName;

})




