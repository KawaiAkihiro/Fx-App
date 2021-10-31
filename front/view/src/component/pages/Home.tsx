import * as React from 'react';

import { AuthContext } from 'App';

const Home = () => {
    const { isSignedIn, currentUser } = React.useContext(AuthContext)

    return (
        <>
            {
                isSignedIn && currentUser ? (
                    <></>
                ): (
                    <></>
                )
            }
        </>
    )
}

export default Home