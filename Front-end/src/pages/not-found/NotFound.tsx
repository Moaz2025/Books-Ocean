import React from 'react'
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div>
            <h1>404! page not found</h1>
            <Link to='/'>Go back</Link>
        </div>
    );
}

export default PageNotFound
