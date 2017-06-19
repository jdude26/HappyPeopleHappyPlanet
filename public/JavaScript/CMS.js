// JavaScript Document
/*jshint esversion: 6 */
	  var config = {
		apiKey: "AIzaSyD0B79vzZgIQ9brLCa5rp2755s3KiPvzp0",
		authDomain: "happypeoplehappyplanet-c0312.firebaseapp.com",
		databaseURL: "https://happypeoplehappyplanet-c0312.firebaseio.com",
		projectId: "happypeoplehappyplanet-c0312",
		storageBucket: "happypeoplehappyplanet-c0312.appspot.com",
		messagingSenderId: "429221643578"
	  };
	  firebase.initializeApp(config);
var database = firebase.database();
var cards = database.ref(here);

function shuffle(array) {
	'use strict';
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


var abc=0;
var x =0;
var randArray = [];
for(var i = 0; i<27; i++){
	randArray.push(i);
}
var ranNums = shuffle(randArray);

cards.once('value', function(snapshot) {
	"use strict";
  snapshot.forEach(function(childSnapshot){
	  var card = childSnapshot;
	  var title = card.val().Title;
	  var subtitle = card.val().Subtitle;
	  var content= card.val().Content;
	  var IsFirst = card.val().IsFirst;
	  var IsLast = card.val().IsLast; 
	  var rand = ranNums[x];x++;
	  var action1 = card.val().Action1Text;
	  var action2 = card.val().Action2Text;
	  var action3 = card.val().Action3Text;
	  var action4 = card.val().Action4Text;
	  if(action1 !==''){
		  action1=`<button onclick="location.href='${card.val().Action1URL}';" class="mdc-button mdc-button--compact mdc-card__action">${card.val().Action1Text}</button>`;
	  }
	  if(action2 !==''){
		  action2=`<button onclick="location.href='${card.val().Action2URL}';" class="mdc-button mdc-button--compact mdc-card__action">${card.val().Action2Text}</button>`;
	  }
	  if(action3 !==''){
		  action3=`<button onclick="location.href='${card.val().Action3URL}';" class="mdc-button mdc-button--compact mdc-card__action">${card.val().Action3Text}</button>`;
	  }
	  if(action4 !==''){
		  action4=`<button onclick="location.href='${card.val().Action4URL}';" class="mdc-button mdc-button--compact mdc-card__action">${card.val().Action4Text}</button>`;
	  }
	  var actions = action1 + action2 + action3 + action4;
	  var cardContent = `
	  				<div class='mdc-card demo-card demo-card--with-avatar'>
					  <section class='mdc-card__primary'>
						<div class='demo-card__avatar'></div>
						<h1 class='mdc-card__title'>${title}</h1>
						<h2 class='mdc-card__subtitle'>${subtitle} &nbsp;</h2>
						<section class="mdc-card__media demo-card__16-9-media" style="background-image: url(Design/MediaHeaders/Header${rand}.png);"></section>
					  </section>

					  <section class='mdc-card__supporting-text'>
					  	${content}
					  </section>
					  <section class='mdc-card__actions'>${actions}
					  </section>
					 </div>
	  `;

	  if(IsFirst){$("#cms").append($.parseHTML(`<div id="${abc}" class="cards" data-scroll="toggle(.fromTopIn, .fromTopOut)">`)); }
	  $("#" + abc).append(cardContent);
	  if(IsLast){$("#cms").append("</div><div class='clear'></div>");++abc; }

  });
	var trigger = new ScrollTrigger();
});
