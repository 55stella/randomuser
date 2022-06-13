 
import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  const[Person, setPerson] = useState([])
  const[value, setValue] = useState('')
  const[display, setDisplay] =useState('')
  async function FetchData(){
    try {
    const response = await fetch(url)
    const Data =  await response.json()
    const{results} = Data
    setPerson(results)
    // console.log(Person)
     
    } catch (error) {
      console.log(error)  
    }
  }

  useEffect(()=>{
    FetchData()

  },[])
  // console.log(Person
  
  const HandleHover =(field, name)=>{

    setValue(field)
    setDisplay(name)
  
  }
  const RandomUser =(field, value)=>{
    setValue(field)
    setDisplay(value)
    FetchData()

    
  }

  useEffect(()=>{

    const Mapped = Person.map(item =>{
      if(!value){
        setValue(`${item.name.first} ${item.name.last}`)
        setDisplay('name')
      }
    
    }) 
    
  },[Person, value])
  
// console.log(Person.name)
  
  return (<main className='h-full w-full flex items-center justify-center bg-red' > 
    <div className='block-items min-h-screen min-w-full grid grid-rows-[1fr 1fr] place-items-center relative bg-zinc-600 '>
      <div className='dark  bg-current h-full w-full'></div>
      <div className='fair h-full w-full bg-white'></div>
      <article className='people  absolute  top-[250px] bg-white h-[50%] w-[50%] rounded'>

{Person.map(items=>{ 
  // console.log(Person)
const{gender, name,location,phone, email,login,dob,id, picture} = items
  return <div key ={id} className='middle  flex  h-full w-full flex-col gap-20  place-items-center relative' >
    <div className='shield h-[30%] w-[100%] border-b-[3px] border-transparent'></div>
    <div className='container flex items-center justify-center  flex-col bg-white  gap-5 relative'>
      <figure className='absolute  bottom-[120%] h-[100px] w-[100px] bg-white flex items-center justify-center
       left-[50%] translate-x-[-50%] rounded-full'>
      <img src={picture.medium} alt={name.first} className='h-[90%] w-[90%]  rounded-full' />
      </figure>
      <div className='display'>
        <p>{`My ${display} is `}</p>
        <h5>{value}</h5>
        </div>

       <div className='buttons text-[#617D98]'>
         <button onMouseOver={()=>HandleHover(`${name.first} ${name.last}`, 'name')} className='ml-[40px]'><FaUser size={32}/></button>
         <button onMouseOver={()=>HandleHover(email,'email')} className='ml-[40px]'><FaEnvelopeOpen size={32}/></button>
         <button onMouseMove={()=>HandleHover(dob.age, 'age')} className='ml-[40px]'><FaCalendarTimes size={32}/></button>
         <button onMouseMove={()=>HandleHover(`${location.street.number} ${location.street.name}`,'location')} className='ml-[40px]'><FaMap size={32}/></button>
         <button onMouseMove={()=>HandleHover(phone,'phone')} className='ml-[40px]'><FaPhone size={32}/></button>
         <button onMouseMove={()=>HandleHover(login.password, 'password')} className='ml-[40px]'><FaLock size={32}/></button>
       </div>
       <button onClick={()=>RandomUser(`${name.first} ${name.last}`, 'name')}className='bg-sky-500 text-white text-bold font-bold uppercase px-[15px] py-[10px] rounded'>Random User</button>
    </div>

    
      </div>
  
  

})}
</article>

    </div>

  </main>
  )}

export default App
