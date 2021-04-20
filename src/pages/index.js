import Head from "next/head";
import {Fragment} from "react";

import Footer from "./components/footer"
import Header from './components/header'
import Frontispiece from './sections/frontispiece'

export default function Home() {
 return (
   <Fragment>
    <Head>
     <title>Mike Stumpf</title>
     <link rel="icon" href="/favicon.ico" />
     <meta charset="utf-8"/>
     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
     <meta name="theme-color" content="#000000"/>
     <meta http-equiv="Content-Language" content="en"/>
    </Head>
    <Header/>
    <main>
     <Frontispiece/>
    </main>
    <Footer/>
   </Fragment>
 )
}
