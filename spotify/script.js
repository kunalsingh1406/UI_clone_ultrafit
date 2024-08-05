let currentSong = new Audio();
async function getsongs(){
    let a = await fetch("http://127.0.0.1:3000/spotify/songs/");
    let response = await a.text();
    console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");
    console.log(as)
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        console.log(element)
       
        if(element.href.endsWith(".mp3")){
            
            let aftersongs = element.href.split("/songs/")[1];
            let beforedot = aftersongs.split(".")[0];
            songs.push(beforedot);
        }
        
    }

    return songs;    
}

const playMusic = (track) => {
    currentSong.src = "/spotify/songs/" + track + (".mp3")
    currentSong.play()  
}


async function main(){

    //get the list of all songs
    let songs = await getsongs();
    console.log(songs)
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> <img src="music.svg" alt="music logo">
                            <div class="info">
                                <div class="song-name">${song.replaceAll("%20", " ")}</div>
                                
                            </div>
                            <div class="playnow flex">
                                <span>Play now</span>
                                <img src="play.svg" alt="">
                            </div>
                </li>`;
        
    }    

    //attach an eventlistner to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        console.log(e.querySelector(".song-name").innerHTML)
        e.addEventListener("click", (element) => {
            playMusic(e.querySelector(".song-name").innerHTML);
            
        })
        
    });

    //attach an eventlistener for pausing and playing in playbar
    play.addEventListener("click", () => {
        if(currentSong.paused){
            currentSong.play()
            play.src = "pause.svg"
        }
        else{
            currentSong.pause()
            play.src = "play.svg"
        }
      
    })

}

main()

