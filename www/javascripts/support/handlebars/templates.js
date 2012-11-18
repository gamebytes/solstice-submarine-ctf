(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b.choosemode=a(function(a,b,c,d,e){function p(a,b){return"play-online"}function q(a,b){return"login"}function r(a,b){var c="",d;return c+='\n        <span class="game-text">(',d=a,typeof d===k?d=d.call(a,{hash:{}}):d===m&&(d=l.call(a,"this",{hash:{}})),c+=n(d)+")</span>\n      ",c}function s(a,b){return'\n        <span class="game-text">(Requires Login)</span>\n      '}function t(a,b){var c="",d;return c+='\n  <footer>\n    <span class="game-text">Not ',d=a,typeof d===k?d=d.call(a,{hash:{}}):d===m&&(d=l.call(a,"this",{hash:{}})),c+=n(d)+'? </span><a href="#logout" class="game-text">Logout.</a>\n  </footer>\n',c}c=c||a.helpers;var f="",g,h,i,j=this,k="function",l=c.helperMissing,m=void 0,n=this.escapeExpression,o=c.blockHelperMissing;f+='<header>\n  <h1 class="game-text">Choose game mode:</h1>\n</header>\n<nav>\n  <ul>\n    <li><a href="#',h=c.id,g=h||b.id,i=j.program(1,p,e),i.hash={},i.fn=i,i.inverse=j.noop,h&&typeof g===k?g=g.call(b,i):g=o.call(b,g,i);if(g||g===0)f+=g;h=c.id,g=h||b.id,i=j.noop,i.hash={},i.fn=i,i.inverse=j.program(3,q,e),h&&typeof g===k?g=g.call(b,i):g=o.call(b,g,i);if(g||g===0)f+=g;f+='">\n      <span class="game-text">Online Matchup</span>\n      ',h=c.id,g=h||b.id,i=j.program(5,r,e),i.hash={},i.fn=i,i.inverse=j.noop,h&&typeof g===k?g=g.call(b,i):g=o.call(b,g,i);if(g||g===0)f+=g;f+="\n      ",h=c.id,g=h||b.id,i=j.noop,i.hash={},i.fn=i,i.inverse=j.program(7,s,e),h&&typeof g===k?g=g.call(b,i):g=o.call(b,g,i);if(g||g===0)f+=g;f+='\n    </a></li>\n    <li><a href="#play-solo">\n      <span class="game-text">VS Easy CPU</span>\n      <span class="game-text">(Not as fun :/)</span>\n    </a></li>\n  </ul>\n</nav>\n',h=c.id,g=h||b.id,i=j.program(9,t,e),i.hash={},i.fn=i,i.inverse=j.noop,h&&typeof g===k?g=g.call(b,i):g=o.call(b,g,i);if(g||g===0)f+=g;return f+="\n",f}),b.game=a(function(a,b,c,d,e){c=c||a.helpers;var f,g=this;return'<section id="Game"></section>\n'}),b.loader=a(function(a,b,c,d,e){c=c||a.helpers;var f,g=this;return'<section id="Loader">\n  <div>\n    <span class="files"><span class="value">0</span> files</span>\n    <div class="progress"><div class="bar"></div></div>\n    <span class="percent"><span class="value">0</span>%</span>\n  </div>\n</section>\n'}),b.start=a(function(a,b,c,d,e){c=c||a.helpers;var f,g=this;return'<section id="Start">\n  <header>\n    <h1>The Solstice Submarine: Capture the Fork!</h1>\n  </header>\n  <nav>\n    <ul>\n      <li><a href="#choose-mode" class="game-text">Play!</a></li>\n      <li><a href="#start" class="game-text">How to play</a></li>\n      <li><a href="#start" class="game-text">Story</a></li>\n      <li><a href="#start" class="game-text">Credits</a></li>\n    </ul>\n  </nav>\n</section>\n'})})()