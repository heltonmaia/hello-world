<script>

window.onload = function () {

function addDataPointsAndRender() {
//Input parameters:
var S   = 10;       //Boyden: azul (460) = 10; amarelo (590) = 9; %blue light: 7.18 (Buszaki); 10.3 (Aravanis). Scattering coefficient (mm-1). Mouse: 11.2; rat: 10.3 (Aravanis, blue); 4.4 (Buszaki, orange); 3.4 (Buszaki, red)
var K   = 0.07;     //Boyden: azul = 0.07; amarelo = 0.027; %Absorption coefficient (blue light, K = = 0.125, Thomas, 2012) (mm-1)
var nt  = 1.36;     //Tissue refractive index
var NA  = 0.48;     //Fiber numerical aperture
var r   = 0.2;      //Fiber radius (mm) OBS: Tava 0.25, ou seja, 250 um de raio??? acho que 125 um de raio e 250 de diametro...
var P   = 20;       //Laser power at tip(mW)
var eta = 1;        //Laser coupling fraction
var d   = 1;        //Distance from fiber (mm)

// Equations:
var A   = Math.PI*Math.pow(r,2);        //Area of fiber (mm2)0
var rh0 = r*(Math.sqrt(Math.pow(nt/NA,2)-1));   //rh0 --> find out!

//Including absorption (according to K-M model):
var a   = 1+(K/S);
var b   = Math.sqrt((Math.pow(a,2))-1);
console.log(b);

var dataPoints = [];
var step = 0.001;
    for (var i=0; i<=d; i+=step){
        var T2      = b/(a*Math.sinh(b*S*i)+b*Math.cosh(b*S*i));
        var gloss   = Math.pow(rh0,2)/(Math.pow(i+rh0,2));   //Geometric loss factor (planilha)
        var Itotal2 = gloss*T2;            //Total tissue intensity ratio I(d)/I(d=0)
        var Itip    = (P/A)*eta;             //Light intensity at tip (mW/mm2)
        var Itarget2= Itip*Itotal2;
   
        dataPoints.push({ x: i, y: Itarget2 });    
    }
    //console.log(rh0);
    console.log(dataPoints);
	console.log(Itotal2);
return dataPoints;
}

var chart = new CanvasJS.Chart("chartContainer", {
	zoomEnabled: true,
	zoomType: "xy",
	interactivityEnabled: true,
	animationEnabled: true,
	animationDuration: 500,
   	exportEnabled: true,  
    
	title:{
		text: "K-M model"
	},
    axisX: {
		title: "Distance (mm)",
        //valueFormatString: "#0,,.",
		gridThickness: 0,
		//suffix : " s"
	},
	axisY: {
		title: "Light Intensity (mW/mm^2)",
		//valueFormatString: "#0,,.",
		//suffix: "mn",
        gridThickness: 0,
		stripLines: [{
			value: 10,
			label: "threshold"
		}]
	},
    data: [{
		yValueFormatString: "#,### mW/mm^2",
		xValueFormatString: "Intensity ",
		type: "line",
		dataPoints: addDataPointsAndRender()
	}],
});

chart.render();
//$("#chartContainer").CanvasJSChart(chart);

}
</script>

