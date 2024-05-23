import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { useEffect, useState } from 'react';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState(['']);

  const loadData = async()=>{
    let response = await fetch("http://localhost:3000/api/foodData",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(()=>{
    loadData();
  },[]);

  return (
    <div className='main'>
      <div><Navbar/></div>
      <div>
        <div className="main-section">
          <div className="tagline">What are<br/>You Ordering<br/>Today?<br/><span id="starting">*Items starts from &#8377;99</span></div>
          <div className="main-image"><img src="../../food-delivery.png" alt=""/></div>
        </div>
          <div id='item-search'><><input type="search" id="searchbar" placeholder="Search..." value={search} onChange={(e)=>{setSearch(e.target.value.toLowerCase())}}/></></div>
      </div>

      <div className='container'>
        {
          foodCat && foodCat.length !== null ?
            foodCat.map((data) => {
              return (
              <div className='category'>
                <div key={data._id} className='category-name'>
                  {data.CategoryName}
                </div>
                <hr/>
                <div className='card-container'>
                { 
                  foodItem.length !== null? foodItem.filter((item) => item.CategoryName === data.CategoryName && (item.name.toLowerCase()).includes(search))
                  .map(filterItems=>{
                  return(
                    <div key={filterItems._id} className='item-card'>
                      <Card foodItem={filterItems}
                      options={filterItems.options[0]} 
                      imgSrc={filterItems.img}></Card>
                    </div>
                  )
                }) : <div>No such data found...</div>
              }
              </div>
              </div>
            )})
           : "Hello World"
        }  
      </div>
      <div><Footer /></div>
    </div>
  )
}
