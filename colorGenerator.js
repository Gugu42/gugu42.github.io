var col = "";

function generateButtons() {
    col = getRandomColor();

    document.getElementById("blackBtn").style.backgroundColor = "#" + col;
    document.getElementById("whiteBtn").style.backgroundColor = "#" + col;
}


function pickWhite(color) {
    var output = {
        input: {
            r:(hexToRgb(col).r / 255),
            g:(hexToRgb(col).g / 255),
            b:(hexToRgb(col).b / 255)
        },
        output:{
            white:1
        }
    };

    document.getElementById("jsonOutput").value += (JSON.stringify(output) + ",");

    generateButtons();
}

function pickBlack() {
    var output = {
        input: {
            r:(hexToRgb(col).r / 255),
            g:(hexToRgb(col).g / 255),
            b:(hexToRgb(col).b / 255)
        },
        output:{
            black:1
        }
    };

    document.getElementById("jsonOutput").value += (JSON.stringify(output) + ",");

    generateButtons();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
window.onload = function() {
    generateButtons();
};

function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}