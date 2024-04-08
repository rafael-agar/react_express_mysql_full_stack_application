import { useState } from 'react';

const Reloj = () => {

    let time  = new Date().toLocaleTimeString()

    const [ctime,setTime] = useState(time)
    const UpdateTime=()=>{
    time =  new Date().toLocaleTimeString()
    setTime(time)
    }
    setInterval(UpdateTime)
    return <div>
        <div className="m6">
            <h1 className='text-center'>{ctime}</h1>    
        </div>
        
    </div>
}

export default Reloj