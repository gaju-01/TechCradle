import NotFoundStyles from "./NotFound.module.css";

const NotFound = () => {
    return (
        <div className={`${NotFoundStyles["decorate-nf-nfpage"]}`}>
            <h2>Oops !</h2>
            <h1>404 - Page not found</h1>
        </div>
    );
}

export default NotFound;