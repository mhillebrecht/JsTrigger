/*
 *   This file is part of trigger.js
 *
 *   trigger.js is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   any later version.
 *
 *   trigger.js is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with triggerJS at https://github.com/mhillebrecht/JsTrigger/LICENSE.
 *   If not, see <http://www.gnu.org/licenses/>.
 */


// define which data attribute to be used
 const DATA_TOGGLE = "data-toggle";

/**
 *	trigger.js is making use of ES6 syntax. 
 */
class JsTrigger {

	// on object creation ...
	constructor() {

		// ... look-up all elements that have a DATA_TOGGLE attribute defined
		// and add them a 'click' event listener
		var toggles = document.querySelectorAll( '[' + DATA_TOGGLE + ']' );

		for ( var i = 0; i < toggles.length; i++ ) {
			toggles[i].addEventListener( "click", this.handleToggleEvent );
			toggles[i].toggleBodyClass = toggles[i].getAttribute( DATA_TOGGLE );
		}
	}

	handleToggleEvent( event ) {
		event.preventDefault();

		// toogle the body class as given in the DATA_TOGGLE attribute
		document.body.classList.toggle( event.target.toggleBodyClass );
	}
}

new JsTrigger();
