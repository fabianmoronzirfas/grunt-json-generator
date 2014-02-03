/*jslint node: true */
/*jshint strict:false */


/*global module:false*/
module.exports = function (grunt) {
  // load all grunt tasks matching the `grunt-*` pattern
  // require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({});

  // These plugins provide necessary tasks.
  // by using the load-grunt-tasks modul
  // this is obsolete

  grunt.registerTask('default', 'Autogenerate example data', function () {
    var fs = require('fs');
    var maxConnections = 3;
    var copies = 20;
    var item = {
      "id": 0,
      "name": "",
      "comment": "",
      "connectionids": null,
      "x": 0,
      "y": 0,
      "meta": {
        "type": "image",
        "file": "item-3333.jpg",
        "duration": "01:00:00",
        "encoder": "",
        "fps": 0,
        "width": 1280,
        "height": 720,
        "ratio": "16:9",
        "audio": "0",
        "comment": ""
      }
    };

    buzz = [
      /* THE FIRST LINE */
      ["one", "swissd", "awsome", "delicious", "incredible", "great", "fancy", "fantastic", "phenomenal", "superb", "exciting", "inspiring", "strong", "compelling", "solid", "exceptional", "promising", "growing", "successful", "prosperous", "revolutionary", "exciting", "market-altering", "amazing", "marvelous", "deep", "atomic", "heroic", "supercalifragilisticexpialidocious", "reverse", "national", "nifty", "sweet", "hot", "def", "evil", "rad", "mad", "geeky", "bad", "deadly", "swissd_metallic", "iron", "horrofic", "agonizing", "damned", "rude", "bouncing", "dark", "blueisch", "squirrly", "squishy", "10000"],
      /* THE SECOND LINE */
      ["natael", "alien", "zombie", "house", "ocean", "dude", "walrus", "north star", "fist", "robotron", "deep space", "fabiantheblind", "SWISSD", "swissd", "tiki", "beast", "NARF!", "fnord", "adobe", "aescripts", "wolpertinger", "warrior", "buddy", "rocker", "tooth fairy", "robo", "milk"],
      /* THE THIRD LINE */
      ["natael", "concept", "productivity", "algorithm", "help desk", "ability", "rocker", "open system", "open-source", "monster", "Fourty Two", "Poit!", "Mumbo Jumbo", "audio", "video", "IN 3D!", "jam", "doctor", "santa"],
      /* THE FORTH LINE */
      ["you heard it on the radio - you've seen it on the tv show", "in cinemas around town", "lo onda es mia", "free spreeken - SCHTONK!", "http://fabiantheblind.info", "go go power ranger", "build with swissd!"]
    ];

    var num_gen = function (min, max) {
      /**
       * Returns a random integer between min and max
       * Using Math.round() will give you a non-uniform distribution!
       */
      return Math.floor(Math.random() * (max - min + 1)) + min;

    };

    var con_gen = function (min, max, range) {
      var nums = [];
      while (nums.length < max) {
        var randomnumber = Math.ceil(Math.random() * range);
        var found = false;
        for (var i = 0; i < nums.length; i++) {
          if (nums[i] == randomnumber) {
            found = true;
            break;
          }
        }
        if (!found) nums[nums.length] = randomnumber;
      }
      return nums;
    };

    // recursive function to clone an object. If a non object parameter
    // is passed in, that parameter is returned and no recursion occurs.
    var cloner = function (obj) {
      if (obj === null || typeof obj !== 'object') {
        return obj;
      }
      var temp = obj.constructor(); // give temp the original obj's constructor
      for (var key in obj) {
        temp[key] = cloner(obj[key]);
      }
      return temp;
    };
    var arr = [];

    for (var i = 0; i < copies; i++) {

      var clone = cloner(item);
      clone.id = i;
      clone.connectionids = con_gen(0, num_gen(0, maxConnections), copies);
      /**
       * buzzgen
       */
      var name = buzz[0][Math.floor(Math.random() * buzz[0].length)];
      name += " " + buzz[1][Math.floor(Math.random() * buzz[1].length)];
      var comment0 = buzz[2][Math.floor(Math.random() * buzz[2].length)];
      var comment1 = buzz[3][Math.floor(Math.random() * buzz[3].length)];
      clone.name = name;
      clone.comment = comment0;
      clone.meta.comment = comment1;


      arr.push(clone);
    }
    var data = {
      "nodes": arr,
      links: []
    };
    var str = JSON.stringify(data, null, 2);
    console.log(str);
    fs.writeFileSync("autogen-example.json", str, 'utf8');

  });
};