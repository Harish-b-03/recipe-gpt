import FlyoutHeader from './FlyoutHeader'

const Flyout = ({showFlyout, setshowFlyout, Response}) => {
  var text = Response.split('\n');

  return (
    <div onClick={()=>setshowFlyout(false)} className={` ${(showFlyout)?'opacity-1':'opacity-0 pointer-events-none'} transition-all duration-300 delay-200 ease-in-out w-screen h-full fixed top-0 bg-[rgba(255,255,255,0.3)] z-50`}>
        <div className={`${(showFlyout)?'translate-x-0':'translate-x-full'} w-2/3 h-full absolute right-0 bg-black text-white transition-all duration-500 ease-in-out border-l-[1px] border-solid border-l-[rgba(255,255,255,0.3)]`}>
            <div className='w-full h-full relative'>
                <FlyoutHeader setshowFlyout={setshowFlyout}/>
                <div className='w-full h-[90%] p-4 pl-10 overflow-y-scroll'>
                    {
                        text.map((line, index)=>{
                            return (
                                <div key={index} className={`${(line.trim().split(" ").length === 1)? 'my-3 text-lg font-bold underline underline-offset-4':''}`}>
                                    {line}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Flyout