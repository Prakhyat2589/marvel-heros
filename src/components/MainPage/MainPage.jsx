import React, { useState, useEffect } from "react";
import { HeroCards } from "./HeroCards/HeroCards";
import { Container, Col, Row, Button } from "react-bootstrap";
import { heroService } from "../../services/HeroServices";
import { storageService } from "../../services/StorageService";
import { SearchBar } from "./SearchBar/SearchBar";
import { Pagination } from "./Pagination/Pagination";
import { Header } from "../Header/Header";
import style from "./MainPage.module.css";
import { Loader } from "../Loader/Loader";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const MainPage = ({ itemsPerPage }) => {
  const [heroes, setHeroes] = useState([]);
  const [myTeam, setMyTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(
    storageService.get("itemOffset") ? storageService.get("itemOffset") : 0
  );
  const [sortStatus, setSortStatus] = useState("asc");

  useEffect(() => {
    let cancelCall = false;
    heroService
      .getCharacters()
      .then((response) => {
        if (!cancelCall) setMyTeam(response);
      })
      .finally(() => setIsLoading(false));
    return () => {
      cancelCall = true;
    };
  });

  useEffect(() => {
    let cancelCall = false;
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    heroService
      .getCharacters()
      .then((response) => {
        if (!cancelCall) {
          response &&
            setHeroes(
              response
                .slice(itemOffset, endOffset)
                .sort((a, b) => a.name.localeCompare(b.name))
            );
        }
      })
      .finally(() => setIsLoading(false));

    heroService
      .getCharacters()
      .then((response) => {
        if (!cancelCall) {
          response && setPageCount(Math.ceil(response.length / itemsPerPage));
        }
      })
      .finally(() => setIsLoading(false));
    setSortStatus("asc");
    return () => {
      cancelCall = true;
    };
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % myTeam.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    storageService.set("itemOffset", newOffset);
    storageService.set("pageSelected", event.selected);
  };

  const searchHeroes = (text) => {
    let cancelCall = false;
    heroService.searchCharacters(text).then((response) => {
      if (cancelCall) return;
      setHeroes(response);
    });
    setSortStatus("asc");
    return () => {
      cancelCall = true;
    };
  };

  const handleSortByName = () => {
    if (sortStatus === "asc") {
      heroes.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      setSortStatus("dsc");
    } else if (sortStatus === "dsc") {
      heroes.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      setSortStatus("asc");
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <Container fluid>
          <Row>
            <Col lg={12}>
              <SearchBar searchHeroes={searchHeroes} />
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              {heroes && heroes.length > 0 && (
                <Button className={style.sortButton} onClick={handleSortByName}>
                  Sort By Name
                  {sortStatus === "asc" ? (
                    <MdKeyboardArrowUp />
                  ) : (
                    <MdKeyboardArrowDown />
                  )}
                </Button>
              )}
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <HeroCards heroes={heroes} />
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col className={style.center}>
              <Pagination
                pageCount={pageCount}
                handlePageClick={handlePageClick}
                initialPage={
                  storageService.get("pageSelected")
                    ? storageService.get("pageSelected")
                    : 0
                }
              />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default MainPage;
