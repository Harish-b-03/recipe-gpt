
const Label = () => {
    return (
        <div className="w-full sm:w-max text-center sm:mr-4 sm:ml-2 my-1 sm:my-0 font-bold text-white sm:underline underline-offset-4">
            Ingredients Selected:
        </div>
    )
}

const SelectedIngredient = ({Ingredients}) => {
  
  if(Ingredients.length === 0){
    return (
        <div className="w-full h-fit px-2 sm:px-10 flex justify-between items-center">
            <div className="w-full text-center sm:mr-4 sm:ml-2 my-1 sm:my-0 font-bold text-white sm:underline underline-offset-4">
                No Ingredients Selected
            </div>
        </div>
    )
  }

  return (
    <div className="w-full h-[15%] px-2 sm:px-10 flex justify-between items-center">
        <div className="w-full flex flex-col sm:flex-row justify-center items-center">
            
            <div>
                <Label/>
            </div>
            
            <div className="flex flex-wrap justify-center ">
                {
                    Ingredients.map((item)=>
                    {
                        return (
                            <div key={item} className="text-white mx-1 sm:mx-2">
                                {`${(item.length > 30)?item.substring(0,27)+'...':item}, `}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default SelectedIngredient