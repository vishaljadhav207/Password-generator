import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdfghijklmnopqrstuvwxyz";
    if (num) {
      str = str + "0123456789";
    }
    if (char) {
      str = str + "!@#$%^&*()";
    }

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, num, char, setPassword]); //change values is any changes using usecallback() oprtimization 
  //without using callback also runs 
 

  const copypasstoClip=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,4);
    window.navigator.clipboard.writeText(password)
  },
  [password])


  //use ref
  const passwordRef=useRef(null);

  useEffect(()=>{
    passwordGenerator()
  }, [length, num, char, passwordGenerator])//ancy changes done rerendered passwordGenerator()
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-red-300 bg-gray-600">
        <h1 className="text-white  text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 mb-2 rounded-lg"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copypasstoClip} className="outline-none bg-blue-700 text-white px-3 py-0.5 mb-2 rounded-lg shrink-0">
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={num}
              id="numberInput"
              onChange={() => {
                setNum((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={num}
              id="numberInput"
              onChange={() => {
                setNum((prev) => ! prev);//this is an callback true=false false=true
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
