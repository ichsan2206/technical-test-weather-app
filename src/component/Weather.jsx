import React, {useState,useEffect} from 'react'
import Loading from './Loading';
import {getDate} from '../helper/helper.js'

export default function Weather() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [query, setQuery] = useState();
  const [mainIcon, setMainIcon] = useState([]);
  const [secondIcon, setSecondIcon] = useState([]);


  const api ={
    key: 'df79971056f876d7ba4f962a6691b6f4',
    baseUrl: 'https://api.openweathermap.org/data/2.5',
  }

  useEffect(() => {
    const getWeather = async () =>{
      try {
       await navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });
    
        setLoading(true)
        await fetch(`${api.baseUrl}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setData(result)
          setMainIcon(result.weather[0])
          console.log(result);
        });
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }
    getWeather()
  }, [lat, long, search]);

  const getSearch = async (event) =>{
    try {
      if (event.key == 'Enter'){
        event.preventDefault();
        await fetch(`${api.baseUrl}/weather/?q=${query}&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setSearch(result)
          setSecondIcon(result.weather[0])
          console.log(result);
        });
        setLoading(false)
        setQuery('')
      }

    } catch (error) {
      console.log(error);
      alert('City Undifined')
      if(error){
        window.location.reload();
      }
    }
  }

  return (
    <div>

      <div className='mt-5'>
        <form>   
            <div className="relative container-search">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-black-500 dark:text-black-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input 
                type="search"
                value={query} 
                onChange={(e)=>setQuery(e.target.value)}
                onKeyPress={getSearch}
                className="block search-bg p-4 pl-10 text-md text-black-900 bg-black-50 rounded-lg border border-white-300 focus:ring-white-500 focus:border-white-500 dark:border-black-600 dark:placeholder-black-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Location and Enter" required="" />
            </div>
        </form>
      </div>

    {/* container Weather */}
    {isLoading? <Loading /> :  
    <div className='my-6 weather-bg'>
    <div className='flex mx-5 lg:mx-10 py-5'>
        <div className='flex-auto w-60 sm:w-50 left'>
        {search == '' ? <p className='text-2xl lg:text-4xl font-semibold mb-2'>{data.name}</p>:<p className='text-2xl lg:text-4xl font-semibold mb-2'>{search.name}</p>}
        <p className='text-sm lg:text-md'>{getDate(new Date)}</p>
        {search == '' ? <h1 className='text-7xl font-bold lg:text-8xl mb-2'>{Math.floor(data.main?.temp)}°</h1>:<h1 className='text-7xl font-bold lg:text-8xl mb-2'>{Math.round(search.main?.temp)}°</h1>}
        {search == '' ? <p className='md:text-xl lg:text-lg mb-0'>Wind: {data.wind?.deg} deg</p>:<p className='md:text-xl lg:text-lg mb-0'>Wind: {search.wind?.deg}   deg</p>}
        {search == '' ? <p className='md:text-xl lg:text-lg'>Preasure: {data.main?.pressure}</p>:<p className='md:text-xl lg:text-lg'>Preasure: {search.main?.pressure}</p>}
        </div>
        <div className='flex-auto right w-40 sm:w-50'>
        <div>
        {search == '' ? <img className='weather-logo' src={`https://openweathermap.org/img/w/${mainIcon?.icon}.png`} alt='img' />:<img className='weather-logo' src={`https://openweathermap.org/img/w/${secondIcon?.icon}.png`} alt='img' />}
        {search == '' ?<p className='text-lg lg:text-xl font-semibold text-center'>{mainIcon?.description}</p>:<p className='text-xl font-semibold text-center'>{secondIcon?.description}</p>}
        </div>
        </div>
    </div>
    </div>
    }
  
    {/* container Prediction tomorow Weather */}
    {/* {isLoading? <Loading /> : 
    <div className='my-6 weather-prediction'>
      <div className='mx-5'>
      <ul>
        <li className='flex py-4 list-prediction'>
          <div className='mx-1 flex-auto'><p>tanggal</p></div>
          <div className='mx-1 flex-auto'><p>80/90</p></div>
          <div className='flex-auto mx-1'>
          <div className='flex mx-1 prediction-align'>
          <img className='weather-prediction-logo' src='https://img2.pngdownload.id/20180520/tg/kisspng-weather-forecasting-logo-5b01bab1b84f10.0513596515268399857549.jpg' alt='img' />
          <p>name cuaca</p>
          </div>
          </div>
          <div className='mx-1 flex-auto'>
          <div className='flex mx-1'>
          <img className='weather-prediction-logos' src='https://img2.pngdownload.id/20180520/tg/kisspng-weather-forecasting-logo-5b01bab1b84f10.0513596515268399857549.jpg' alt='img' />
          <p>80%</p>
          </div>
          </div>
          <div className='mx-1 flex-auto'>
          <div className='flex mx-1 align-middle'>
          <img className='weather-prediction-logos' src='https://img2.pngdownload.id/20180520/tg/kisspng-weather-forecasting-logo-5b01bab1b84f10.0513596515268399857549.jpg' alt='img' />
          <p>nnw 6mph</p>
          </div>
          </div>
        </li>
        <hr size='10px' />
      </ul>
      </div>
    </div>
    } */}
    </div>
  )
}
