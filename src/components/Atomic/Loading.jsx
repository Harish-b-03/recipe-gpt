const Loading = () => {
    return (
        <div className="w-screen h-full fixed top-0 bg-[rgba(0,0,0,0.9)] z-50">
            <div class="w-full h-full flex flex-col items-center justify-center">
                <div
                    class="text-violet-500 h-12 w-12 inline-block animate-spin rounded-full border-[6px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                >
                    <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
                <div className="mt-10 px-5 py-2 text-lg font-bold tracking-wider rounded-xl bg-[rgba(0,0,0,0.9)] text-violet-500">
                    Talking to chef{" "}
                    <span className="underline underline-offset-4">GPT</span>
                    ....
                </div>
            </div>
        </div>
    );
};

export default Loading;
