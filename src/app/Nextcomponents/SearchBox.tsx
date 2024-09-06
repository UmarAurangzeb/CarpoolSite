"use client"
import React, { useState } from 'react'

export default function SearchBox({ handleSearch }: any) {

    return (
        <div className='flex justify-end flex-grow'>
            <input type="text" name="searchBox" id="searchBox" className='border-2 rounded-xl pl-2 w-full mb-6 mt-7 lg:pr-60   max-w-8xl px-10 pt-2' placeholder='North Nazimabad' onKeyUp={(e) => { handleSearch(e) }} />
        </div>
    )
}
