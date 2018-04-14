import * as React from 'react'
import { Link } from 'react-router-dom'
import {MenuOptionInterface} from '../../interfaces/menuOptionInterface';
import * as _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faMusic from '@fortawesome/fontawesome-free-solid/faMusic'
import * as faHome from '@fortawesome/fontawesome-free-solid/faHome'
import * as faGlobe from '@fortawesome/fontawesome-free-solid/faGlobe'
import * as faBook from '@fortawesome/fontawesome-free-solid/faBook'
import * as faFile from '@fortawesome/fontawesome-free-solid/faFileAlt'
import * as faTint from '@fortawesome/fontawesome-free-solid/faTint'

export default class Header extends React.Component {

    private homeMenuOption: MenuOptionInterface = {
        title: 'Home',
        url: '/'
    };
    private haupstimmeMenuOption: MenuOptionInterface = {
        title: 'Hauptstimme.js',
        url: '/hauptstimme'
    };
    private travelMenuOption: MenuOptionInterface = {
        title: 'Travel',
        url: '/travel'
    };
    private readingListMenuOption: MenuOptionInterface = {
        title: 'WP Reading List',
        url: '/portfolio/reading-list'
    };
    private resumeMenuOption: MenuOptionInterface = {
        title: 'Resume',
        url: '/resume'
    };
    private bubbleMenuOption: MenuOptionInterface = {
        title: 'Bubbles',
        url: '/portfolio/bubbles'
    };
    private headerMenu: MenuOptionInterface[] = [
        this.homeMenuOption,
        {
            title: 'Portfolio',
            submenu: [
                this.haupstimmeMenuOption,
                this.readingListMenuOption,
                this.bubbleMenuOption
            ]
        },
        this.travelMenuOption,
        this.resumeMenuOption
    ];

    render () {
        return (
            <header>
                <div className="grid-container row">
                    <div className="col-sm-12 show-for-small text-right position-relative">
                        <div className="row">
                            <div className="col-sm-2 text-center">
                                {/*home*/}
                                <Link to={this.homeMenuOption.url}>
                                    <FontAwesomeIcon icon={faHome} className="fa"/>
                                </Link>
                            </div>
                            <div className="col-sm-2 text-center">
                                {/*hauptstimme*/}
                                <Link to={this.haupstimmeMenuOption.url}>
                                    <FontAwesomeIcon icon={faMusic} className="fa"/>
                                </Link>
                            </div>
                            <div className="col-sm-2 text-center">
                                {/*reading list*/}
                                <Link to={this.readingListMenuOption.url}>
                                    <FontAwesomeIcon icon={faBook} className="fa"/>
                                </Link>
                            </div>
                            <div className="col-sm-2 text-center">
                                {/*bubble*/}
                                <Link to={this.bubbleMenuOption.url}>
                                    <FontAwesomeIcon icon={faTint} className="fa"/>
                                </Link>
                            </div>
                            <div className="col-sm-2 text-center">
                                {/*travel*/}
                                <Link to={this.travelMenuOption.url}>
                                    <FontAwesomeIcon icon={faGlobe} className="fa"/>
                                </Link>
                            </div>
                            <div className="col-sm-2 text-center">
                                {/*resume*/}
                                <Link to={this.resumeMenuOption.url}>
                                    <FontAwesomeIcon icon={faFile} className="fa"/>
                                </Link>
                            </div>
                        </div>
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
