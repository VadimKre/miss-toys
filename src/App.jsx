
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'

import { useState } from 'react'

import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './pages/Home.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'


import './assets/App.css'

export function App() {

    return (    
    
        <HashRouter>
            <section className='app'>
                <AppHeader />
                <main>
                    <Routes>
                        <Route path='/' element={<Navigate to='/home'/>}></Route>
                        <Route path='/home' element={<Home />}></Route>
                        <Route path='/toys' element={<ToyIndex />}></Route>
                        <Route path='/toys/:toyID' element={<ToyDetails />}></Route>
                        <Route path='/toys/edit/:toyID' element={<ToyEdit />}></Route>


                    </Routes>
                </main>

            </section>
        
        </HashRouter>
  )
}
