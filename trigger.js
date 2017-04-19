/*
 *   This file is part of triggerJS.
 *
 *   triggerJS is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   any later version.
 *
 *   triggerJS is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with triggerJS at https://github.com/mhillebrecht/JsTrigger/license.
 *   If not, see <http://www.gnu.org/licenses/>.
 */


const CLICK_EVENT         = "click";
const DATA_CLASS          = "data-class";
const DATA_TOGGLE         = "data-toggle";
const DATA_TARGET         = "data-target";
const DATA_TARGET_CLASS   = "data-target-class";
const DATA_TARGET_TOGGLE  = "data-target-toggle";

function TriggerJS() {
  this.init();

  var clickSources = document.querySelectorAll( '[data-event="click"]' );
  for ( var i = 0; i < clickSources.length; i++ ) {
    // register the click event handler
    clickSources[i].addEventListener( CLICK_EVENT, this.handleToggleEvent );

    // attach the toggle class information to the event
    clickSources[i].defaultClass = clickSources[i].getAttribute( DATA_CLASS );
    clickSources[i].toggleClass = clickSources[i].getAttribute( DATA_TOGGLE );

    // attach the target info
    clickSources[i].targetElem = clickSources[i].getAttribute( DATA_TARGET );
    clickSources[i].targetDefaultClass = clickSources[i].getAttribute( DATA_TARGET_CLASS );
    clickSources[i].targetToggleClass = clickSources[i].getAttribute( DATA_TARGET_TOGGLE );
  }
} 

TriggerJS.prototype = {
  /*
   *  This function initialzes JsTrigger and ensures that
   *  the 'no-js' body class is removed (if existing).
   *
   *  This way, the theme can react on the non-availability of JS
   *  and allows for defining appropriate defaults for otherwise hidden
   *  hidden elements (like the sidebar)
   */
  init: function() {
    var body = document.body;
    if ( body ) {
      if ( body.classList.contains('no-js') ) {
        body.classList.remove( 'no-js' );
      }
    }
  },

  /*
   *  This method is used as an event handler that is capable of two features:
   *
   *    1.) toggling CSS classes of the event source itself
   *    2.) toggling classes of an event target specified by the 'data-target'
   *        attribute.
   */
  handleToggleEvent: function( event ) {
    // toggle the class of the control element itself
    event.target.classList.toggle( event.target.defaultClass );
    event.target.classList.toggle( event.target.toggleClass );

    // toggle the target element
    if ( event.target.targetElem ) {
      if ( !event.target.targetDefaultClass || !event.target.targetToggleClass ) {
        console.error( 'Toggle of target class failed! Parameter missing.' );
      }

      var target = document.getElementById( event.target.targetElem );
      if ( target ) {
        target.classList.toggle( event.target.targetDefaultClass );
        target.classList.toggle( event.target.targetToggleClass );
      }
    }
  }
};

new TriggerJS();
