import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [ numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
const passwordGenerator = useCallback(()=>{

  let pass = ""
  let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwqyz"
  if(numberAllowed) char += "0123456789"
  if(charAllowed) char += "!@#$^&*~_`"
  for(let i=1; i<=length; i++){
  let charactor =  Math.floor(Math.random() * char.length)
  console.log(charactor)
  pass += char[charactor]
  }
  setPassword(pass)
},[length, charAllowed, numberAllowed, setPassword])
useEffect(()=>{
  
  passwordGenerator()
},[length, numberAllowed, charAllowed, setPassword])
const passwordRef = useRef(null)
 const copyToClipboard = ()=>{
  passwordRef.current?.select()
window.navigator.clipboard.writeText(password)
 }
  return (
    <div className="w-full h-screen bg-teal-900 ">
      <div className="w-full flex justify-center ">
        <div className="flex justify-center items-center p-5 mt-10 bg-teal-200 flex-col rounded-2xl ">
          <div className="mb-5 ">
            <input
            ref={passwordRef} type="text" className="w-[300px] py-2 px-3 rounded"
            value={password} readOnly />
            <button className="bg-blue-700 text-white py-2 px-3 rounded"
            onClick={copyToClipboard}>
              Copy
            </button>
          </div>
          <div >
            <input type="range" min={6} max={100} value={length}
            onChange={(e) => setLength(e.target.value)} />
            <label>Length {length}</label>
            <input type="checkbox"
        
            onClick={() => setNumberAllowed((prev) =>!prev)}/>
            <label> Number</label>
            <input type="checkbox" 
            onClick={() => setCharAllowed((prev) => !prev)} />
            <label> Charactor</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
