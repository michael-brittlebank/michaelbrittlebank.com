export interface MenuOptionInterface {
    title: string;
    url?: string;
    submenu?: MenuOptionInterface[];
}