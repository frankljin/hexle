import ReactGA from 'react-ga';

const myGa = () => {
    const GA_ID = 'UA-222068718-1';
    ReactGA.initialize(GA_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
};

export default myGa;