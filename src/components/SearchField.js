import { useContext, useState } from "react"
import { ImageContext } from "../App";

const SearchField = () => {
  const [searchValue, setSearchValue] = useState("");
  const { searchImage, setSearchImage } = useContext(ImageContext);
  const [activeCall, setActiveCall] = useState(false)
  const [counter, setCounter] = useState(1)
  const [buttonText, setButtonText] = useState("ADD")
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  }

  const handleButtonSearch = async () => {
    setCounter(counter+1)
    setSearchValue("");
    setButtonText("Loading...")
    setActiveCall(true)
    console.log("started")
    const response = await fetch(
      "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
      {
        headers: { 
          "Accept": "image/png",
          "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
          "Content-Type": "application/json" 
        },
        method: "POST",
        body: JSON.stringify({inputs: searchValue}),
      }
    );
    const result = await response.blob();
    setActiveCall(false)
    const element = [<img src={URL.createObjectURL(result)} width={100} height={100} alt="" key={URL.createObjectURL(result)}/>]
    setSearchImage([...searchImage, element])
    console.log("finished")
    setButtonText("ADD")
  }
    
 
  return (
    <div className="flex justify-center h-[30vh] align-middle bg-slate-600 mb-2">
    <div className="flex w-[50vw] h-[6vh] self-center">
      <input
        className="bg-gray-50 border border-gray-300 text-sm w-full indent-2 p-2.5 outline-none focus:border-blue-500 focus:ring-2 rounded-tl rounded-bl"
        type="search"
        placeholder="Search Anything..."
        value={searchValue}
        onChange={handleInputChange}
        />
      <button
        onClick={handleButtonSearch}
        disabled={activeCall || (searchValue == "")}
        className="bg-blue-600 px-6 py-2 text-white rounded-tr rounded-br focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400 flex min-w-fit"
      > {buttonText} {counter} </button>
    </div>
    </div>
  )
}

export default SearchField