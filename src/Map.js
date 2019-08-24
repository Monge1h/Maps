import React, {Component} from 'react';
import logo from './logo.svg';
import icono from './img/red-circle.png'
import './App.css';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiY2hyaXNmdDI1IiwiYSI6ImNqemxheXBpaTB0bXczY2s2MG5rM3BrZzgifQ.IJuNpj8FMzhcaHNXSeJM8w",
});

var centro = null

class Mapa extends Component {

  state={
    lat:null,
    long:null,
    counter: 0,
    center:[]
  }

constructor(props){
  super(props);
  
}


componentDidMount(){
  console.log(this.state)
this.interval2 = setInterval(()=>{
  this.setState({
    counter: this.state.counter+1
  })
},1200);

  this.interval = setInterval(() => {
    fetch('https://lit-reaches-54466.herokuapp.com/coordenadas')
    .then((data)=>{
      return data.json()
    }).then((data =>{

      this.setState({
        lat:data.data.latitud,
        long:data.data.longitud,
      })

      
      // if(this.state.center.length==0){
      //   this.state.center.push(this.state.long)
      //   this.state.center.push(this.state.lat)
      //   console.log(this.state.center)
      //  }
    }))
    
  }, 1000);
  }


componentWillUnmount() {
  clearInterval(this.interval);
  clearInterval(this.interval2);
}



  render(){


  return (
    <div className="App">
      <div>{this.state.counter}</div>
      {
        (this.state.lat) ? (

           
<div>
  
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            zoom={[17]}
            center={[this.state.long,this.state.lat]}
            containerStyle={{
              height: "100vh",
              width: "100vw"
            }}
            renderChildrenInPortal={true}> 
                 
                <Layer
                  type="symbol"
                  id="marker"
                  layout={{ "icon-image": "marker-15", "icon-size":3 }}
                  key={this.state.counter}>
                  <Feature coordinates={[this.state.long,this.state.lat]}/>
                </Layer>
            </Map>
            
                  </div>
                    
        ) : 'Cargando data'
     
        
        
      }
      
    </div>
  );
}
}

export default Mapa
