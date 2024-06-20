const Sliderbar = () => {
    return (
        <div className="sidebar w-1/5 min-h-svh  border border-[#000000] border-t-0 font-sans text-sm bg-[#000000]">
            <div className="sidebar-options pt-12 pl-20 flex flex-col gap-4 mt-12">
                <h2 className="hidden md:block text-[#F5EDED] cursor-pointer">Categories</h2>
                <ul className="hidden md:block">
                    <li className="text-[#F5EDED] cursor-pointer">Linux</li>
                    <li className="text-[#F5EDED] cursor-pointer">Bash</li>
                    <li className="text-[#F5EDED] cursor-pointer">Uncategorized</li>
                    <li className="text-[#F5EDED] cursor-pointer">Docker</li>
                    <li className="text-[#F5EDED] cursor-pointer">SQL</li>
                    <li className="text-[#F5EDED] cursor-pointer">CMS</li>
                    <li className="text-[#F5EDED] cursor-pointer">Code</li>
                    <li className="text-[#F5EDED] cursor-pointer">DevOps</li>
                </ul>
            </div>
            <div className="px-4 py-2 text-center border-gray-300 mt-96">
                <p className="text-xs text-[#F5EDED] cursor-pointer">All rights reserved Quicraft @2024</p>
            </div>
        </div>
    );
}

export default Sliderbar;
