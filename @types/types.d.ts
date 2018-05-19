declare module 'react-router-dom';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';
declare module '*.pdf';
declare module '*.mp3';
declare module "file-loader?name=[name].js!*" {
    const value: string;
    export = value;
}