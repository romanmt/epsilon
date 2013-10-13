epsilon
=======

JQuery and Node Implementation of the epsilon greedy algorithm.

This project is based on the blog post by Steve Hanov, 
[20 lines of code that will beat A/B testing every time.](http://stevehanov.ca/blog/index.php?id=132)

Epsilon will keep a track of the conversion rate of elements of your page. You can include multiple versions
of a div on your page. Epsilon will chose the version with the best conversion rate 90% of the time. The 
other 10% Epsilon will chose a random version. 

Installation
------------

`npm install git+https://github.com/jamplify/epsilon.git`


### Server Setup
  
``` javascript
var epsilon = require('epsilon');

app.configure(function(){
  epsilon.setup(app);
});
```

### Client Setup
Copy [client/epsilon_greedy.js](client/epsilon_greedy.js) to your public javascripts directory, and include
it in your html.

``` html
<script type='text/javascript' src='YOURJSDIR/epsilon_greedy.js'/>
```

Creating a test
---------------

``` html
<div class='epsilon-test' data-testname='h1-color-test'>
  <div class='epsilon-lever' data-levername='red-h1'>
    <h1 style="color:red;">Buy Some Stuff</h1>
  </div>
  <div class='epsilon-lever' data-levername='blue-h1'>
    <h1 style="color:blue;">Buy Some Stuff</h1>
  </div>
  <a class='epsilon-reward' href='/checkout'>Check out</a>
</div>
```
