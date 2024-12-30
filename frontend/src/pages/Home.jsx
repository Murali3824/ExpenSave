import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen '>
            <Navbar/>
            <Header/>
            <Footer/>
        </div>
    );
};

export default Home;