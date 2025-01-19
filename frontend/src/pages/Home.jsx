import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import LearnMore from '../components/LearnMore';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 '>
            <Navbar/>
            <Header/>
            <LearnMore/>
            <Footer/>
        </div>
    );
};

export default Home;