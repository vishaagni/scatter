import React, { Component } from 'react';
import * as d3 from "d3";

import './App.css';


export default class Plot extends Component {

  // Initial state of data to be rendered
 
  state = { 
     data : [{

      // Json values needed for rendering the plot

        values:[{eid: 0 , height: 0 , did: 0 , salary: 0 , dName: "d"}],
      
        //Json values needed for selecting the department from the drop-down list
      
        dept:[{dept_id:0, dept_name:'--Select--'}]
          }],

        // Json to push the data department-wise  

          d:[{
            label:'A',
            v:[{x:0, y:0}]
            }       
        ],

        // State change variables 

          t_d_id: '0',
          t_dept_name:'--Select--',
        }



        constructor(props)
    {
        super(props);

        // Method for pushing department-wise data in an array 
        this.plot=this.plot.bind(this);
        
        // Method for rendering the scatter plot
        this.renderPlot=this.renderPlot.bind(this);

        // Method for drop-down event handeling
        this.handleChange=this.handleChange.bind(this);
    }

  
    componentDidMount() {

      fetch('http://localhost:5007/')
        // when we get a response map the body to json
        .then(response => response.json())
        // and update the state data to said json
        .then(data => this.setState({ data }));
    }
    

       plot(did1) {

        console.log('---------------------------------------------');

        var dataset = [];
        var json= {};

            d3.select("svg").remove();
          if(this.state.data[0].values.length>1) {

            for( var i=0 ; i < this.state.data[0].values.length; i++)
         {
             if(parseInt(this.state.data[0].values[i].did)==did1)
             {
                const height = parseInt(this.state.data[0].values[i].height);
                const salary = parseInt(this.state.data[0].values[i].salary);
                const arr = [];
                
                arr.push(height);
                arr.push(salary);

                json.x = height
                json.y = salary
//alert(height);
//alert(salary);
                this.state.d[0].v.push(json);

                dataset.push(arr);
                //alert(" id= "+this.state.data[0].values[i].did+" eid : "+this.state.data[0].values[i].eid);


             }
           
         } 

        var padding = 20;
        var xScale=d3.scaleLinear().domain([145,195])
        .range([padding,700-padding]).clamp(true);
        
        var yScale=d3.scaleLinear().domain([0,600000]).range([480,100]).clamp(true);
        
        
        var xAxis=d3.axisBottom()
        .scale(xScale).ticks(12);
        
        
        var yAxis=d3.axisLeft().scale(yScale).ticks(8);
        
        
        var svg = d3.selectAll("div.SP")
        .append("svg")
        .attr("width", 800)
        .attr("height", 600);
      //  .attr("viewBox","-100 -100 900 900");
        
        
        svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return xScale(d[0])+50;
        })
        .attr("cy", function(d) {
            return yScale(d[1]);
        })
        .attr("r", "2")
        .style("fill","blue");
        
        svg.append("g")
        .attr("className", "axis") 
        .attr("transform", "translate(50,"+(500-padding)+" )")
        .call(xAxis);
        
        svg.append("g")
        .attr("className","yaxis")
        .attr("transform","translate("+(padding+50)+",0)")
        .call(yAxis);

          }
        }


        renderPlot = () =>
        {
          
          return this.state.data[0].dept.map(value=>{
          return (
                  
              <option value={value.dept_id}>{value.dept_name} </option>
    
          )
          
          }) 
          
        }
        
        
        handleChange(event)
        {
            this.setState({t_d_id : event.target.value})
            this.plot(event.target.value);
        }
        
        
        render() {
        return (

                <div className="SP">

                <select onChange={this.handleChange} value={this.state.t_d_id}>
                <option value={0}>- - Select - -</option>
                {this.state && this.state.data && this.renderPlot()}
                </select>

                <br/>
           
         </div>
        )
        }
    }


  ReactDOM.render(
    <Plot />,
    document.getElementById('root')
  );
