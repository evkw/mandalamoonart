import { getPortfolio } from '../api/firebase-api';


const Home = (props) => {

    console.log(props);
    return (
        <div>
           hello
        </div>

    )
}

Home.getInitialProps = async () => {
    return { 
        portfolio: await getPortfolio()
     }
}

export default Home;