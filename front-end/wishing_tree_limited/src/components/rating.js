import React from "react";
import PropTypes from "prop-types";

const Rating = ({ value, text, color }) => {
    return (
        <div className="rating">
            {[...Array(5)].map((ele, i) => {
                return (
                    <span key={i}>
                        <i
                            style={{ color }}
                            className={
                                value >= 1 + i
                                    ? "fas fa-star"
                                    : value >= 0.5 + i
                                    ? "fas fa-star-half-alt"
                                    : "far fa-star"
                            }
                        />
                    </span>
                );
            })}
            <span>{text && text}</span>
        </div>
    );
};

Rating.defaultProps = {
    color: "#f8e825",
};

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
};

export default Rating;
