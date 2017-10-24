import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReferencePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reference',
  templateUrl: 'reference.html',
})
export class ReferencePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReferencePage');
  }


  lessons = [
    {
      ref: "https://www.esa.int/esaKIDSen/SEMFGSE1GZH_OurUniverse_0.html"
    },
    {
      ref: "https://www.esa.int/esaKIDSen/StoryoftheUniverse.html"
    },
    {
      ref: "https://www.esa.int/esaKIDSen/TheSun.html"
    },
    {
      ref: "https://www.esa.int/esaKIDSen/Planetsandmoons.html"
    },
    {
      ref: "https://www.esa.int/esaKIDSen/Cometsandmeteors.html"
    },
    {
      ref: "https://www.esa.int/esaKIDSen/Earth.html"
    },
    {
      ref: "https://www.esa.int/esaKIDSen/Climatechange.html"
    },
    {
      ref: "https://www.esa.int/esaKIDSen/Naturaldisasters.html"
    },
    {
      ref: "https://www.esa.int/esaKIDSen/Protectingnature.html"
    },
    {
      ref: "https://www.esa.int/esaKIDSen/Waterworld.html"
    },
    {
      ref: "http://www.cotf.edu/ete/ess/essspheres.html"
    },
    {
      ref: "https://www.esa.int/esaKIDSen/Waterworld.html"
    },
    {
      ref: "https://climate.nasa.gov/solutions/adaptation-mitigation/"
    },
    {
      ref: "http://geology.com/articles/tsunami-geology.shtml"
    },
    {
      ref: "http://science.howstuffworks.com/environmental/earth/geology/landslide4.htmhttp://science.howstuffworks.com/environmental/earth/geology/landslide4.htm"
    },
    {
      ref: "https://earthquake.usgs.gov/learn/kids/eqscience.php"
    }
  ];


  images = [
    {
      ref: "http://www.latimes.com/local/california/la-me-0918-tsunami-waves-20150918-story.html"
    },
    {
      ref: "https://www.rte.ie/news/2017/0814/897319-sierra-leone/"
    },
    {
      ref: "https://www.britannica.com/place/Chimborazo-mountain-Ecuador"
    },
    {
      ref: "Patricia Hidalgo/dreamstime.com"
    },
    {
      ref: "http://www.dailymail.co.uk/news/article-1163121/Pictured-The-spectacular-eruption-underwater-volcano-South-Pacific.html"
    },
    {
      ref: "https://www.nationalgeographic.org/encyclopedia/ring-fire/"
    },
    {
      ref: "http://www.bbc.com/news/world-latin-america-26847793"
    }
  ];





}
