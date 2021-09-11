import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const PaginateProductsAdmin = ({ pages, page, keyword = "" }) => {
    return (
        pages > 1 && (
            <Pagination
                className="d-flex justify-content-center"
                variant="light"
            >
                {[...Array(pages).keys()].map((x) => {
                    return (
                        <LinkContainer
                            key={x + 1}
                            to={
                                keyword
                                    ? `/admin/productlist/search/${keyword}/page/${
                                          x + 1
                                      }`
                                    : `/admin/productlist/page/${x + 1}`
                            }
                        >
                            <Pagination.Item active={x + 1 === page}>
                                {x + 1}
                            </Pagination.Item>
                        </LinkContainer>
                    );
                })}
            </Pagination>
        )
    );
};

///admin/orderlist/search/:keyword/page/:pageNumber
export const PaginateOrders = ({ pages, page, keyword = "" }) => {
    return (
        pages > 1 && (
            <Pagination
                className="d-flex justify-content-center"
                variant="light"
            >
                {[...Array(pages).keys()].map((x) => {
                    return (
                        <LinkContainer
                            key={x + 1}
                            to={
                                keyword
                                    ? `/admin/orderlist/search/${keyword}/page/${
                                          x + 1
                                      }`
                                    : `/admin/orderlist/page/${x + 1}`
                            }
                        >
                            <Pagination.Item active={x + 1 === page}>
                                {x + 1}
                            </Pagination.Item>
                        </LinkContainer>
                    );
                })}
            </Pagination>
        )
    );
};

export const PaginateUsers = ({ pages, page, keyword = "" }) => {
    return (
        pages > 1 && (
            <Pagination
                className="d-flex justify-content-center"
                variant="light"
            >
                {[...Array(pages).keys()].map((x) => {
                    return (
                        <LinkContainer
                            key={x + 1}
                            to={
                                keyword
                                    ? `/admin/userlist/search/${keyword}/page/${
                                          x + 1
                                      }`
                                    : `/admin/userlist/search/page/${x + 1}`
                            }
                        >
                            <Pagination.Item active={x + 1 === page}>
                                {x + 1}
                            </Pagination.Item>
                        </LinkContainer>
                    );
                })}
            </Pagination>
        )
    );
};

// sort, color, category, priceFrom, priceTo, num
export const PaginateMenWomenKid = ({ pages, page, p, type }) => {
    return (
        pages > 1 && (
            <Pagination
                className="d-flex justify-content-center"
                variant="light"
            >
                {[...Array(pages).keys()].map((x) => {
                    return (
                        <LinkContainer
                            key={x + 1}
                            to={
                                p.sort
                                    ? `/${type}/${p.sort}/${p.category}/${
                                          p.color
                                      }/${p.priceFrom}/${p.priceTo}/${x + 1}`
                                    : `/${type}/${x + 1}`
                            }
                        >
                            <Pagination.Item active={x + 1 === page}>
                                {x + 1}
                            </Pagination.Item>
                        </LinkContainer>
                    );
                })}
            </Pagination>
        )
    );
};

const Paginate = ({ pages, page, role = "user", keyword = "" }) => {
    return (
        pages > 1 && (
            <Pagination
                className="d-flex justify-content-center"
                variant="light"
            >
                {[...Array(pages).keys()].map((x) => {
                    return (
                        <LinkContainer
                            key={x + 1}
                            to={
                                role !== "admin"
                                    ? keyword
                                        ? `/search/${keyword}/page/${x + 1}`
                                        : `/page/${x + 1}`
                                    : `/admin/productlist/${x + 1}`
                            }
                        >
                            <Pagination.Item active={x + 1 === page}>
                                {x + 1}
                            </Pagination.Item>
                        </LinkContainer>
                    );
                })}
            </Pagination>
        )
    );
};

export default Paginate;
