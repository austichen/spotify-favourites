// https://stackoverflow.com/questions/7451508/html5-audio-playback-with-fade-in-and-fade-out
const adjustVolume = async (element : HTMLAudioElement ,newVolume : number,{duration = 1000,easing = swing,interval = 13} = {}) => {
    const originalVolume = element.volume;
    const delta = newVolume - originalVolume;
    if (!delta || !duration || !easing || !interval) {
        element.volume = newVolume;
        return Promise.resolve();
    }
    const ticks = Math.floor(duration / interval);
    let tick = 1;
    return new Promise((resolve) => {
        const timer = setInterval(() => {
            element.volume = originalVolume + (
                easing(tick / ticks) * delta
            );
            if (++tick === ticks) {
                clearInterval(timer);
                resolve();
            }
        }, interval);
    });
}

const swing = (p : number) => {
    return 0.5 - Math.cos(p * Math.PI) / 2;
}

const fadeIn = (player : HTMLAudioElement, isMuted : boolean) => {
    if (isMuted) {
        player.muted = true
        player.play()
    } else {
        player.volume = 0
        player.play()
        adjustVolume(player, 1.0)
    }
}


export class AudioPlayer {
    trackList : string[]
    numTracks : number
    currentIndex : number
    currentPlayer : HTMLAudioElement | null
    songChangeCallback : ((currentIndex : number) => void) | null
    isMuted : boolean

    constructor(trackList : string[], isMuted : boolean = false) {
        this.trackList = trackList
        this.numTracks = trackList.length
        this.currentIndex = 0
        this.currentPlayer = null
        this.songChangeCallback = null
        this.isMuted = isMuted
    }

    play(index : number =this.currentIndex) {
        this.currentIndex = index
        if (this.currentPlayer && !this.currentPlayer.ended) {
            this.currentPlayer.pause()
        }
        this.currentPlayer = new Audio(this.trackList[this.currentIndex])
        if (this.songChangeCallback) {
            this.songChangeCallback(this.currentIndex)
        }
        
        fadeIn(this.currentPlayer, this.isMuted)

        this.currentPlayer.addEventListener('ended', () => {
            this.play((this.currentIndex + 1) % this.numTracks)
        })
    }

    mute() {
        if (this.currentPlayer === null) return;
        this.currentPlayer.muted = true;
        this.isMuted = true
    }

    unmute() {
        if (this.currentPlayer === null) return;
        this.currentPlayer.muted = false;
        this.isMuted = false
    }

    updateTrackList(trackList : string[]) {
        if (this.currentPlayer) {
            this.currentPlayer.pause()
            this.currentPlayer = null;
        }
        this.trackList = trackList
        this.currentIndex = 0
        this.numTracks = this.trackList.length
    }

    setSongChangeCallback(callback : (currentIndex : number) => void) {
        this.songChangeCallback = callback
    }

}