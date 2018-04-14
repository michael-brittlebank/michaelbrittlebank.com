import * as React from 'react'

export default class Footer extends React.Component {
    render() {
        return (
            <footer>
                <p>Find Me: </p>
                <nav>
                    <ul>
                        <li><a href="https://www.linkedin.com/in/mikestumpf">LinkedIn</a></li>
                        <li><a href="https://github.com/mike-stumpf">GitHub</a></li>
                        <li><a href="http://stackexchange.com/users/1282257/mike-stumpf?tab=accounts">Stack Overflow</a>
                        </li>
                    </ul>
                </nav>
            </footer>
        );
    }
}
