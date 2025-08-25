import React from "react";
import { CiSearch } from 'react-icons/ci'
import { AiOutlineShop } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";



function Home() {
  return (
   <main className=" ">
     

    <div className="h-[350px] w-[1250px]  mt-15 rounded-3xl ml-2">
      <a href="" className="bg-cover bg-center h-full w-full block rounded-3xl" style={{ backgroundImage: `url(electronics.jpg)` }}>
        <img src="shoptv.jpeg" alt="" className="hidden" />
      </a>
    </div>

    <h1 className="text-2xl mt-5 ml-5">Categories</h1>

    <nav className=" h-[400px] w-[100%] flex flex-col">
      <div className=" h-[200px] grid grid-cols-5 gap-2 p-2"> 
        <div className=" rounded-2xl" > <a href="" className="bg-cover bg-center h-full w-full block rounded-2xl text-blue-500" style={{ backgroundImage: `url(tv2.jpg)` }}> <div className="flex justify-end h-full items-end mr-3">Tvs</div></a></div>
        <div className="  rounded-2xl"><a href="" className="bg-cover bg-center h-full w-full block rounded-2xl text-blue-500" style={{ backgroundImage: `url(speaker.jpg)` }}> <div className="flex justify-end h-full items-end mr-3">Audio</div></a></div>
        <div className="  rounded-2xl"><a href="" className="bg-cover bg-no-repeat bg-center h-full w-full block rounded-2xl text-blue-500" style={{ backgroundImage: `url(frigde.jpg)` }}> <div className="flex justify-end h-full items-end mr-3">Refrigerator</div></a></div>
        <div className=" rounded-2xl"><a href="" className="bg-cover bg-center h-full w-full block rounded-2xl text-blue-500" style={{ backgroundImage: `url(wash.jpg)` }}> <div className="flex justify-end h-full items-end mr-3">Washing Machines</div></a></div>
        <div className=" rounded-2xl"><a href="" className="bg-cover bg-center h-full w-full block rounded-2xl text-blue-500" style={{ backgroundImage: `url(ac.jpg)` }}> <div className="flex justify-end h-full items-end mr-3">ACs</div></a></div>
      </div>


      <div className=" h-[200px] grid grid-cols-5 gap-2 p-2">
       <div className=" rounded-2xl"> <a href="" className="bg-cover bg-center h-full w-full block rounded-2xl text-blue-500" style={{ backgroundImage: `url(kitchen.jpg)` }}> <div className="flex justify-end h-full items-end mr-3">Kitchen</div></a></div>
        <div className="rounded-2xl"><a href="" className="bg-cover bg-center h-full w-full block rounded-2xl text-blue-500" style={{ backgroundImage: `url(panel.jpg)` }}> <div className="flex justify-end h-full items-end mr-3">Panels</div></a></div>
        <div className="rounded-2xl"><a href="" className="bg-cover bg-center h-full w-full block rounded-2xl text-blue-500" style={{ backgroundImage: `url(furni.jpg)` }}> <div className="flex justify-end h-full items-end mr-3">Furniture</div></a></div>


      </div>
    </nav>

    <div className="h-[600px] w-[1250px] bg-gray-300 flex  mt-5 ml-2 rounded-3xl ">
      <nav className="h-[550px] w-[600px]  mt-6 ml-5  bg-cover bg-center bg-inherit bg-no-repeat" style={{backgroundImage: "url(hisense.webp)"}}></nav>

      <div className="  mt-6 ml-2"><h1 className="text-2xl ml-5 ">Hisense TV ULED 110 Inch UX Series Mini-LED 4K <br /> Smart</h1><h1 className="mt-5 ml-5">NG 16,900,000 <br /><br /> Description: <br /><br />Built-in subwoofer <br />Top-firing speakers <br />Side speakers <br />CineStage X Surround..</h1>
      <a href=""><div  className="h-[50px] w-[200px] bg-black text-white mt-10 ml-5 rounded-2xl  flex items-center justify-center" >View Products Details</div></a>
       </div>
    </div>

   <h1 className="text-2xl  mt-5 ml-5">Shop By Brand</h1>

   <nav className=" h-[400px] w-[100%] flex flex-col">
      <div className=" h-[100px] grid grid-cols-5 gap-2 p-2"> 
        <div className=" rounded-2xl" > <a href="" className="bg-cover bg-center h-full w-full block rounded-2xl" style={{ backgroundImage: `url(lg.png)` }}></a><h1 className="flex justify-end mt-35 text-[20px] mr-2 text-white"></h1></div>
        <div className="  rounded-2xl"><a href="" className="bg-cover bg-center h-full w-full block rounded-2xl" style={{ backgroundImage: `url(sam.png)` }}></a><h1 className="flex justify-end mt-35 text-[20px] mr-2 text-white"></h1></div>
        <div className="  rounded-2xl"><a href="" className="bg-cover bg-no-repeat bg-center h-full w-full block rounded-2xl" style={{ backgroundImage: `url(tcl.png)` }}></a><h1 className="flex justify-end mt-35 text-[20px] mr-2 text-white"></h1></div>
        <div className=" rounded-2xl"><a href="" className="bg-cover bg-center h-full w-full block rounded-2xl" style={{ backgroundImage: `url(royal.png)` }}></a><h1 className="flex justify-end mt-35 text-[20px] mr-2 text-white"></h1></div>
        <div className=" rounded-2xl"><a href="" className="bg-cover bg-center h-full w-full block rounded-2xl" style={{ backgroundImage: `url(hilogo.jpeg)` }}></a><h1 className="flex justify-end mt-35 text-[20px] mr-2 text-white"></h1></div>
      </div>


      <div className=" h-[100px] grid grid-cols-5 gap-2 p-2  mt-20">
       <div className=" rounded-2xl"> <a href="" className="bg-cover bg-center h-full w-full block rounded-2xl" style={{ backgroundImage: `url(pana.png)` }}></a><h1 className="flex justify-end mt-35 text-[20px] mr-2 text-white"></h1></div>


      </div>
    </nav>
    <div className="h-[300px] w-[100%] bg-cover bg-amber-300 mb-10  rounded-3xl flex items-center justify-center">

        <video src="samsungad.mp4" controls className="w-full h-full object-cover" loop autoPlay />

    </div>
    <h1 className="text-2xl mt-5 ml-5">Featured Products</h1>

    <div className="h-[350px] w-[100%] bg-gray-300 flex  mt-5 ml-1 rounded-3xl mb-5">

      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      
    </div>

    <div className="h-[350px] w-[1250px] bg-cover bg-amber-300 mb-2 ml-2 rounded-3xl flex items-center justify-center"><img src="lgpix.webp" alt="" className="w-full h-full bg-cover bg-center rounded-2xl" /> </div>
 
   </main>
  );
}

export default Home;
