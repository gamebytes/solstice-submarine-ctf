(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b.choosemode=a(function(a,b,c,d,e){function p(a,b){return"play-online"}function q(a,b){return"login"}function r(a,b){var c="",d;return c+='\n        <span class="game-text">(',d=a,typeof d===k?d=d.call(a,{hash:{}}):d===m&&(d=l.call(a,"this",{hash:{}})),c+=n(d)+")</span>\n      ",c}function s(a,b){return'\n        <span class="game-text">(Requires login)</span>\n      '}function t(a,b){var c="",d;return c+='\n  <footer>\n    <span class="game-text">Not ',d=a,typeof d===k?d=d.call(a,{hash:{}}):d===m&&(d=l.call(a,"this",{hash:{}})),c+=n(d)+'? </span><a href="#logout"><span class="game-text">Logout</span></a>\n  </footer>\n',c}c=c||a.helpers;var f="",g,h,i,j=this,k="function",l=c.helperMissing,m=void 0,n=this.escapeExpression,o=c.blockHelperMissing;f+='<header>\n  <h1 class="game-text">Choose game mode:</h1>\n</header>\n<nav>\n  <ul>\n    <li><a href="#',h=c.id,g=h||b.id,i=j.program(1,p,e),i.hash={},i.fn=i,i.inverse=j.noop,h&&typeof g===k?g=g.call(b,i):g=o.call(b,g,i);if(g||g===0)f+=g;h=c.id,g=h||b.id,i=j.noop,i.hash={},i.fn=i,i.inverse=j.program(3,q,e),h&&typeof g===k?g=g.call(b,i):g=o.call(b,g,i);if(g||g===0)f+=g;f+='">\n      <span class="game-text">Online Matchup</span>\n      ',h=c.id,g=h||b.id,i=j.program(5,r,e),i.hash={},i.fn=i,i.inverse=j.noop,h&&typeof g===k?g=g.call(b,i):g=o.call(b,g,i);if(g||g===0)f+=g;f+="\n      ",h=c.id,g=h||b.id,i=j.noop,i.hash={},i.fn=i,i.inverse=j.program(7,s,e),h&&typeof g===k?g=g.call(b,i):g=o.call(b,g,i);if(g||g===0)f+=g;f+='\n    </a></li>\n    <li><a href="#play-solo">\n      <span class="game-text">VS Easy CPU</span>\n      <span class="game-text">(Not as fun)</span>\n    </a></li>\n  </ul>\n</nav>\n',h=c.id,g=h||b.id,i=j.program(9,t,e),i.hash={},i.fn=i,i.inverse=j.noop,h&&typeof g===k?g=g.call(b,i):g=o.call(b,g,i);if(g||g===0)f+=g;return f+="\n",f}),b.game=a(function(a,b,c,d,e){c=c||a.helpers;var f,g=this;return'<section id="Game"></section>\n'}),b.loader=a(function(a,b,c,d,e){c=c||a.helpers;var f,g=this;return'<section id="Loader">\n  <div>\n    <span class="files"><span class="value">0</span> files</span>\n    <div class="progress"><div class="bar"></div></div>\n    <span class="percent"><span class="value">0</span>%</span>\n  </div>\n</section>\n'}),b.start=a(function(a,b,c,d,e){c=c||a.helpers;var f,g=this;return'<section id="Start">\n  <header>\n    <h1>The Solstice Submarine: Capture the Fork!</h1>\n  </header>\n  <nav>\n    <ul>\n      <li><a href="#choose-mode" class="game-text">Play</a></li>\n      <li><a href="#tutorial" class="game-text">Tutorial</a></li>\n    </ul>\n  </nav>\n</section>\n'}),b.tutorial=a(function(a,b,c,d,e){c=c||a.helpers;var f,g=this;return'<section id="Tutorial">\n  <ol>\n    <li>\n      <span class="game-text">Hello! I am the Solstice Submarine.</span>\n      <img src="assets/images/tutorial/sub.png">\n    </li>\n    <li>\n      <span class="game-text">I want to find this Red Fork..</span>\n      <img src="assets/images/tutorial/sub-spots-fork.png">\n    </li>\n    <li>\n      <span class="game-text">..and bring it back to this Yellow Fork!</span>\n      <img src="assets/images/tutorial/sub-returns-fork.png">\n    </li>\n    <li>\n      <span class="game-text">Tap me to see where I can move..</span>\n      <img src="assets/images/tutorial/sub-considers-move.png">\n    </li>\n    <li>\n      <span class="game-text">..and tap again to select a path.</span>\n      <img src="assets/images/tutorial/sub-picks-path.png">\n    </li>\n    <li>\n      <span class="game-text">Watch out for Rockets!</span>\n      <span class="game-text">They want your fork.</span>\n      <img src="assets/images/tutorial/rocket-shoots-sub.png">\n    </li>\n    <li>\n      <span class="game-text">Your shield can protect you</span>\n      <span class="game-text">but you will move slower.</span>\n      <img src="assets/images/tutorial/sub-activates-shield.png">\n    </li>\n    <li>\n      <span class="game-text">Press End Turn and make your move..</span>\n      <img src="assets/images/tutorial/end-turn.png">\n    </li>\n    <li>\n      <span class="game-text">..be the first to 100 points and win!</span>\n      <img src="assets/images/tutorial/sub.png">\n    </li>\n  </ol>\n  <div class="exit button"></div>\n  <a class="next button"><span class="game-text">Next</span></a>\n</section>\n'}),b.ui=a(function(a,b,c,d,e){c=c||a.helpers;var f,g=this;return'<section class="input">\n  <ul>\n    <li class="exit button"></li>\n    <li class="mode button disabled"></li>\n    <li class="end-turn button disabled"></li>\n    <li class="score">\n      <div class="submarines">\n        <span class="label game-text">sub score: </span><span class="value game-text">0</span>\n      </div>\n      <div class="rockets">\n        <span class="label game-text">rkt score: </span><span class="value game-text">0</span>\n      </div>\n    </li>\n  </ul>\n</section>\n<section class="output">\n  <span class="game-text"></span>\n</section>\n'})})()