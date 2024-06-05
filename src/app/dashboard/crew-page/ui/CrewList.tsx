import React from 'react';

const CrewList = () => {
    return (
        <>
            <section className='border-2 border-red-600 h-auto'>

<div className="relative p-3  rounded-lg w-[20vw] max-w-lg">
    <input type="text" className="rounded-md p-3 w-[20vw] h-[35px] border-[1.2px] border-gray-300" placeholder="Search"/>

    <button type="submit" className="absolute -right-1 top-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
    </button>

</div>

            </section>
        </>
    );
}

export default CrewList;
