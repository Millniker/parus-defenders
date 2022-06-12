/// <reference path="../typings/phaser.d.ts" />
import { CST } from "../scripts/const.js";
import { shuffle } from "../scripts/Misc.js";
import { loadPlayerData } from "../scripts/PlayerData.js";
export class LoadScene extends Phaser.Scene {
    playlist = [];
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }
    init() {
        this.sound.pauseOnBlur = true;
    }

    loadImages() {
        this.load.setPath("./assets/images");
        for (let prop in CST.IMAGES) {
            this.load.image(CST.IMAGES[prop], CST.IMAGES[prop]+".png");
        }
    }

    loadIcons() {
        this.load.setPath("./assets/icons");
        for (let prop in CST.ICONS) {
            this.load.image(CST.ICONS[prop], CST.ICONS[prop]+".png");
        }
    }

    loadAudio() {
        this.load.setPath("./assets/audio");
        for (let prop in CST.MUSIC) {
            this.load.audio(CST.MUSIC[prop], CST.MUSIC[prop]+".mp3");
            this.playlist.push(CST.MUSIC[prop]);
        }
    }

    loadSprites() {
        this.load.setPath("./assets/sprites");
        for (let prop in CST.SPRITES32) {
            this.load.spritesheet(CST.SPRITES32[prop], CST.SPRITES32[prop]+".png", {
                frameHeight: 32,
                frameWidth: 32
            });
        }
        for (let prop in CST.SPRITES48) {
            this.load.spritesheet(CST.SPRITES48[prop], CST.SPRITES48[prop]+".png", {
                frameHeight: 48,
                frameWidth: 48
            });
        }
        for (let prop in CST.SPRITES64) {
            this.load.spritesheet(CST.SPRITES64[prop], CST.SPRITES64[prop]+".png", {
                frameHeight: 64,
                frameWidth: 64
            });
        }
        for (let prop in CST.SPRITES80) {
            this.load.spritesheet(CST.SPRITES80[prop], CST.SPRITES80[prop]+".png", {
                frameHeight: 80,
                frameWidth: 80
            });
        }
        for (let prop in CST.SPRITES90) {
            this.load.spritesheet(CST.SPRITES90[prop], CST.SPRITES90[prop]+".png", {
                frameHeight: 90,
                frameWidth: 90
            });
        }
        for (let prop in CST.SPRITES96) {
            this.load.spritesheet(CST.SPRITES96[prop], CST.SPRITES96[prop]+".png", {
                frameHeight: 96,
                frameWidth: 96
            });
        }
        for (let prop in CST.SPRITES128) {
            this.load.spritesheet(CST.SPRITES128[prop], CST.SPRITES128[prop]+".png", {
                frameHeight: 128,
                frameWidth: 128
            });
        }
        for (let prop in CST.SPRITES200) {
            this.load.spritesheet(CST.SPRITES200[prop], CST.SPRITES200[prop]+".png", {
                frameHeight: 200,
                frameWidth: 200
            });
        }
        for (let prop in CST.SPRITES240) {
            this.load.spritesheet(CST.SPRITES240[prop], CST.SPRITES240[prop]+".png", {
                frameHeight: 240,
                frameWidth: 240
            });
        }
        for (let prop in CST.SPRITESDRAGON) {
            this.load.spritesheet(CST.SPRITESDRAGON[prop], CST.SPRITESDRAGON[prop]+".png", {
                frameHeight: 87,
                frameWidth: 151
            });
        }
        for (let prop in CST.SPRITECTHULHU) {
            this.load.spritesheet(CST.SPRITECTHULHU[prop], CST.SPRITECTHULHU[prop]+".png", {
                frameHeight: 60,
                frameWidth: 100
            });
        }
    }

    preload() {
        //load image, spritesheet, sound
        this.loadAudio();
        this.loadImages();
        this.loadIcons();
        this.loadSprites();

        //create loading bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        })

        let progressText = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 - 50, 0, { fontFamily: 'ClearSans', fontSize: 36, color: '#ffffff', stroke: "#000000", strokeThickness: 3 }).setDepth(2);

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(50, this.game.renderer.height / 2, (this.game.renderer.width - 100) * percent, 50);
            progressText.setText(`${Math.trunc(percent*100)}%`);
        })

        this.load.on("complete", () => {
            console.log("Load Complete");
        });

        this.load.on("load", (file) => {
            console.log("Loaded " + file.key + " from " + file.src)
        })
    }
    create() {
        this.playlist = shuffle(this.playlist);
        for (let el of this.playlist) {
            this.game.music = this.sound.add(el);
        }
        this.game.music.play({
            mute: false,
            volume: loadPlayerData().OPTIONS.Music/100,
            // rate: 1,
            // detune: 0,
            // seek: 0,
            loop: true,
            // delay: 0
        });
        this.scene.start(CST.SCENES.MENU);
    }
}