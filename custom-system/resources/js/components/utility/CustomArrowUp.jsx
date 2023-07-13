import { useState, useEffect } from "react";

const ScrollToTopArrow = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show the arrow when the user scrolls beyond a certain point
    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const isVisible = scrollTop > 300;
        setIsVisible(isVisible);
    };

    // Scroll to the top when the arrow is clicked
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Add scroll event listener when component mounts
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`scroll-to-top ${
                isVisible ? "visible" : ""
            } d-flex align-items-end justify-content-end`}
        >
            <button className="btn btn-primary btn-lg m-3" onClick={scrollToTop}>
                <i className="fa fa-arrow-up p-1"></i>
            </button>
        </div>
    );
};

export default ScrollToTopArrow;
