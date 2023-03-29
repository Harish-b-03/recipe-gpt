
const Suggestions = ({search, FilteredIngredients, addIngredient, setSearch}) => {
  return (
      <div className={`${(search!=="")?'h-[150px] block opacity-100':' h-0 opacity-0 pointer-events-none'} absolute top-full left-[6px] w-[calc(100%-10px)] bg-[rgba(255,255,255,0.05)] rounded-bl-xl rounded-br-xl border border-solid border-[rgba(255,255,255,0.01)] overflow-y-auto transition-all duration-300`}>
        {
          FilteredIngredients.map((item, index)=>{
            return (
              <div key={index} onClick={()=>{addIngredient(item); setSearch("");}} className="h-8 px-5 py-1 text-gray-400 cursor-pointer hover:bg-[rgba(255,255,255,0.08)] hover:text-white">
                {item.ingredient}
              </div>
            )
          })
        }
      </div>    
  )
}

const InputField = ({loading, setSearch, search, FilteredIngredients, addIngredient, handleSubmit}) => {
  return (
    <div>
        <form className="w-fit flex justify-center items-center">
        <div className="flex items-center h-10 w-[600px]">
            <div className="relative w-full h-full">
                <input
                    type="text"
                    placeholder="search ingredients..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-full w-full py-1 px-6 bg-transparent border border-solid border-gray-700 -outline-offset-2 text-gray-200 placeholder:text-gray-700 rounded-tl-md rounded-bl-md leading-tight"
                />
                <Suggestions search={search} FilteredIngredients={FilteredIngredients} addIngredient={addIngredient} setSearch={setSearch}/>
            </div>
          <button
            type="submit"
            className={`-mx-1 w-[200px] h-full bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-tr-md rounded-br-md z-10 ${loading ? 'cursor-wait bg-blue-300 hover:bg-blue-300' : ''}`}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? 'Loading...' : 'Get Receipes'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default InputField