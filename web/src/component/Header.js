import { Link } from 'react-router-dom';

function Header (props) {
	return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <a className="navbar-brand" href="./">
                            <img src="/SQUARE.png"
                                width="65"
                                style={{ position: "relative" }}
                                alt="Logo"></img>
                        </a>
                    </div>
                    <div className="nav col-6 justify-content-center">
                        <div className="navbar">
                            <li className="nav-item">
                                <Link to='/' className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/game' className="nav-link">Play</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/highscores' className="nav-link">High Scores</Link>
                            </li>

                            { props.userName ?
                                <li className="nav-item">
                                    <Link to='/user' className="nav-link">{props.userName}</Link>
                                </li>
                                :
                                <li className="nav-item">
                                    <Link to='/login' className="nav-link">Login</Link>
                                </li>
                            }
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    );
}

export default Header;