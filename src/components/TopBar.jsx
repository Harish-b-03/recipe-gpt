import Logo from "./Atomic/Logo";

const TopBar = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-[10%] max-h-[70px] px-2 sm:px-10 flex justify-between items-center border-b-slate-900 border-solid border-b-[1px] bg-black">
            <Logo />
            {/* <div className="w-[200px] sm:w-[300px] h-[50%] relative flex justify-center items-center">
            <input 
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search Ingredient...."
            className="w-full h-full px-5 text-white bg-[rgba(255,255,255,0.1)] rounded-xl"
            />
        </div> */}
        </div>
    );
};

export default TopBar;
