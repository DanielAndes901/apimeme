import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hmw-homePageOneSlider',
  templateUrl: './homePageOneSlider.component.html'  
})
export class HomePageOneSliderComponent implements OnInit {

   slideConfig = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll:1,
      autoplay: true,
      autoplaySpeed: 100,
      //cssEase:'linear',
      //fade:true,
      dots: false,
      arrows: false,
      rtl: false,

      responsive: [
       {
          breakpoint: 68,
          settings: {
             arrows: false,
             slidesToShow: 1
          }
          },
       {
          breakpoint: 480,
          settings: {
             arrows: false,
             slidesToShow: 1
          }
       }
      ]
   };

   public slides = [
      {
         title : "Web Design",
         content : 'We help you drive engagement and loyalty at every stage of the customer journey. </br>' + 
                  'From user-centric front-end web development and designs that wow to CRM tools that empower your employees, we have you covered. <br>' +
                  'From our start in 2014, Rightpoint was created to push the boundaries of transformative web solutions. <br>' + 
                  'Since then, we have been steadily ahead of the tech curve. <br> <br>' +
                  'We’ve developed web apps and mobile apps alongside the introduction of the iPhone SDK, the App Store, and other notable tech industry turning points.',

         image : 'slider-img-1',
      },
      {
         title : "Trading System Development",
         content : 'We are so confident in our traders and our qualification program that we back our traders with substantial trading capital to maximize profits. <br> <br>' +
                  'By giving our traders access to more capital, we give them better flexibility in their trading and greater than average profit potential. <br>',
         image : 'slider-img-2',
      },
      {
         title : "End-To-End Product Development",
         content : 'A website is much more than meets the eye. <br>' + 
                   'Our expertise will maximize the impact of your web solution from both a design and development perspective. <br> <br>' + 
                   'We are knowledgeable of current Search Engine Optimization (SEO) practices, performance enhancements, accessibility, and getting projects to scale. <br> <br>' +
                   'We’re also experienced with streaming media, push notification servers, employee-facing administration panels, and many more options.',
         image : 'slider-img-3',
      },
      {
         title : "Custom eCommerce Websites",
         content : 'We are consultants as well as coders, and help organizations align their technology to their business goals. <br> <br>' + 
                   'Use our expertise to help you shape and pressure test your digital strategy, to ensure what we ultimately build has longevity and drives growth.',

         image : 'slider-img-4',
      }
    ];

   constructor() { }


   ngOnInit() {

      this.slideConfig.autoplaySpeed = 5000;

   }

    addSlide() {
      
    }
    
    removeSlide() {
      this.slides.length = this.slides.length - 1;
    }
    
    slickInit(e) {
      
    }
    
    breakpoint(e) {
      
    }
    
    afterChange(e) {
      
    }
    
    beforeChange(e) {
      
    }

}
