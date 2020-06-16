window.addEventListener('load', function() {
  const options = {
    loop: true,
    customEvents: {
      canplay: 'videoReady',
      ended: false,
    }
  };

  window.vp = new VideoPlayer('.video-container', options);


  VideoPlayer.prototype.someFancyFunction = function() {
    console.log('some fancy function');
  };

});

function videoReady() {
  console.log('videoReady');
}




(function() {

    this.VideoPlayer = function(targetSelector, options) {

      default_values = {
        loop: false,
        loop_cycles: 3,
        muted: true,
        skip_size: 5, // in seconnds
        targetSelector: targetSelector,
      };

      this.settings = extend(default_values, options);


      this.play_pause = function() {
        if (this.video.paused) {
          this.play.call(this);
        } else {
          this.pause.call(this);
        }
      }.bind(this);

      this.play = function(event) {
        console.log('play', event);
        this.video.play();
      }.bind(this);

      this.pause = function() {
        console.log('pause');
        document.querySelector('[data-fun="p
          this.video.pause();
        }.bind(this);

        this.mute_mute = function() {
          this.video.muted = true;
        }.bind(this)

        this.mute_unmute = function() {
          this.video.muted = false;
        }.bind(this)

        this.mute_toggle = function() {
          this.video.muted = !this.video.muted;
        }.bind(this)

        this.enterFullscreen = function() {
          if (this.video.requestFullscreen) {
            this.video.requestFullscreen();
          } else if (this.video.mozRequestFullScreen) {
            this.video.mozRequestFullScreen();
          } else if (this.video.webkitRequestFullscreen) {
            this.video.webkitRequestFullscreen();
          } else if (this.video.msRequestFullscreen) {
            this.video.msRequestFullscreen();
          }
        }.bind(this)

        this.exitFullscreen = function() {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        }


        this.jumpForward = function() {
          let now = this.video.currentTime;
          then = now + this.settings.skip_size;
          this.video.currentTime = then;
        }.bind(this);

        this.jumpBackward = function() {
          let now = this.video.currentTime;
          then = now - this.settings.skip_size;
          this.video.currentTime = then;
        }.bind(this);

        this.volume = function() {
          console.log('volume');
        }

        init.call(this);
      }

      function init() {

        this.video = build_video_html_tag(this.settings.targetSelector);
        addDefaultEventListener.call(this);
        addCustomEventListener.call(this);
        loadVideoSrc.call(this, this.settings.targetSelector);
        this.controls = build_controls.call(this, this.settings.targetSelector);
      }


      function build_video_html_tag(targetSelector) {
        let target = document.querySelector(targetSelector);
        tmp = document.createElement('video');
        target.appendChild(tmp);
        return tmp;
      }


      function build_controls(targetSelector) {
        if (template_controls == undefined) {
          console.error('no template defined');
        } else {
          let target = document.querySelector(targetSelector);
          let tmp = document.createElement('div');
          tmp.classList.add('controls-container');
          tmp.innerHTML = template_controls;
          target.appendChild(tmp);

          btns = tmp.querySelectorAll('.btn');
          btns.forEach(function(btn) {
            let fun = btn.dataset.fun;
            // console.log(this);
            // console.log(fun);
            console.log(fun, this[fun]);
            btn.addEventListener('click', this[fun]);
          }.bind(this));


          return tmp;
        }
      }

      function addCustomEventListener() {

        console.group('adding custom events');

        let object = this.settings.customEvents;

        for (var property in object) {
          if (object.hasOwnProperty(property)) {
            if (object[property] !== false) {
              console.log(`event: ${property}  callback: ${object[property]}`);
              this.video.addEventListener(property, function() {
                // object[property].call(this);
              });
            }
          }
        }
        console.groupEnd();

      }


      function addDefaultEventListener() {
        console.group('adding default events');

        console.log('event: ended');
        this.video.addEventListener('ended', function() {
          console.log('video ended');
        });

        console.log('event: canplay');
        this.video.addEventListener('canplay', function() {
          console.log('canplay');
        });

        console.groupEnd();

      }

      function loadVideoSrc(targetSelector) {
        target = document.querySelector(targetSelector);
        this.video.src = target.dataset.src;
      }

      // extend a with b AND return it
      function extend(a, b) {
        for (var key in b)
          if (b.hasOwnProperty(key))
            a[key] = b[key];
        return a;
      }

    })()
