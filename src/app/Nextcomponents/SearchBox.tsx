"use client"
import React, { useState } from 'react'

export default function SearchBox({ handleSearch }: any) {

    return (
        <div className='flex justify-end'>
            <input type="text" name="searchBox" id="searchBox" className='border-2 rounded-lg px-2 py-1 mb-6 mt-7 lg:pr-60   max-w-8xl' placeholder='eg:North Nazimabad' onKeyUp={(e) => { handleSearch(e) }} />
        </div>
    )
}
