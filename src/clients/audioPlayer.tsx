// https://stackoverflow.com/questions/7451508/html5-audio-playback-with-fade-in-and-fade-out

const swing = (p : number) => {
    return 0.5 - Math.cos(p * Math.PI) / 2;
}

export class AudioPlayer {
    private trackList : string[]
    private numTracks : number
    private currentIndex = 0
    private currentPlayer : HTMLAudioElement | null = null
    private songChangeCallback : ((currentIndex : number) => void) | null = null
    private isMuted : boolean
    private volume = 0.1

    constructor(trackList : string[], isMuted : boolean = false) {
        this.trackList = trackList
        this.numTracks = trackList.length
        this.isMuted = isMuted
    }

    public play(index : number =this.currentIndex) {
        this.currentIndex = index
        if (this.currentPlayer && !this.currentPlayer.ended) {
            this.currentPlayer.pause()
        }
        this.currentPlayer = new Audio(this.trackList[this.currentIndex])
        this.currentPlayer.muted = this.isMuted
        this.currentPlayer.volume = this.volume

        if (this.songChangeCallback) {
            this.songChangeCallback(this.currentIndex)
        }
        
        this.isMuted ? this.currentPlayer.play() : this.fadeIn()

        this.currentPlayer.addEventListener('ended', () => {
            this.play((this.currentIndex + 1) % this.numTracks)
        })
    }

    public mute() {
        if (this.currentPlayer === null) return;
        this.currentPlayer.muted = true;
        this.isMuted = true
    }

    public unmute() {
        if (this.currentPlayer === null) return;
        this.currentPlayer.muted = false;
        this.isMuted = false
    }

    public updateTrackList(trackList : string[]) {
        if (this.currentPlayer) {
            this.currentPlayer.pause()
            this.currentPlayer = null;
        }
        this.trackList = trackList
        this.currentIndex = 0
        this.numTracks = this.trackList.length
    }

    public setSongChangeCallback(callback : (currentIndex : number) => void) {
        this.songChangeCallback = callback
    }

    private fadeIn () {
        if (!this.currentPlayer) return;

        this.currentPlayer.volume = 0
        this.currentPlayer.play()
        this.adjustVolume(this.volume)

    }

    private async adjustVolume (newVolume : number,{duration = 1000,easing = swing,interval = 13} = {}) {
        if (!this.currentPlayer) return;

        const originalVolume = this.currentPlayer.volume;
        const delta = newVolume - originalVolume;
        if (!delta || !duration || !easing || !interval) {
            this.currentPlayer.volume = newVolume;
            return Promise.resolve();
        }
        const ticks = Math.floor(duration / interval);
        let tick = 1;
        return new Promise((resolve) => {
            const timer = setInterval(() => {
                if (!this.currentPlayer) return;
                this.currentPlayer.volume = originalVolume + (
                    easing(tick / ticks) * delta
                );
                if (++tick === ticks) {
                    clearInterval(timer);
                    resolve();
                }
            }, interval);
        });
    }
}