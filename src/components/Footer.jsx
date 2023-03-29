
const Footer = ({handleSubmit}) => {
  return (
    <div className="flex md:hidden w-full h-[10%] sm:h-[15%] justify-center items-center">
        <button onClick={handleSubmit} className="px-5 py-2 bg-black text-violet-500 font-semibold tracking-wide rounded-xl shadow-xl border-[1px] border-solid border-gray-900">
            Get Recipes
        </button>
    </div>
  )
}

export default Footer