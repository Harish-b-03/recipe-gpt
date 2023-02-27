
const Footer = ({handleSubmit}) => {
  return (
    <div className="w-full h-[10%] sm:h-[15%] flex justify-center items-center">
        <button onClick={handleSubmit} className="px-5 py-2 bg-violet-100 text-violet-900 shadow-xl border-[1px] border-solid border-violet-400">
            Get Recipes
        </button>
    </div>
  )
}

export default Footer