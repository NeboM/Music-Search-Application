const vue = new Vue({
   el: "#app",
   data: {
       input: "",
       data: []
   },
    methods: {
       // FETCH DATA FROM ITUNES
        search(){
            this.data = [];
            this.input = this.$refs.input.value;
            this.$refs.input.value = "";
            fetch("https://itunes.apple.com/search?limit=6&term="+this.input+"&country=US&kind=song&media=music&entity=musicTrack")
                .then(res => res.json())
                .then(data => {
                    this.data = data.results;
                })
                .catch(err => alert(err));
                this.$refs.scroll.scrollIntoView({
                    behavior: 'smooth'
                });
        },
        // TOGGLE PLAY/PAUSE
        play(index){
            if(this.$refs.track[index].paused){
                this.$refs.track[index].play();
                this.$refs.playIcon[index].classList.remove('fa-play');
                this.$refs.playIcon[index].classList.add('fa-pause');
            }else{
                this.$refs.track[index].pause();
                this.$refs.playIcon[index].classList.remove('fa-pause');
                this.$refs.playIcon[index].classList.add('fa-play');
            }
        },
        // UPDATE RANGE INPUT ON CHANGE
        seek(index) {
            // CURRENT AUDIO TIME = AUDIO DURATION * ( RANGE VALUE / 100)
            this.$refs.track[index].currentTime = this.$refs.track[index].duration * (this.$refs.range[index].value / 100);
        },
        // UPDATE RANGE INPUT ON TIMEUPDATE
        seekTimeUpdate(index) {
            // CURRENT RANGE VALUE = CURRENT AUDIO TIME * ( 100 / AUDIO DURATION)
            this.$refs.range[index].value = this.$refs.track[index].currentTime * (100 / this.$refs.track[index].duration);
            if(Math.floor(this.$refs.range[index].value) === 100){
                this.$refs.playIcon[index].classList.remove('fa-pause');
                this.$refs.playIcon[index].classList.add('fa-play');
                this.$refs.range[index].value = 1;
            }
        },
        seekVolume(index){
            // from 0 to 1
            this.$refs.track[index].volume = this.$refs.volumeRange[index].value / 100;
        },
        showVolume(index){
            this.$refs.volumeRange[index].style.display = 'block';
        },
        hideVolume(index){
            this.$refs.volumeRange[index].style.display = 'none';
        },
        changeStyle(bool){
            if(bool){
                this.$refs.icon.style.color = 'white';
            }else{
                this.$refs.icon.style.color = '#404040';
            }

        }
    }
});