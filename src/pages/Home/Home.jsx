import React, { useCallback, useEffect, useRef, useState } from 'react'

export default function Home() {

    const [isNumber, setIsNumber] = useState(false)
    const [isCharacter, setIsCharacter] = useState(false)
    const [length, setLength] = useState(8)
    const [password, setPassword] = useState(false)

    const passwordRef = useRef(null)
    
    const handleLength = (e) => {
        setLength(e.target.value);
    }
    
    const handleCharacters = () => {
        setIsCharacter((prev)=> !prev)
    }
    
    const handleNumbers = () => {
        setIsNumber((prev) => !prev);
    }

    const handleCopy = useCallback((e)=>{
        e.preventDefault()
        passwordRef.current?.select()
        // passwordRef.current?.setSelectionRange(0,6) // For selection accoroding to range
        window.navigator.clipboard.writeText(password);
    },[password])
    
    const generatePassword = () => {
    
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        
        const randomNumber = () => Math.floor((Math.random() * str.length ))
    
        if (isCharacter) {
            str += "~!@#$%^&*_-"
        }
        if (isNumber) {
            str += "1234567890"
        }
    
        let randomPassword=""
    
        for (let index = 0; index < length; index++) {
             randomPassword += str[randomNumber()];
            
        }
    
        setPassword(randomPassword);
    }
    useEffect(() => {

        generatePassword()

    }, [isCharacter, isNumber, length])

return (
    <div className='h-screen flex justify-center items-center flex-col'>
        <div className="form w-screen md:w-3/4 lg:w-1/2 m-auto bg-[#212121] p-4">
            <h1 className='text-2xl text-gray-400 text-center font-semibold'>Password Generator</h1>
            <form className='m-auto py-5  flex justify-center items-center'> 
                <input type="text" ref={passwordRef}   className="p-3 flex-1 m-auto rounded-s-md outline-none border-none text-black" value={password} readOnly/>
                <button className='p-3 bg-blue-500 rounded-e-md' onClick={handleCopy}>Copy</button>
            </form>
            <div className="flex justify-between items-center">
                <input type="range" min={8} max={60} value={length} size={25} onChange={handleLength} />
                <p className='text-orange-300'>Length: {length}</p>
                <div className="numbers">
                    <input type="checkbox" name="numbers"   onClick={handleNumbers}/> Number
                </div>
                <div className="characters">
                    <input type="checkbox" name="characters"  onClick={handleCharacters} /> Characters
                </div>
            </div>
        </div>
    </div>
  )
}
