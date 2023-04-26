
const InputPopup = ({hideKeyInput, callGetResponse, onChange}) => {
  return (
    <div className="w-screen h-full fixed top-0 bg-[rgba(0,0,0,0.9)] z-50">
        <div className="fixed top-[100px] left-1/2 w-full max-w-sm h-fit px-8 -translate-x-1/2 bg-gray-900 rounded-xl">
            <div className="w-full h-11 flex justify-center items-center text-gray-300">
                Enter your OpenAI API Key
            </div>
            <div className="my-3 w-full h-12 flex justify-center items-center">
                <input onChange={onChange} type="text" placeholder="API Key" className="px-3 w-full h-8 text-gray-300 rounded-lg bg-gray-700"/>
            </div>
            <div className="my-3 w-full h-12 flex justify-between items-center">
                <button className="text-gray-300" onClick={()=>hideKeyInput()}>
                    Cancel
                </button> 
                <button onClick={()=>{callGetResponse()}} className="px-3 py-1 bg-gray-400 rounded-md">
                    Done
                </button>
            </div>
        </div>
    </div>
  )
}

export default InputPopup