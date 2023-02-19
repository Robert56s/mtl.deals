<script>
    import { onMount } from "svelte";
    import { fade, scale } from "svelte/transition";

    onMount(() => {
        // DOM selectors
        const stars = document.getElementById("stars");
        const starsCtx = stars.getContext("2d");

        // global variables
        let screen,
            starsElements,
            starsParams = { speed: 2, number: 300, extinction: 4 };

        // run stars
        setupStars();
        updateStars();

        // update stars on resize to keep them centered
        window.onresize = function () {
            setupStars();
        };

        // star constructor
        function Star() {
            this.x = Math.random() * stars.width;
            this.y = Math.random() * stars.height;
            this.z = Math.random() * stars.width;

            this.move = function () {
                this.z -= starsParams.speed;
                if (this.z <= 0) {
                    this.z = stars.width;
                }
            };

            this.show = function () {
                let x, y, rad, opacity;
                x = (this.x - screen.c[0]) * (stars.width / this.z);
                x = x + screen.c[0];
                y = (this.y - screen.c[1]) * (stars.width / this.z);
                y = y + screen.c[1];
                rad = stars.width / this.z;
                opacity =
                    rad > starsParams.extinction
                        ? 1.5 * (2 - rad / starsParams.extinction)
                        : 1;

                starsCtx.beginPath();
                starsCtx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
                starsCtx.arc(x, y, rad, 0, Math.PI * 2);
                starsCtx.fill();
            };
        }

        // setup <canvas>, create all the starts
        function setupStars() {
            screen = {
                w: window.innerWidth,
                h: window.innerHeight,
                c: [window.innerWidth * 0.5, window.innerHeight * 0.5],
            };
            window.cancelAnimationFrame(updateStars);
            stars.width = screen.w;
            stars.height = screen.h;
            starsElements = [];
            for (let i = 0; i < starsParams.number; i++) {
                starsElements[i] = new Star();
            }
        }

        // redraw the frame
        function updateStars() {
            starsCtx.fillStyle = "black";
            starsCtx.fillRect(0, 0, stars.width, stars.height);
            starsElements.forEach(function (s) {
                s.show();
                s.move();
            });
            window.requestAnimationFrame(updateStars);
        }
    });
</script>


<canvas id="stars" class="page" transition:fade/>

<!-- svelte-ignore a11y-missing-content -->
<a href="/" class="click"></a>
<div class="box" transition:scale={{ duration: 500, opacity: 0.5 }}>
    <slot />
</div>

<style>
    .click {
        height: 90vh;
        width: 100%;
    }
    .page {
        top: 0px;
        position:fixed;
        height: 100%;
        width: 100%;
        cursor: pointer;
        z-index: -1;
    }
    .box {
        color: white;
        display: flex;
        flex-direction: column;
        width: 30rem;
        height: 36.5625rem;
        padding: 1rem;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: rgb(55,55,55);
        background: radial-gradient(circle, rgba(55,55,55,1) 0%, rgba(0,0,0,0.7469188358937324) 100%); 
        border: solid;
        border-radius: 0.5rem;         
        border-color: rgb(65, 65, 141) !important;
    }
</style>
