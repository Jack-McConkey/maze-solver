import type {NextPage} from "next";
import Head from "next/head";
import MazeBuilder from "../components/MazeBuilder/MazeBuilder";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Maze Solver</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MazeBuilder />
        </div>
    );
};

export default Home;
