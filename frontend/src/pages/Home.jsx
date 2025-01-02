import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import LearnMore from '../components/LearnMore';

const Home = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 '>
            <Navbar/>
            <Header/>
            <LearnMore/>
        </div>
    );
};

export default Home;