import React from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { WiWindDeg } from "react-icons/wi";
import { getOptions,GET_API_URL} from "./api";
import './weatherboard.scss';
import { AsyncPaginate } from 'react-select-async-paginate';
class Weatherboard  extends React.Component{
    constructor(props){
        super(props);
        this.state={
            totalres: [],
            activeClick:false,
            nonActiveSlider:false,
            searchItem:null,
            lon:null,
            lat:null,
            cityName:""
        }
    }
    
   async componentDidMount() {
    const {lon,lat} = this.state
      await  axios.get("https://api.openweathermap.org/geo/1.0/direct?q=Hyderabad&limit=5&appid=ba3db7bf7253342b87cca96eee1e6183") 
        .then(res=> res.data)
        .then(result=> {this.setState({result})
        console.log("result11222:::",result,result[0].lat)
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat?lat:result[0].lat}&lon=${lon?lon:result[0].lon}&exclude=hourly,minutely&appid=49cc8c821cd2aff9af04c9f98c36eb74&units=metric`)
         .then(res=> res.data)
         .then(totalres=> this.setState({totalres})) 
     console.log("same use",this.state.totalres)
    })
    }


//dropdown function
    onLoadClick=(inputvalue) => {
      console.log("searchdata1111::",inputvalue)
      return fetch(`${GET_API_URL}/cities?namePrefix=${inputvalue}`,getOptions)
      .then(response=>response.json())
      .then((response)=>{
        return {
          options: response.data.map((city)=>{
            this.setState({lon:city.longitude, lat:city.latitude, cityName:city.name
            })
            console.log("value:::",city)
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            }

        
          })
        }
      }) 
    .catch(function (error) {
        console.error(error);
      });
    }
    handleOnChange=(searchData)=>{
      console.log("searchdata::",searchData)
      this.setState({searchItem : searchData})
    }
    handleClick=() =>{
      this.setState({
        activeClick:!this.state.activeClick,
        nonActiveSlider: !this.state.nonActiveSlider
      })
    }
    handleSearch=() => {
      this.setState({
        activeClick:!this.state.activeClick,
        nonActiveSlider: !this.state.nonActiveSlider
      })
      const {lon,lat} = this.state
   console.log("data check:::",lon,lat)
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=49cc8c821cd2aff9af04c9f98c36eb74&units=metric`)
         .then(res=> res.data)
         .then(totalres=> this.setState({totalres}))
    //  setTotalres(totalres)  
     console.log("same use",this.state.totalres)
    }
render() {
    var newdate,newdate1,newdate2,newdate3,newdate5;
    //today 
    var today = new Date();
    today.setDate(today.getDate());
    newdate5=today.toString()
    newdate5 = newdate5.split(" ") 
    //tomorrow
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    newdate=tomorrow.toString()
    newdate = newdate.split(" ") 
  //new date 2 function 
    var tomorrow2 = new Date(); 
    tomorrow2.setDate(tomorrow2.getDate()+2);
    newdate1=tomorrow2.toString()
    newdate1 = newdate1.split(" ") 
    //new date 3 function 
    var tomorrow3 = new Date();
    tomorrow3.setDate(tomorrow3.getDate()+3);
    newdate2=tomorrow3.toString()
    newdate2 = newdate2.split(" ") 
    //new date 4 function 
    var tomorrow4 = new Date();
    tomorrow4.setDate(tomorrow4.getDate()+4);
    newdate3=tomorrow4.toString()
    newdate3 = newdate3.split(" ") 
    return (
<div className="Main-cntainer">
{this.state.totalres && this.state.totalres.daily && <section className='container-wrapper'>
{/* {<section className='container-wrapper'> */}
{/* { console.log("same use2222",this.state.totalres)} */}
      <aside className={`side-nav ${this.state.activeClick? "hide-silder": ""}`}>
           <div>
            <button className='searchforplaces' onClick={this.handleClick} >Search For Places</button>
            <div className="main-weather-img">  
                {/* <Imageloader></Imageloader> */}
                <img alt="weather" className="img-desc" src={`https://openweathermap.org/img/wn/${this.state.totalres.current.weather[0].icon}@2x.png`} />
                </div>
            {/* {this.state.totalres.current.temp} */}
            <div className="main-class-data">
           <div className="combin-class"> <h1 className="main-temp"> {Math.floor(this.state.totalres.current.temp)} </h1><p className="main-degree">°C</p></div>
           {/* {this.state.totalres.current.weather[0].description } */}
            <p className="main-desc">{this.state.totalres.current.weather[0].description}</p>
            <h1 className="main-day"> Today . {newdate5[0]},{newdate5[2]} {newdate5[1]}</h1>
            <p className="main-day">
           <FaMapMarkerAlt style={{ paddingRight: '5px'}}/>
             {this.state.cityName ? this.state.cityName : "Hyderabad"} </p>
              </div>
           </div>
        </aside>
        <aside className={`side-nav-onclick ${this.state.activeClick? "onclick-active": "hide-silder"}`}>
           <AiOutlineClose onClick={this.handleClick} style={{ paddingLeft: '264px', paddingTop:'10px', paddingBottom:'30px',fontSize:'25px', color:'white'}}/>
           <div>
                          {/* <input type="text" placeholder="Search Locations"/>
                           */}
                           <AsyncPaginate
                           placeholder="Search Locations"
                           debounceTimeout={600}
                           value={this.state.searchItem}
                           loadOptions={this.onLoadClick}
                            onChange={this.handleOnChange}
                          />
            <button className='searchforplaces'  onClick={this.handleSearch}>Search </button>

          
           </div>
        </aside>
        <article className='article-wrapper'>
        <div> 
          <nav>
            <ul>
              {/* <li className='li1'>
              °C
              </li>
              <li className='li2'>
              °F
              </li> */}
            </ul>
          </nav>  
          <div className='weather-review-container'>
            <div className='weather-review1'>
              <p  className="temp-date">  Tommorow     </p>
      {/* <Imageloader></Imageloader> */}
      <img alt="weather" className="img-desc" src={`https://openweathermap.org/img/wn/${this.state.totalres.daily[0].weather[0].icon}@2x.png`} />
      <div className="temp-data">
              <p className="temp-value"> 
              {(Math.floor(this.state.totalres.daily[0].temp.min))}</p>
              <p className="temp-desc">°C</p><p className="temp-value"> {Math.floor(this.state.totalres.daily[0].temp.max)}</p><p className="temp-desc">°C</p>
              </div>
            </div>
            <div className='weather-review2'>
          
              <p  className="temp-date">
              {newdate[0]},{newdate[2]} {newdate[1]}
              </p >
              {/* <Imageloader></Imageloader> */}
              <img alt="weather" className="img-desc" src={`https://openweathermap.org/img/wn/${this.state.totalres.daily[1].weather[0].icon}@2x.png`} />
              <div className="temp-data">
              <p className="temp-value"> 
              {(Math.floor(this.state.totalres.daily[1].temp.min))}</p>
              <p className="temp-desc">°C</p><p className="temp-value"> {Math.floor(this.state.totalres.daily[1].temp.max)}</p><p className="temp-desc">°C</p>
              </div>
            </div>
            <div className='weather-review3'>
              <p  className="temp-date">
              {newdate1[0]},{newdate1[2]} {newdate1[1]}
              </p>
              {/* <Imageloader></Imageloader> */}
              <img alt="weather" className="img-desc" src={`https://openweathermap.org/img/wn/${this.state.totalres.daily[2].weather[0].icon}@2x.png`} />
              <div className="temp-data">
              <p className="temp-value"> 
              {(Math.floor(this.state.totalres.daily[2].temp.min))}</p>
              <p className="temp-desc">°C</p><p className="temp-value"> {Math.floor(this.state.totalres.daily[2].temp.max)}</p><p className="temp-desc">°C</p>
              </div>
            </div>
            <div className='weather-review4'>
              <p className="temp-date">
              {newdate2[0]},{newdate2[2]} {newdate2[1]}
              </p>
              {/* <Imageloader></Imageloader> */}
              <img alt="weather" className="img-desc" src={`https://openweathermap.org/img/wn/${this.state.totalres.daily[3].weather[0].icon}@2x.png`} />
              <div className="temp-data">
              <p className="temp-value"> 
              {(Math.floor(this.state.totalres.daily[3].temp.min))}</p>
              <p className="temp-desc">°C</p><p className="temp-value"> {Math.floor(this.state.totalres.daily[3].temp.max)}</p><p className="temp-desc">°C</p>
              </div>
            </div>
            <div className='weather-review5'>
              <p  className="temp-date">
              {newdate3[0]},{newdate3[2]} {newdate3[1]}
              </p>
              {/* <Imageloader></Imageloader> */}
              <img alt="weather" className="img-desc" src={`https://openweathermap.org/img/wn/${this.state.totalres.daily[4].weather[0].icon}@2x.png`} />
              <div className="temp-data">
              <p className="temp-value"> 
              {(Math.floor(this.state.totalres.daily[4].temp.min))}</p>
              <p className="temp-desc">°C</p><p className="temp-value"> {Math.floor(this.state.totalres.daily[4].temp.max)}</p><p className="temp-desc">°C</p>
              </div>
            </div>
          </div>
          <div className='details-wrapper'>
            <h1> Today's Hightlights</h1> 
            <div className='details-semi-wrapper'>
            <div className='wind-details'>
              <p> wind status</p>
              <h2> {Math.floor(this.state.totalres.current.wind_speed)}MPH</h2>
              <div className="icon-combo"><p className="direction-arrow"><WiWindDeg/></p>
              <p> WSW</p></div>


               </div>
               <div className='humidity-details'>
               <p>Humidity</p>
              <h2> {Math.floor(this.state.totalres.current.humidity)}%</h2>
              <div className="progress-bar"><p>0</p><p>50</p><p>100%</p></div>
              <progress id="file" value={Math.floor(this.state.totalres.current.humidity)} max="100"> 32% </progress>
               </div>

               <div className='visibilty-details'>
               <p>visibilty</p>
              <h2>{Math.floor((this.state.totalres.current.visibility)/1000)} miles</h2>
   
               </div>
               <div className='Air-details'>
               <p>Air Presure</p>
              <h2>{Math.floor(this.state.totalres.current.visibility)} mb</h2>
   
               </div>
</div>
            </div> 

        </div>
        </article>
     
      </section>}

</div>
    );
}
}
export default Weatherboard