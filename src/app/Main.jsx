import { Routes, Route } from 'react-router-dom'

import HomePage from './HomePage'
import MyLists from './MyLists'

const Main = () => {
    return (
        <main>
            <Routes>
                <Route
                    path='/'
                    element={<HomePage />}
                />
                <Route
                    path='/myLists'
                    element={<MyLists />}
                />
            </Routes>
        </main>
    )
}

export default Main