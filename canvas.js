var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillRect(x, y, width, height);
// c.fillStyle = 'rgba(255, 0, 0, 0.7)'; //fillStyle for first rectangle
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.7)';
// c.fillRect(400, 100, 100, 100);
// c.fillRect(300, 300, 100, 100);
//
// console.log(canvas);
//
// // drawing lines
// c.beginPath();
// //c.moveTo(x, y);
// c.moveTo(50, 400);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "blue";
// c.stroke();

// Arc /Circle
// c.beginPath();
// c.arc(300, 300, 50, Math.PI * 2, false);
// c.strokeStyle = "green";
// c.stroke();

// for (var i = 0; i < 4; i ++){
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, Math.PI * 2, false);
//   c.strokeStyle = "red";
//   c.stroke();
// }

  //global variables declaration
  // var x = Math.random() * innerWidth;
  // var y = Math.random() * innerHeight;
  // var dx = (Math.random() - 0.5) * 10;
  // var dy = (Math.random() - 0.5) * 10;
  // var radius = 30;

  var mouse = {
      x: undefined,
      y: undefined
  }
  var maxRadius = 40;
  var minRadius = 2;

//color array for the circles.
  var colorArrray = [
    '#A85E0A',
    '#FFA339',
    '#F5911E',
    '#0076A8',
    '#1EB5F5',
  ];
  console.log();

// Event Listener
  window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
  })

  window.addEventListener('rezise', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  })
// Object Oriented JS function
  function Circle(x, y, dx, dy, radius) {
      this.x = x;
      this.y = y;
      this.dx = dx; //xvelocity
      this.dy = dy; //yvelocity
      this.radius = radius;
      this.minRadius = minRadius;
      this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

      //method draw
      this.draw = function() {
          c.beginPath();
          c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); //properties
          // //c.strokeStyle = 'blue';
          // c.stroke();
          // c.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)];
          c.fillStyle = this.color;
          c.fill();
      }
      //method update
      this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();

        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50)
        {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }

        }   else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();

      }
  }

  // create array to store the x number of cirles
  var circleArray = [];

  function init() {
    circleArray = [];

    for (var i = 0; i < 50; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        //the array pushes new circle each time it refreshes
        circleArray.push(new Circle(x, y, dx, dy, radius));
        //var circle = new Circle(200, 200, 3, 3, 30);
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
  }

  init();
