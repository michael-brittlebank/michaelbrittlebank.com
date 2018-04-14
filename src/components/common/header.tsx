import * as React from 'react'
import { Link } from 'react-router-dom'
import {MenuOptionInterface} from '../../interfaces/menuOptionInterface';
import * as _ from 'lodash';

export default class Header extends React.Component {

    private headerMenu: MenuOptionInterface[] = [
        {
            title: 'Home',
            url: '/'
        },
        {
            title: 'Portfolio',
            submenu: [
                {
                    title: 'Hauptstimme.js',
                    url: '/hauptstimme'
                },
                {
                    title: 'WP Reading List',
                    url: '/portfolio/reading-list'
                },
                {
                    title: 'Bubbles',
                    url: '/portfolio/bubbles'
                }
            ]
        },
        {
            title: 'Resume',
            url: '/resume'
        },
        {
            title: 'Travel',
            url: '/travel'
        }
    ];

    render () {
        return (
            <header>
                <div className="grid-container row">
                    <div className="col-sm-12 show-for-small text-right position-relative">
                        <a id="header-mobile-menu" href="#modal-mobile-menu">
                            <i className="fa fa-bars" aria-hidden="true"/>
                        </a>
                    </div>
                    <nav className="col-sm-12 text-right hide-for-small">
                        <ul className="standard-menu">
                            {
                                _.map(this.headerMenu, (menuOption: MenuOptionInterface, index: number) => {
                                    return (
                                        <li key={index}>
                                            {
                                                menuOption.url ?
                                                    <Link to={menuOption.url}>{menuOption.title}</Link> :
                                                    <a>{menuOption.title}</a>
                                            }
                                            {
                                                !!menuOption.submenu ? (
                                                    <ul className="sub-menu">
                                                        {
                                                            _.map(menuOption.submenu, (innerMenuOption: MenuOptionInterface, innerIndex: number) => {
                                                                return (
                                                                    <li key={innerIndex}>
                                                                        <Link to={innerMenuOption.url}>{innerMenuOption.title}</Link>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                ) : ''
                                            }
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
};
