const FlyoutHeader = ({setshowFlyout}) => {
    return (
      <div className='w-full h-[10%] relative flex border-b-[1px] border-solid border-b-[rgba(255,255,255,0.3)]'>
          <div onClick={()=>setshowFlyout(false)} className='w-fit h-full px-10 absolute left-0 flex justify-center items-center cursor-pointer hover:font-medium'>
              <span className='text-2xl mr-1'>&lt;</span>
          </div>
          <span className='w-full h-full flex justify-center items-center text-center font-medium text-md tracking-wider text-white'>
              Recipes
          </span>
      </div>
    )
  }
  
  export default FlyoutHeader