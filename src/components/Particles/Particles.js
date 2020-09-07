import React, {Component} from 'react';

import Particles from 'react-particles-js';
import styles from './Particles.module.css';
 
class Particle extends Component{
  
    render(){
        return ( 
            <div className={styles.particles}> 
                <Particles 
                    params={{ 
                        particles: { 
                            number: { 
                                value: 150, 
                                density: { 
                                    enable: true, 
                                    value_area: 1000, 
                                } 
                            }, 
                            color: {
                                value: "#fff"
                            },
                            shape: {
                                type: "circle",
                                stroke: {
                                  width: 0,
                                  color: "#fff"
                                },
                                polygon: {
                                  nb_sides: 5
                                },
                                image: {
                                  src: "img/github.svg",
                                  width: 100,
                                  height: 100
                                }
                            },
                            "opacity": {
                                "value": 0.5,
                                "random": false,
                                "anim": {
                                  "enable": false,
                                  "speed": 1,
                                  "opacity_min": 0.1,
                                  "sync": false
                                }
                            },
                            "size": {
                                "value": 5,
                                "random": true,
                                "anim": {
                                  "enable": false,
                                  "speed": 40,
                                  "size_min": 0.1,
                                  "sync": false
                                }
                              },
                              "line_linked": {
                                "enable": true,
                                "distance": 150,
                                "color": "#fff",
                                "opacity": 0.4,
                                "width": 1
                              },
                              "move": {
                                "enable": true,
                                "speed": 6,
                                "direction": "none",
                                "random": false,
                                "straight": false,
                                "out_mode": "out",
                                "attract": {
                                  "enable": false,
                                  "rotateX": 600,
                                  "rotateY": 1200
                                }
                              }
                            
                        },  
                     }} 
                /> 
           
            </div> 
          );
    };
 
}

export default Particle