import React from 'react';
const TableOfCatalog = React.lazy(() => import('./containers/MainContent/pages/EmployeePortal/Requests/TableOfCatalogs/tableOfCatalog'));
const PncLayer = React.lazy(() => import('./containers/MainContent/pages/EmployeePortal/Requests/layerOfPnc/pncLayer'));
const TableOfParts = React.lazy(() => import('./containers/MainContent/pages/EmployeePortal/Requests/tableOfDetailes/tableOfDetailes'));
const TableOfPartNumbers = React.lazy(() => import('./containers/MainContent/pages/EmployeePortal/Requests/gridOfPartnum/tableOfPartNum'));
const PartOfProduct = React.lazy(() => import('./containers/MainContent/pages/EmployeePortal/Requests/partDetailesOfProduct/partOfProduct'));
const Product = React.lazy(() => import('./containers/MainContent/pages/EmployeePortal/Requests/detailesOfProduct/oneProduct'));
const Cars = React.lazy(() => import('./containers/MainContent/pages/EmployeePortal/Requests/AllCars/AllCars'));
const PdfContainer = React.lazy(() => import('./containers/MainContent/pages/EmployeePortal/library/home'));


const routes = [

    { path: '/pdfs', component: PdfContainer },
    { path: '/product/:id/part-of-product/:id/table-of-parts', component: TableOfParts },
    { path: '/product/:id/part-of-product/:id', component: PartOfProduct },
    { path: '/product/:id/', component: Product },
    { path: '/', component: Cars },

    { path: '/part-pnc/details/:id', component: TableOfPartNumbers },
    { path: '/pnc', component: PncLayer },
    { path: '/part-number', component: TableOfCatalog },



];

export default routes;