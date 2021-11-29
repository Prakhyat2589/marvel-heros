import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { heroService } from "../../services/HeroServices";
import { HeroInfoCard } from "./HeroInfoCard/HeroInfoCard";
import { Container, Button } from "react-bootstrap";
import { comicsService } from "../../services/ComicsServices";
import { Comics } from "./Comics/Comics";
import { Header } from "../Header/Header";
import { Loader } from "../Loader/Loader";

const InfoPage = (props) => {
  const { id } = props.match.params;

  const [heroInfo, setHeroInfo] = useState([]);
  const [comics, setComics] = useState([]);
  const [showComics, setShowComics] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [comicDetails, setComicDetails] = useState({});
  const [isFullImage, setIsFullImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelCall = false;
    heroService.getSingleCharacter(id).then((heroInfo) => {
      if (!cancelCall) setHeroInfo(heroInfo);
    });
    comicsService
      .getComics(id)
      .then((comics) => {
        setComics(comics);
      })
      .finally(() => setIsLoading(false));
    return () => {
      cancelCall = true;
    };
  });

  // useEffect(() => {
  //   comicsService
  //     .getComics(id)
  //     .then((comics) => {
  //       setComics(comics);
  //     })
  //     .finally(() => setIsLoading(false));
  // });

  const openModal = (comicDetails) => {
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
    setComicDetails(comicDetails);
  };

  const showOrHideComics = () => {
    showComics ? setShowComics(false) : setShowComics(true);
  };

  const showFullImage = () => {
    setIsFullImage(true);
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <Container fluid>
          <Container>
            <HeroInfoCard
              heroInfo={heroInfo}
              showFullImage={showFullImage}
              isFullImage={isFullImage}
            />
            <Link to={`/`}>
              <Button
                style={{ marginRight: "10px" }}
                // onClick={showOrHideComics}
                variant="success"
              >
                Home Page
              </Button>
            </Link>
            {showComics ? (
              <>
                <Button onClick={showOrHideComics} variant="danger">
                  Hide Comics
                </Button>
                <Comics
                  comics={comics}
                  modalIsOpen={modalIsOpen}
                  openModal={openModal}
                  comicDetails={comicDetails}
                />
              </>
            ) : (
              <Button onClick={showOrHideComics} variant="warning">
                Show Comics
              </Button>
            )}
          </Container>
        </Container>
      )}
    </>
  );
};

export default InfoPage;
