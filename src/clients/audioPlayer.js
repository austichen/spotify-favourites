// https://stackoverflow.com/questions/7451508/html5-audio-playback-with-fade-in-and-fade-out
const adjustVolume = async (element,newVolume,{duration = 1000,easing = swing,interval = 13} = {}) => {
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

const swing = p => {
    return 0.5 - Math.cos(p * Math.PI) / 2;
}

const fadeIn = player => {
    player.volume = 0
    player.play()
    adjustVolume(player, 1.0)
}


export class AudioPlayer {
    constructor(trackList) {
        this.trackList = trackList
        this.numTracks = trackList.length
        this.currentIndex = 0
        this.currentPlayer = null
        this.songChangeCallback = null
    }

    play(index=this.currentIndex) {
        this.currentIndex = index
        if (this.currentPlayer && !this.currentPlayer.ended) {
            this.currentPlayer.pause()
        }
        this.currentPlayer = new Audio(this.trackList[this.currentIndex])
        if (this.songChangeCallback) {
            this.songChangeCallback(this.currentIndex)
        }
        fadeIn(this.currentPlayer)

        this.currentPlayer.addEventListener('ended', () => {
            this.play((this.currentIndex + 1) % this.numTracks)
        })
    }

    mute() {
        this.currentPlayer.muted = true;
    }

    unmute() {
        this.currentPlayer.muted = false;
    }

    updateTrackList(trackList) {
        if (this.currentPlayer) {
            this.currentPlayer.pause()
            this.currentPlayer = null;
        }
        this.trackList = trackList
        this.currentIndex = 0
        this.numTracks = this.trackList.length
    }

    setSongChangeCallback(callback) {
        this.songChangeCallback = callback
    }

}