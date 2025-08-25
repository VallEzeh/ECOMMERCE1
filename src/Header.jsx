import React from 'react'
import { AiOutlineShop } from 'react-icons/ai'
import { CiSearch } from 'react-icons/ci'
import { IoCartOutline } from 'react-icons/io5'

function Header() {
  return (
     <header  className="h-[150px] w-[100%] flex flex-col justify-between items-center bg-[#f5f5f5]  ">
    
          <div className="h-[70px] w-[100%] flex items-center flex-row  gap-2 justify-around font-bold ">
         <div><a href=""><div className=" text-2xl ">Echo-Emporium</div> <div className="">Electronis stores</div></a></div>
         <div className="relative bg-white h-[40px] w-[600px] border  rounded-2xl  ">
           <a href=""><CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2" /></a>
           <input type="search" placeholder="    Search for products" className="h-[40px] w-[600px] border  rounded-2xl pl-10" />
         </div>
          <a href="" className="flex items-center gap-2"><div><AiOutlineShop /></div>Nigeria</a>
          <a href="" className="flex items-center gap-2"> <IoCartOutline />My cart</a>
          <a href="/Signup" className= "">Login/Register</a>
          </div>
    
          <div className="h-[70px] w-[100%] flex items-center  flex-row  gap-5 justify-around  ">
             <div className="relative"> <a href="" className=""> &nbsp; All Categories  </a> 
             <div className="h-[350px] w-[500px] bg-blue-400 absolute  grid-cols-2 gap-2 left-0 z-10 rounded-2xl p-5 hidden">
    
               <div>
              <ul className= " p-3  flex flex-col space-y-3 "style={{ maxHeight: '300px', overflowY: 'auto' }}>
             <li>Promotion </li>
             <li>Refrigerator</li>
             <li>Freezer</li>
             <li>Washing Machines</li>
             <li>Tvs</li>
             <li>Audio</li>
             <li>ACs</li>
             <li>Cookers/Microwaves</li>
             <li>Open Box/Used</li>
             </ul>
             </div>
    
             <div>
              <ul className="p-3  flex flex-col space-y-3">
              <li>AC</li>
              <li>washing machines</li>
              <li>Open Box/Used</li>
              <li>Refrigerator</li>
             </ul>
             </div>
             
             </div>
             </div>
          <a href="/promotions" className="">Promotion</a>
          <a href="" className="">Refrigerator</a>
          <a href="" className="">Freezer</a>
          <a href="" className="">Washing Machines</a>
          <a href="" className="">Tvs</a>
          <a href="" className="">Audio</a>
          <a href="" className="">ACs</a>
          <a href="" className="">Cookes/Microwaves</a>
          <a href="" className="">Open Box/Ukused</a>
    
          </div>
        </header>
  )
}

export default Header