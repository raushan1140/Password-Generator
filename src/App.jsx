import { useState, useCallback, useEffect, useRef } from 'react'



function App() {

  const [length, setLength] = useState(8)

  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState("")

  //useRef hook

  const passwordRef = useRef(null)

  const PasswordGenerator = useCallback(()=>{
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456879"
    if(charAllowed) str+="!@$%^&*_+-={}[]~`"

    //loop for length 

    for (let i=1; i<=length; i++) {
      //create password (length+1, to avoid 0 value)
      let char = Math.floor(Math.random() * str.length+1)
      pass += str.charAt(char)
      
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])


  //to copy password 

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    // if we want to set the range of pass which we want to copy
    // passwordRef.current?.setSelectionRange()
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(()=>{
    PasswordGenerator()

  }, [length, numberAllowed, charAllowed, PasswordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-600'>
        <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text" 
          value={Password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-red-600 transition duration-200'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer accent-blue-700'
            onChange={(e)=> {setLength(e.target.value)}}
             />
             <label>Length: {length}</label>
             
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=>{setNumberAllowed((prev)=>!prev)}}
            className='accent-blue-700'
            />
             <label htmlFor="numberInput">Numbers</label> 
          </div>
          <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
              className='accent-blue-700'
          />
           <label htmlFor="characterInput">Characters</label>
           </div>
        </div>
      </div>
    </>
  ) 
}

export default App
