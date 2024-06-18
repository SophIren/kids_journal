import { Header } from "../../components/header/Header";
import React, { useEffect, useState } from "react";
import { ButtonMain } from "../../components/button/ButtonMain";
import { AppRoute, ApiRoute, subjectInfo } from "../../const";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import "./Subject.css";
import { useParams } from "react-router-dom";

export const infoSubject = [
  {
    organization_id: "",
    subject_id: "",
    name: "",
    description: "",
    age_range: "",
  },
];

export const infoTopic = [
  {
    presentation_id: "",
    name: "",
    description: "",
  },
];

type infoTopicProps = {
  organization_id: string;
  subject_id: string;
  presentation_id: string;
  name: string;
  description: string;
}[];

type allInfoTopicProps = infoTopicProps[];

export const SubjectPage = () => {
  const { organization } = useParams();
  const [value, setValue] = useState("");

  const [subjects, setSubjects] = useState(infoSubject);
  const [presentations, setPresentations] = useState(infoTopic);

  const [curSubject, setCurSubject] = useState("");

  useEffect(() => {
    fetch(`${ApiRoute}/organizations/${organization}/subjects`, {
      method: "GET",
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response;
        }
        throw new Error();
      })
      .then((response) => response.json())
      .then((data) => {
        setSubjects(data);
      });
  }, []);

  useEffect(() => {
    if (curSubject !== "") {
      setPresentations(infoTopic);
      fetch(`${ApiRoute}/subjects/${curSubject}/presentations`, {
        method: "GET",
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            return response;
          }
          throw new Error();
        })
        .then((response) => response.json())
        .then((data) => {
          setPresentations(data);
        });
    }
  }, [curSubject]);

  const filteredSubject = subjects.filter((curSub) => {
    return curSub.name.toLowerCase().includes(value.toLowerCase());
  });

  const handleDelete = async (presentation_id: string) => {
    await fetch(`${ApiRoute}/presentation/${presentation_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
      <Header />
      <div className="subjects__container">
        <div className="groups__from">
          <form className="subjects_search-form">
            <input
              type="text"
              placeholder="Введите название предмета"
              className="subjects_search-input"
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setValue(event.currentTarget.value)
              }
            />
          </form>
        </div>
        <div>
          <ButtonMain
            height="44px"
            width="211px"
            linkButton={`/${organization}${AppRoute.CreateSubject}`}
          >
            Создать предмет/тему
          </ButtonMain>
        </div>
      </div>

      <div className="subjects">
        <Accordion allowToggle>
          {filteredSubject.map((subject) => (
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    onClick={() => setCurSubject(subject.name)}
                    as="span"
                    flex="1"
                    textAlign="left"
                  >
                    {subject.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <table className="subject__table">
                  <thead className="subject-title">
                    <tr>
                      <td className="subject-title_name">Название темы</td>
                      <td className="subject-title_age">Возраст</td>
                      <td className="subject-description">Описание</td>
                      <td className="employees-item_icon"></td>
                    </tr>
                  </thead>
                  <tbody>
                    {presentations?.map((currentTopic) => (
                      <tr className="subject-item">
                        <td className="subject-item_name">
                          {currentTopic.name}
                        </td>
                        <td className="subject-item_age">
                          {subject.age_range}
                        </td>
                        <td className="subject-item_description">
                          {currentTopic.description}
                        </td>
                        <td className="employees-item_icon">
                          <button
                            className="employees-item_icon-delete"
                            onClick={() => handleDelete(currentTopic.presentation_id)}
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.60679 1.67648H5.42822C5.52644 1.67648 5.60679 1.59612 5.60679 1.49791V1.67648H12.3925V1.49791C12.3925 1.59612 12.4729 1.67648 12.5711 1.67648H12.3925V3.28362H13.9997V1.49791C13.9997 0.709961 13.359 0.0693359 12.5711 0.0693359H5.42822C4.64028 0.0693359 3.99965 0.709961 3.99965 1.49791V3.28362H5.60679V1.67648ZM16.8568 3.28362H1.14251C0.747419 3.28362 0.428223 3.60282 0.428223 3.99791V4.71219C0.428223 4.81041 0.50858 4.89077 0.606794 4.89077H1.95501L2.50635 16.5649C2.54206 17.326 3.17153 17.9265 3.93269 17.9265H14.0666C14.83 17.9265 15.4572 17.3283 15.493 16.5649L16.0443 4.89077H17.3925C17.4907 4.89077 17.5711 4.81041 17.5711 4.71219V3.99791C17.5711 3.60282 17.2519 3.28362 16.8568 3.28362ZM13.8947 16.3193H4.10456L3.56438 4.89077H14.4349L13.8947 16.3193Z"
                                fill="black"
                                fill-opacity="0.85"
                              />
                            </svg>
                          </button>
                        </td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};
