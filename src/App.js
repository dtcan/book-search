import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchNav from './components/SearchNav';
import SearchResult from './components/SearchResult';

function App() {
    return (
        <div className="App">
            <header>
                <SearchBar />
            </header>
            <main>
                <SearchNav />
                <SearchResult />
                <SearchNav />
            </main>
        </div>
    );
}

export default App;
